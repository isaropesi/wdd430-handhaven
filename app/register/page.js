'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error);
    } else {
      router.push('/login');
    }
  };

  return (
    <main className="container" style={{ maxWidth: 480, paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '8px' }}>Create an Account</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>Join the Handcrafted Haven community</p>

        {error && (
          <p style={{ color: '#c0392b', background: '#fdf0ee', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Full Name</label>
            <input
              id="name"
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}
            />
          </div>

          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}
            />
          </div>

          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', fontWeight: 600 }}>Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 600 }}>I am a...</label>
            <div style={{ display: 'flex', gap: '16px' }}>
              {['buyer', 'seller'].map((r) => (
                <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', padding: '10px 20px', border: `1px solid ${form.role === r ? 'var(--primary)' : 'var(--border)'}`, borderRadius: 'var(--radius-sm)', flex: 1, justifyContent: 'center', fontWeight: form.role === r ? 600 : 400, color: form.role === r ? 'var(--primary)' : 'inherit' }}>
                  <input type="radio" name="role" value={r} checked={form.role === r} onChange={() => setForm({ ...form, role: r })} style={{ display: 'none' }} />
                  {r === 'buyer' ? '🛍 Buyer' : '🎨 Seller / Artisan'}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--muted)' }}>
          Already have an account?{' '}
          <a href="/login" style={{ fontWeight: 600 }}>Sign in</a>
        </p>
      </div>
    </main>
  );
}
