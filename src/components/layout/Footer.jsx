import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer
            className="mt-0 border-t"
            style={{
                background: 'var(--bg2)',
                borderColor: 'var(--line)',
            }}
        >
            <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* Brand */}
                    <div>
                        <Link
                            to="/"
                            className="font-serif text-2xl tracking-[0.18em] uppercase inline-block mb-4"
                        >
                            Nawazish <em className="italic" style={{ color: 'var(--gold)' }}>Furniture</em>
                        </Link>
                        <p
                            className="text-sm leading-relaxed max-w-[280px]"
                            style={{ color: 'var(--muted)' }}
                        >
                            Handcrafted sofas made in Jabalpur, delivered across Madhya Pradesh.
                            Furniture that whispers.
                        </p>
                    </div>

                    {/* Explore */}
                    <nav aria-label="Footer">
                        <h2 className="text-[10px] tracking-[0.32em] uppercase font-medium mb-4"
                            style={{ color: 'var(--gold)' }}>
                            Explore
                        </h2>
                        <ul className="space-y-2">
                            {[
                                { path: '/collections', label: 'Collections' },
                                { path: '/custom', label: 'Atelier' },
                                { path: '/about', label: 'Heritage' },
                                { path: '/contact', label: 'Contact' },
                            ].map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-sm transition-colors hover:text-[var(--gold)]"
                                        style={{ color: 'var(--ink2)' }}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div>
                        <h2 className="text-[10px] tracking-[0.32em] uppercase font-medium mb-4"
                            style={{ color: 'var(--gold)' }}>
                            Contact
                        </h2>
                        <address className="not-italic text-sm space-y-2">
                            <p>
                                <a
                                    href="tel:+919713624142"
                                    className="transition-colors hover:text-[var(--gold)]"
                                    style={{ color: 'var(--ink2)' }}
                                >
                                    +91 9713624142
                                </a>
                            </p>
                            <p>
                                <a
                                    href="mailto:nawazishfurniture25@gmail.com"
                                    className="transition-colors hover:text-[var(--gold)]"
                                    style={{ color: 'var(--ink2)' }}
                                >
                                    nawazishfurniture25@gmail.com
                                </a>
                            </p>
                            <p style={{ color: 'var(--ink2)' }}>5WWQ+499, Raddi Chowki
                                Gazi Nagar, Adhartal
                                Jabalpur, MP — 482004</p>
                        </address>
                    </div>

                    {/* Hours */}
                    <div>
                        <h2 className="text-[10px] tracking-[0.32em] uppercase font-medium mb-4"
                            style={{ color: 'var(--gold)' }}>
                            Hours
                        </h2>
                        <ul className="text-sm space-y-2" style={{ color: 'var(--ink2)' }}>
                            <li>Mon–Sat, 10 AM – 8 PM</li>
                            <li>Sunday by appointment</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t" style={{ borderColor: 'var(--line)' }}>
                <div className="max-w-[1440px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-xs" style={{ color: 'var(--muted)' }}>
                    <span>© {year} Nawazish Furniture · Bill of Supply (no GST)</span>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link to="/privacy" className="hover:text-[var(--gold)]">Privacy</Link>
                        <Link to="/terms" className="hover:text-[var(--gold)]">Terms</Link>
                        <Link to="/refund" className="hover:text-[var(--gold)]">Refund</Link>
                        <Link to="/shipping" className="hover:text-[var(--gold)]">Shipping</Link>
                        <Link to="/cookies" className="hover:text-[var(--gold)]">Cookies</Link>
                    </div>

                    <span>Jabalpur, Madhya Pradesh</span>
                </div>
            </div>
        </footer>
    );
}