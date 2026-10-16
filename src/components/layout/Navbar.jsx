import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingBag, Moon, Sun, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

const links = [
    { path: '/', label: 'Home' },
    { path: '/collections', label: 'Collections' },
    { path: '/custom', label: 'Atelier' },
    { path: '/about', label: 'Heritage' },
    { path: '/contact', label: 'Contact' },
];

export default function Navbar({ onOpenCart, onOpenWishlist }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { totalItems } = useCart();
    const { count: wishlistCount } = useWishlist();
    const { isDark, toggleTheme } = useTheme();
    const location = useLocation();

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    // Add backdrop blur on scroll
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${scrolled
                ? 'bg-cream/90 dark:bg-ink/90 backdrop-blur-md border-[var(--line)]'
                : 'bg-transparent border-transparent'
                }`}
            style={{
                backgroundColor: scrolled
                    ? isDark
                        ? 'rgba(10,9,8,0.9)'
                        : 'rgba(246,241,231,0.9)'
                    : 'transparent',
                borderColor: scrolled ? 'var(--line)' : 'transparent',
            }}
        >
            <nav className="max-w-[1440px] mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
                {/* Brand */}
                <Link
                    to="/"
                    className="font-serif text-lg md:text-2xl tracking-[0.18em] uppercase whitespace-nowrap"
                    style={{ color: 'var(--ink)' }}
                >
                    Nawazish <em className="italic" style={{ color: 'var(--gold)' }}>Furniture</em>
                </Link>

                {/* Desktop links */}
                <ul className="hidden lg:flex items-center gap-8">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="text-[10px] tracking-[0.32em] uppercase pb-2 border-b border-transparent transition-colors hover:border-[var(--gold)]"
                                    style={{
                                        color: isActive ? 'var(--gold)' : 'var(--ink-soft)',
                                        borderBottomColor: isActive ? 'var(--gold)' : 'transparent',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    {/* Enquire CTA */}
                    <Link
                        to="/contact"
                        className="hidden md:inline-flex items-center px-5 h-10 border text-[10px] tracking-[0.24em] uppercase transition-colors"
                        style={{
                            borderColor: 'var(--gold)',
                            color: 'var(--gold)',
                        }}
                    >
                        Enquire
                    </Link>

                    {/* Wishlist */}
                    <button
                        onClick={onOpenWishlist}
                        aria-label="Open wishlist"
                        className="relative w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--gold)]"
                        style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-soft)' }}
                    >
                        <Heart size={17} />
                        {wishlistCount > 0 && (
                            <span
                                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
                                style={{ background: 'var(--gold)', color: '#fff' }}
                            >
                                {wishlistCount}
                            </span>
                        )}
                    </button>

                    {/* Cart */}
                    <button
                        onClick={onOpenCart}
                        aria-label="Open cart"
                        className="relative w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--gold)]"
                        style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-soft)' }}
                    >
                        <ShoppingBag size={17} />
                        {totalItems > 0 && (
                            <span
                                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
                                style={{ background: 'var(--gold)', color: '#fff' }}
                            >
                                {totalItems}
                            </span>
                        )}
                    </button>

                    {/* Theme toggle */}
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                        className="w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center transition-colors hover:border-[var(--gold)]"
                        style={{ borderColor: 'var(--line-strong)', color: 'var(--ink-soft)' }}
                    >
                        {isDark ? <Sun size={17} /> : <Moon size={17} />}
                    </button>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                        className="lg:hidden w-10 h-10 rounded-full border flex items-center justify-center"
                        style={{ borderColor: 'var(--line-strong)', color: 'var(--ink)' }}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-500 ${mobileOpen ? 'max-h-[400px]' : 'max-h-0'
                    }`}
                style={{
                    background: isDark ? 'rgba(10,9,8,0.98)' : 'rgba(246,241,231,0.98)',
                    borderTop: mobileOpen ? '1px solid var(--line)' : 'none',
                }}
            >
                <ul className="flex flex-col py-4">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="block px-6 py-4 font-serif text-2xl border-b transition-colors"
                                    style={{
                                        color: isActive ? 'var(--gold)' : 'var(--ink)',
                                        borderColor: 'var(--line)',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </header>
    );
}