'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Header() {
  const { data: session } = useSession();

  return (
    <header className="main-header">
      <div className="container header-content">
        <Link href="/" className="logo-text">Handcrafted Haven</Link>
        <nav className="header-nav">
          <Link href="/">Home</Link>
          <Link href="/shop">Shop</Link>
          <Link href="/artisans">Artisans</Link>
          {session?.user?.role === 'seller' && (
            <Link href="/dashboard">Dashboard</Link>
          )}
          {session ? (
            <button
              className="btn btn-sm"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="btn btn-sm">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
