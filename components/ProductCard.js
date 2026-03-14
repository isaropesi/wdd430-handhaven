import Image from 'next/image';

export default function ProductCard({ product }) {
    return (
        <div className="card product-card">
            <div className="product-image-wrapper">
                <Image
                    src={product.image || '/images/hero.png'}
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="product-info">
                <h3>{product.name}</h3>
                <p className="artisan-name">by {product.artisan}</p>
                <p className="price">${product.price}</p>
                <div className="product-meta">
                    <span className="rating">★ {product.rating}</span>
                    <a href={`/product/${product.id}`} className="view-link">View Details</a>
                </div>
            </div>

            <style jsx>{`
        .product-card {
          padding: 0;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .product-image-wrapper {
          position: relative;
          height: 250px;
          width: 100%;
          background: #eee;
        }
        .product-info {
          padding: 20px;
        }
        .artisan-name {
          color: var(--muted);
          font-size: 0.9rem;
          margin-bottom: 10px;
        }
        .price {
          font-weight: 700;
          color: var(--secondary);
          font-size: 1.2rem;
          margin-bottom: 15px;
        }
        .product-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid var(--border);
          padding-top: 15px;
        }
        .view-link {
          font-weight: 600;
          font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
}
