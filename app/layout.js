import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";

export const metadata = {
  title: "Handcrafted Haven | Artisanal Marketplace",
  description: "Discover unique handcrafted items from local artisans and crafters.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <a href="#main-content" className="skip-link">Skip to main content</a>
          <Header />
          <div id="main-content">
            {children}
          </div>
          <footer className="main-footer">
            <div className="container">
              <p>&copy; {new Date().getFullYear()} Handcrafted Haven. All rights reserved.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
