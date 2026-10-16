import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLogin() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({ email: '', password: '' });
    const [submitting, setSubmitting] = useState(false);

    const from = location.state?.from?.pathname || '/admin/dashboard';

    if (isAuthenticated) {
        navigate(from, { replace: true });
    }

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await login(form.email, form.password);
            toast.success('Welcome back!');
            navigate(from, { replace: true });
        } catch (err) {
            const msg =
                err.response?.data?.message || 'Login failed. Check your credentials.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6 py-12"
            style={{
                background:
                    'radial-gradient(ellipse at center, rgba(163,123,52,0.15), transparent 65%), var(--bg)',
            }}
        >
            <div
                className="w-full max-w-md p-8 md:p-10 border"
                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
            >
                <Link
                    to="/"
                    className="block text-center font-serif text-2xl tracking-[0.18em] uppercase mb-2"
                >
                    Nawazish{' '}
                    <em className="italic" style={{ color: 'var(--gold)' }}>
                        Admin
                    </em>
                </Link>
                <p
                    className="text-center text-xs tracking-[0.28em] uppercase mb-8"
                    style={{ color: 'var(--muted)' }}
                >
                    Sign in to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                            style={{ color: 'var(--muted)' }}
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoFocus
                            value={form.email}
                            onChange={handleChange}
                            className="input"
                            placeholder="admin@nawazishfurniture.in"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                            style={{ color: 'var(--muted)' }}
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={form.password}
                            onChange={handleChange}
                            className="input"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-gold w-full disabled:opacity-50"
                    >
                        {submitting ? 'Signing in…' : 'Sign In'}
                    </button>
                </form>

                <p
                    className="text-center text-xs mt-6"
                    style={{ color: 'var(--muted)' }}
                >
                    <Link to="/" className="hover:underline">
                        ← Back to website
                    </Link>
                </p>
            </div>
        </div>
    );
}