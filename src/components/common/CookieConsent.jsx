import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X } from 'lucide-react';

const STORAGE_KEY = 'nawazish_cookie_consent';

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Check if user already consented
        try {
            const consent = localStorage.getItem(STORAGE_KEY);
            if (!consent) {
                // Show after 1.5 seconds
                const timer = setTimeout(() => setVisible(true), 1500);
                return () => clearTimeout(timer);
            }
        } catch {
            // localStorage blocked — don't show
        }
    }, []);

    const accept = () => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    accepted: true,
                    date: new Date().toISOString(),
                    version: '1.0',
                })
            );
        } catch { }
        setVisible(false);
    };

    const decline = () => {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    accepted: false,
                    date: new Date().toISOString(),
                    version: '1.0',
                })
            );
        } catch { }
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div
            className="fixed bottom-0 left-0 right-0 z-[300] p-4 md:p-6"
            style={{
                background: 'var(--bg)',
                borderTop: '1px solid var(--line)',
                boxShadow: '0 -10px 40px rgba(0,0,0,0.15)',
                animation: 'slideUpCookie 0.5s ease-out',
            }}
            role="dialog"
            aria-label="Cookie consent"
        >
            <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center gap-4">
                {/* Icon */}
                <Cookie
                    size={24}
                    style={{ color: 'var(--gold)', flexShrink: 0 }}
                    className="hidden md:block"
                />

                {/* Text */}
                <div className="flex-1">
                    <p
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--ink2)' }}
                    >
                        We use cookies to improve your experience, remember your cart,
                        and analyse site traffic. By continuing, you agree to our{' '}
                        <Link
                            to="/cookies"
                            className="underline"
                            style={{ color: 'var(--gold)' }}
                        >
                            Cookie Policy
                        </Link>{' '}
                        and{' '}
                        <Link
                            to="/privacy"
                            className="underline"
                            style={{ color: 'var(--gold)' }}
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 w-full md:w-auto flex-shrink-0">
                    <button
                        onClick={decline}
                        className="flex-1 md:flex-initial px-5 py-3 text-xs tracking-[0.2em] uppercase border"
                        style={{
                            borderColor: 'var(--line-strong)',
                            color: 'var(--ink2)',
                        }}
                    >
                        Decline
                    </button>
                    <button
                        onClick={accept}
                        className="flex-1 md:flex-initial px-5 py-3 text-xs tracking-[0.2em] uppercase"
                        style={{ background: 'var(--gold)', color: '#fff' }}
                    >
                        Accept All
                    </button>
                </div>

                {/* Close (acts like decline) */}
                <button
                    onClick={decline}
                    aria-label="Close cookie banner"
                    className="absolute top-3 right-3 md:hidden"
                    style={{ color: 'var(--muted)' }}
                >
                    <X size={18} />
                </button>
            </div>

            <style>{`
        @keyframes slideUpCookie {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
}