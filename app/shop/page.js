'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const CATEGORIES = ['all', 'pottery', 'jewelry', 'textiles', 'woodwork', 'other'];

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (category !== 'all') params.set('category', category);
      if (maxPrice) params.set('maxPrice', maxPrice);
      if (search) params.set('search', search);
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [category, maxPrice, search]);

  return (
    <main className="container section">
      <h1 style={{ marginBottom: '8px' }}>Shop All Products</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>Handcrafted with love by local artisans</p>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '40px', padding: '20px', background: 'var(--card-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', flex: '1', minWidth: '200px', fontSize: '1rem', background: 'var(--background)' }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)', cursor: 'pointer' }}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Max price ($)"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={{ padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', width: '150px', fontSize: '1rem', background: 'var(--background)' }}
        />
      </div>

      {/* Product Grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '60px 0' }}>Loading products...</p>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <p style={{ fontSize: '1.2rem', color: 'var(--muted)' }}>No products found.</p>
          <p style={{ color: 'var(--muted)', marginTop: '8px' }}>Try adjusting your filters or check back later.</p>
        </div>
      ) : (
        <div className="grid">
          {products.map((p) => (
            <Link key={p._id} href={`/product/${p._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: 'var(--border)', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                  {p.category === 'pottery' ? '🏺' : p.category === 'jewelry' ? '💍' : p.category === 'textiles' ? '🧵' : p.category === 'woodwork' ? '🪵' : '✨'}
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>{p.category}</p>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{p.title}</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '12px' }}>by {p.sellerName}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: 'var(--secondary)', fontSize: '1.1rem' }}>${p.price}</span>
                    {p.reviewCount > 0 && (
                      <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>★ {p.averageRating} ({p.reviewCount})</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
