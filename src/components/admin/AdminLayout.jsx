import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    LogOut,
    Menu,
    X,
    Home,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

import { MessageSquare } from 'lucide-react';   // ← top me add karo

const NAV_ITEMS = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/products', label: 'Products', icon: Package },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingCart },
    { path: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare },   // ← ADD
];

export default function AdminLayout({ children, title }) {
    const { user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/admin');
    };

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 flex flex-col transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
                style={{ background: 'var(--bg2)', borderRight: '1px solid var(--line)' }}
            >
                <div
                    className="p-6 border-b flex items-center justify-between"
                    style={{ borderColor: 'var(--line)' }}
                >
                    <Link to="/" className="font-serif text-lg tracking-wider">
                        Nawazish{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            Admin
                        </em>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                        aria-label="Close sidebar"
                    >
                        <X size={18} />
                    </button>
                </div>

                <div
                    className="p-4 border-b text-sm"
                    style={{ borderColor: 'var(--line)' }}
                >
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs" style={{ color: 'var(--muted)' }}>
                        {user?.email}
                    </div>
                </div>

                <nav className="flex-1 p-3">
                    {NAV_ITEMS.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm transition-colors"
                                style={{
                                    background: isActive ? 'var(--gold)' : 'transparent',
                                    color: isActive ? '#fff' : 'var(--ink2)',
                                }}
                            >
                                <Icon size={18} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div
                    className="p-3 border-t space-y-1"
                    style={{ borderColor: 'var(--line)' }}
                >
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-[var(--bg3)]"
                        style={{ color: 'var(--ink2)' }}
                    >
                        <Home size={18} />
                        View Site
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-[var(--bg3)]"
                        style={{ color: 'var(--terra)' }}
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className="flex-1 flex flex-col min-w-0">
                <header
                    className="sticky top-0 z-20 flex items-center justify-between px-4 md:px-8 py-4 border-b"
                    style={{ background: 'var(--bg)', borderColor: 'var(--line)' }}
                >
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                            aria-label="Open sidebar"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className="font-serif text-xl md:text-2xl">{title}</h1>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-8 overflow-x-auto">{children}</main>
            </div>
        </div>
    );
}