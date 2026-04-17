'use client';
import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = use(params);
  const { data: session } = useSession();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setProduct(data.product);
        setReviews(data.reviews || []);
        setLoading(false);
      });
  }, [id]);

  const handleReview = async (e) => {
    e.preventDefault();
    if (!session) return setError('You must be logged in to leave a review.');

    setSubmitting(true);
    setError('');
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: id,
        userId: session.user.id,
        userName: session.user.name,
        rating: review.rating,
        comment: review.comment,
      }),
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews([newReview, ...reviews]);
      setReview({ rating: 5, comment: '' });
      // Update product rating display
      const updated = await fetch(`/api/products/${id}`).then((r) => r.json());
      setProduct(updated.product);
    } else {
      setError('Failed to submit review.');
    }
    setSubmitting(false);
  };

  if (loading) return <main className="container section"><p style={{ color: 'var(--muted)' }}>Loading...</p></main>;
  if (!product) return <main className="container section"><p>Product not found.</p></main>;

  return (
    <main className="container section">
      {/* Product Header */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem' }}>
          {product.category === 'pottery' ? '🏺' : product.category === 'jewelry' ? '💍' : product.category === 'textiles' ? '🧵' : product.category === 'woodwork' ? '🪵' : '✨'}
        </div>
        <div>
          <p style={{ color: 'var(--secondary)', fontWeight: 600, textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '8px' }}>{product.category}</p>
          <h1 style={{ marginBottom: '8px' }}>{product.title}</h1>
          <p style={{ color: 'var(--muted)', marginBottom: '16px' }}>
            by <Link href={`/artisan/${product.sellerId}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{product.sellerName}</Link>
          </p>
          {product.reviewCount > 0 && (
            <p style={{ marginBottom: '16px' }}>{'★'.repeat(Math.round(product.averageRating))}{'☆'.repeat(5 - Math.round(product.averageRating))} <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>({product.reviewCount} reviews)</span></p>
          )}
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--secondary)', marginBottom: '20px' }}>${product.price}</p>
          <p style={{ color: 'var(--foreground)', lineHeight: '1.7', marginBottom: '24px' }}>{product.description}</p>
          {(product.materials || product.dimensions) && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
              <tbody>
                {product.materials && <tr><td style={{ padding: '8px', border: '1px solid var(--border)', fontWeight: 600, width: '40%' }}>Materials</td><td style={{ padding: '8px', border: '1px solid var(--border)' }}>{product.materials}</td></tr>}
                {product.dimensions && <tr><td style={{ padding: '8px', border: '1px solid var(--border)', fontWeight: 600 }}>Dimensions</td><td style={{ padding: '8px', border: '1px solid var(--border)' }}>{product.dimensions}</td></tr>}
              </tbody>
            </table>
          )}
          <button className="btn" style={{ width: '100%' }}>Add to Cart</button>
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h2 style={{ marginBottom: '30px' }}>Reviews & Ratings</h2>

        {/* Review Form */}
        {session ? (
          <form onSubmit={handleReview} className="card" style={{ marginBottom: '30px' }}>
            <h3 style={{ marginBottom: '16px' }}>Leave a Review</h3>
            {error && <p style={{ color: '#c0392b', marginBottom: '12px' }}>{error}</p>}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Rating</label>
              <div style={{ display: 'flex', gap: '4px' }}>
                {[1,2,3,4,5].map((n) => (
                  <button key={n} type="button"
                    onClick={() => setReview({ ...review, rating: n })}
                    style={{
                      fontSize: '1.8rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: n <= review.rating ? '#f5a623' : 'var(--foreground)',
                      transition: 'color 0.15s ease',
                      lineHeight: 1,
                      padding: '2px',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.parentElement.querySelectorAll('button').forEach((btn, i) => {
                        btn.style.color = i < n ? '#f5a623' : 'var(--foreground)';
                      });
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.parentElement.querySelectorAll('button').forEach((btn, i) => {
                        btn.style.color = i < review.rating ? '#f5a623' : 'var(--foreground)';
                      });
                    }}
                  >★</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Your Review</label>
              <textarea
                required
                value={review.comment}
                onChange={(e) => setReview({ ...review, comment: e.target.value })}
                rows={4}
                placeholder="Share your experience with this product..."
                style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)', resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="btn" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
          </form>
        ) : (
          <p style={{ marginBottom: '30px', color: 'var(--muted)' }}><Link href="/login">Sign in</Link> to leave a review.</p>
        )}

        {/* Review List */}
        {reviews.length === 0 ? (
          <p style={{ color: 'var(--muted)' }}>No reviews yet. Be the first!</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {reviews.map((r) => (
              <div key={r._id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{r.userName}</strong>
                  <span>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p style={{ color: 'var(--foreground)' }}>{r.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
