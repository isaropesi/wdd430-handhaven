'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ArtisanPage({ params }) {
  const { id } = use(params);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/artisans/${id}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); });
  }, [id]);

  if (loading) return <main className="container section"><p style={{ color: 'var(--muted)' }}>Loading artisan profile...</p></main>;
  if (!data || data.error) return <main className="container section"><p>Artisan not found.</p></main>;

  const { artisan, products } = data;
  const avgRating = products.length > 0
    ? (products.reduce((s, p) => s + p.averageRating, 0) / products.length).toFixed(1)
    : null;

  return (
    <main className="container section">
      {/* Profile Header */}
      <div className="card" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start', marginBottom: '50px' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', flexShrink: 0 }}>
          {artisan.name.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ marginBottom: '4px' }}>{artisan.name}</h1>
          <p style={{ color: 'var(--secondary)', fontWeight: 600, marginBottom: '12px' }}>✨ Verified Artisan</p>
          {artisan.bio && <p style={{ color: 'var(--muted)', lineHeight: '1.7', marginBottom: '16px' }}>{artisan.bio}</p>}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--muted)' }}><strong style={{ color: 'var(--foreground)' }}>{products.length}</strong> Products</span>
            {avgRating && <span style={{ color: 'var(--muted)' }}>★ <strong style={{ color: 'var(--foreground)' }}>{avgRating}</strong> Avg Rating</span>}
            <span style={{ color: 'var(--muted)' }}>Member since <strong style={{ color: 'var(--foreground)' }}>{new Date(artisan.createdAt).getFullYear()}</strong></span>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '30px', marginBottom: '50px' }}>
        <h2 style={{ marginBottom: '12px' }}>My Story</h2>
        <p style={{ color: 'var(--muted)', lineHeight: '1.8' }}>
          {artisan.bio || `${artisan.name} is a passionate artisan dedicated to creating unique, handcrafted items with care and attention to detail. Every piece tells a story.`}
        </p>
      </div>

      {/* Products */}
      <h2 style={{ marginBottom: '24px' }}>Products by {artisan.name}</h2>
      {products.length === 0 ? (
        <p style={{ color: 'var(--muted)' }}>No products listed yet.</p>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <Link key={p._id} href={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: 'var(--border)', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {p.category === 'pottery' ? '🏺' : p.category === 'jewelry' ? '💍' : p.category === 'textiles' ? '🧵' : p.category === 'woodwork' ? '🪵' : '✨'}
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1rem', marginBottom: '4px' }}>{p.title}</h3>
                  <p style={{ fontWeight: 700, color: 'var(--secondary)' }}>${p.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
