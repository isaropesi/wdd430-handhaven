import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="container hero fade-in">
        <div className="hero-text">
          <h1>Crafted with Heart, Shared with the World.</h1>
          <p style={{ fontSize: '1.2rem', margin: '20px 0 30px', color: 'var(--muted)' }}>
            Handcrafted Haven is where artisans meet their audience. Discover unique,
            sustainable, and beautiful creations made by real people.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="/shop" className="btn">Explore Shop</a>
            <a href="/artisans" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)' }}>Meet Artisans</a>
          </div>
        </div>
        <div className="hero-image">
          <Image
            src="/images/hero.png"
            alt="Artisanal workshop showing handcrafted items"
            fill
            priority
          />
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section" style={{ backgroundColor: 'var(--card-bg)' }}>
        <div className="container">
          <h2 className="section-title">Browse by Craft</h2>
          <div className="grid">
            {['Pottery', 'Jewelry', 'Textiles', 'Woodwork'].map((category) => (
              <div key={category} className="card" style={{ textAlign: 'center' }}>
                <h3>{category}</h3>
                <p style={{ margin: '10px 0 20px', color: 'var(--muted)' }}>Explore unique {category.toLowerCase()} pieces.</p>
                <a href={`/shop?category=${category.toLowerCase()}`} style={{ fontWeight: '600' }}>View Collection &rarr;</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Vision */}
      <section className="section container">
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2>Why Choose Handcrafted?</h2>
          <p style={{ fontSize: '1.1rem', marginTop: '20px' }}>
            Every item in our haven tells a story. We support local artisans, promote
            sustainable consumption, and ensure that quality craftsmanship never goes out of style.
            By buying here, you're not just getting a product; you're supporting a dream.
          </p>
        </div>
      </section>
    </main>
  );
}
