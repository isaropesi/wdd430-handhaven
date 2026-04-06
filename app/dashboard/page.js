'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CATEGORIES = ['pottery', 'jewelry', 'textiles', 'woodwork', 'other'];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: 'pottery', materials: '', dimensions: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (status === 'authenticated' && session?.user?.role !== 'seller') router.push('/');
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user?.id) {
      fetch(`/api/products?sellerId=${session.user.id}`)
        .then((r) => r.json())
        .then((data) => { setProducts(Array.isArray(data) ? data : []); setLoading(false); });
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        sellerId: session.user.id,
        sellerName: session.user.name,
      }),
    });

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setError(data.error || 'Failed to create product.');
    } else {
      setSuccess('Product added successfully!');
      setProducts([data, ...products]);
      setForm({ title: '', description: '', price: '', category: 'pottery', materials: '', dimensions: '' });
    }
  };

  if (status === 'loading') return <main className="container section"><p style={{ color: 'var(--muted)' }}>Loading...</p></main>;

  return (
    <main className="container section">
      <h1 style={{ marginBottom: '8px' }}>Seller Dashboard</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '40px' }}>Welcome back, {session?.user?.name}!</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        {/* Add Product Form */}
        <form onSubmit={handleSubmit} className="card">
          <h2 style={{ marginBottom: '20px' }}>Add New Product</h2>

          {error && <p style={{ color: '#c0392b', background: '#fdf0ee', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>{error}</p>}
          {success && <p style={{ color: '#27ae60', background: '#eafaf1', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>{success}</p>}

          {[
            { id: 'title', label: 'Product Title', type: 'text', required: true },
            { id: 'price', label: 'Price ($)', type: 'number', required: true },
            { id: 'materials', label: 'Materials (optional)', type: 'text' },
            { id: 'dimensions', label: 'Dimensions (optional)', type: 'text' },
          ].map(({ id, label, type, required }) => (
            <div key={id} style={{ marginBottom: '16px' }}>
              <label htmlFor={id} style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>{label}</label>
              <input
                id={id}
                type={type}
                required={required}
                value={form[id]}
                onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}
              />
            </div>
          ))}

          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Category</label>
            <select id="category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Description</label>
            <textarea
              id="description"
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)', resize: 'vertical' }}
            />
          </div>

          <button type="submit" className="btn" disabled={submitting} style={{ width: '100%' }}>
            {submitting ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

        {/* My Products */}
        <div>
          <h2 style={{ marginBottom: '20px' }}>My Products ({products.length})</h2>
          {loading ? <p style={{ color: 'var(--muted)' }}>Loading...</p> : products.length === 0 ? (
            <p style={{ color: 'var(--muted)' }}>No products yet. Add your first one!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {products.map((p) => (
                <div key={p._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 600 }}>{p.title}</p>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{p.category} · ${p.price}</p>
                  </div>
                  <a href={`/product/${p._id}`} style={{ fontWeight: 600, fontSize: '0.9rem' }}>View →</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
