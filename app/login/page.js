'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);
    if (res.error) {
      setError(res.error);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="container" style={{ maxWidth: 480, paddingTop: '80px', paddingBottom: '80px' }}>
      <div className="card">
        <h1 style={{ marginBottom: '8px' }}>Welcome Back</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>Sign in to your account</p>

        {error && (
          <p style={{ color: '#c0392b', background: '#fdf0ee', padding: '10px', borderRadius: 'var(--radius-sm)', marginBottom: '20px' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', fontSize: '1rem', background: 'var(--background)' }}
            />
          </div>

          <button type="submit" className="btn" disabled={loading} style={{ marginTop: '8px' }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{ marginTop: '24px', textAlign: 'center', color: 'var(--muted)' }}>
          Don&apos;t have an account?{' '}
          <a href="/register" style={{ fontWeight: 600 }}>Create one</a>
        </p>
      </div>
    </main>
  );
}
