export default function Cookies() {
    return (
        <section className="section">
            <div className="container-custom max-w-4xl">
                <p className="eyebrow mb-4">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                    Cookie Policy
                </h1>
                <p
                    className="text-sm mb-10 pb-6 border-b"
                    style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}
                >
                    Last updated: October 15, 2026
                </p>

                <div className="space-y-8">
                    <Section title="1. What Are Cookies?">
                        <p>
                            Cookies are small text files stored on your device when you
                            visit a website. They help the site remember your preferences
                            and improve your experience.
                        </p>
                    </Section>

                    <Section title="2. Cookies We Use">
                        <table className="w-full mt-4 text-sm">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <th className="text-left py-2">Cookie</th>
                                    <th className="text-left py-2">Purpose</th>
                                    <th className="text-left py-2">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2 font-mono text-xs">nawazish_cart</td>
                                    <td className="py-2">Stores your shopping cart items</td>
                                    <td className="py-2">30 days</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2 font-mono text-xs">nawazish_wishlist</td>
                                    <td className="py-2">Stores your wishlist items</td>
                                    <td className="py-2">30 days</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2 font-mono text-xs">nawazish_theme</td>
                                    <td className="py-2">Remembers light/dark mode preference</td>
                                    <td className="py-2">1 year</td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2 font-mono text-xs">nawazish_admin_token</td>
                                    <td className="py-2">Admin login session (only for admin panel)</td>
                                    <td className="py-2">30 days</td>
                                </tr>
                                <tr>
                                    <td className="py-2 font-mono text-xs">cookie_consent</td>
                                    <td className="py-2">Remembers your cookie preference</td>
                                    <td className="py-2">1 year</td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Section title="3. Third-Party Cookies">
                        <p>
                            We may use third-party services that set their own cookies:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-3">
                            <li>
                                <strong>Google Analytics:</strong> To understand site traffic
                                (anonymised)
                            </li>
                            <li>
                                <strong>Razorpay:</strong> When you make a payment (their
                                cookie policy applies)
                            </li>
                        </ul>
                    </Section>

                    <Section title="4. Managing Cookies">
                        <p>
                            You can control cookies through your browser settings:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-3">
                            <li>
                                <strong>Chrome:</strong> Settings → Privacy → Cookies
                            </li>
                            <li>
                                <strong>Safari:</strong> Preferences → Privacy → Cookies
                            </li>
                            <li>
                                <strong>Firefox:</strong> Preferences → Privacy → Cookies
                            </li>
                        </ul>
                        <p className="mt-3">
                            Note: Disabling essential cookies may break site functionality
                            (like the shopping cart).
                        </p>
                    </Section>

                    <Section title="5. Consent">
                        <p>
                            By continuing to use our site, you consent to our use of
                            cookies as described above. You can withdraw consent anytime
                            by clearing cookies from your browser.
                        </p>
                    </Section>

                    <Section title="6. Contact">
                        <p>
                            Questions? Email{' '}
                            <a
                                href="mailto:nawazishfurniture@gmail.com"
                                className="underline"
                                style={{ color: 'var(--gold)' }}
                            >
                                nawazishfurniture@gmail.com
                            </a>
                        </p>
                    </Section>
                </div>
            </div>
        </section>
    );
}

function Section({ title, children }) {
    return (
        <div className="pt-6 border-t" style={{ borderColor: 'var(--line)' }}>
            <h2 className="font-serif text-xl mb-4">{title}</h2>
            <div style={{ color: 'var(--ink2)', lineHeight: 1.9 }}>{children}</div>
        </div>
    );
}