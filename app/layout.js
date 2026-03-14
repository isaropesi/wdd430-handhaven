import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven | Artisanal Marketplace",
  description: "Discover unique handcrafted items from local artisans and crafters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="main-header">
          <div className="container header-content">
            <div className="logo-text">Handcrafted Haven</div>
            <nav className="header-nav">
              <a href="/">Home</a>
              <a href="/shop">Shop</a>
              <a href="/artisans">Artisans</a>
              <a href="/about">About</a>
              <button className="btn btn-sm">Sign In</button>
            </nav>
          </div>
        </header>
        {children}
        <footer className="main-footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
