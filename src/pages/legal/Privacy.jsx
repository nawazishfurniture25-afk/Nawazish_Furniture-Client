import { Link } from 'react-router-dom';
import SEO from '../../components/common/SEO';

export default function Privacy() {
    const lastUpdated = 'October 15, 2026';

    return (
        <>
            <SEO
                title="Privacy Policy"
                description="How Nawazish Furniture collects, uses, and protects your personal information."
                url="/privacy"
                noindex={false}      // Yeh indexable rehna chahiye
            />
            <section className="section">
                <div className="container-custom max-w-4xl">
                    <p className="eyebrow mb-4">Legal</p>
                    <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                        Privacy Policy
                    </h1>
                    <p
                        className="text-sm mb-10 pb-6 border-b"
                        style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}
                    >
                        Last updated: {lastUpdated}
                    </p>

                    <div className="prose-legal space-y-8">
                        <div>
                            <p style={{ color: 'var(--ink2)', lineHeight: 1.9 }}>
                                At <strong>Nawazish Furniture</strong> ("we", "us", "our"),
                                we respect your privacy and are committed to protecting your
                                personal information. This Privacy Policy explains how we
                                collect, use, and safeguard your data when you visit our
                                website or place an order with us.
                            </p>
                        </div>

                        <Section title="1. Information We Collect">
                            <p>We collect the following types of information:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>
                                    <strong>Personal Information:</strong> Name, phone number,
                                    email address, delivery address, and pincode when you place
                                    an order or submit an enquiry form.
                                </li>
                                <li>
                                    <strong>Payment Information:</strong> When you pay online,
                                    your payment details are processed by our payment partner
                                    Razorpay. We do not store your card, UPI, or bank details on
                                    our servers.
                                </li>
                                <li>
                                    <strong>Device & Usage Data:</strong> IP address, browser
                                    type, device information, pages visited, and time spent on
                                    our site (via analytics tools).
                                </li>
                                <li>
                                    <strong>Cookies:</strong> Small text files stored on your
                                    device to improve your browsing experience.
                                </li>
                            </ul>
                        </Section>

                        <Section title="2. How We Use Your Information">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To process and deliver your orders</li>
                                <li>To communicate order updates via WhatsApp, SMS, or call</li>
                                <li>To respond to your enquiries and provide customer support</li>
                                <li>To improve our website, products, and services</li>
                                <li>
                                    To send promotional offers (only if you explicitly opt in)
                                </li>
                                <li>To comply with legal and tax obligations</li>
                            </ul>
                        </Section>

                        <Section title="3. Information Sharing">
                            <p>
                                We <strong>do not sell, rent, or trade</strong> your personal
                                information. We share data only with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>
                                    <strong>Delivery Partners:</strong> Name, phone, and address
                                    shared with logistics providers to deliver your order.
                                </li>
                                <li>
                                    <strong>Payment Gateways:</strong> Razorpay for processing
                                    online payments securely.
                                </li>
                                <li>
                                    <strong>Legal Authorities:</strong> If required by law or to
                                    protect our rights.
                                </li>
                            </ul>
                        </Section>

                        <Section title="4. Data Security">
                            <p>
                                We use industry-standard security measures including SSL
                                encryption, secure servers, and restricted data access. However,
                                no online transmission is 100% secure. You share information at
                                your own risk.
                            </p>
                        </Section>

                        <Section title="5. Your Rights">
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-3">
                                <li>Access the personal data we hold about you</li>
                                <li>Request correction of inaccurate data</li>
                                <li>Request deletion of your data (subject to legal retention requirements)</li>
                                <li>Opt out of promotional communications at any time</li>
                            </ul>
                            <p className="mt-3">
                                To exercise these rights, email us at{' '}
                                <a
                                    href="mailto:nawazishfurniture25@gmail.com"
                                    className="underline"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    nawazishfurniture25@gmail.com
                                </a>
                                .
                            </p>
                        </Section>

                        <Section title="6. Cookies">
                            <p>
                                We use cookies for essential site functionality, analytics, and
                                remembering your preferences. You can disable cookies in your
                                browser settings. See our{' '}
                                <Link
                                    to="/cookies"
                                    className="underline"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    Cookie Policy
                                </Link>{' '}
                                for details.
                            </p>
                        </Section>

                        <Section title="7. Third-Party Links">
                            <p>
                                Our website may contain links to third-party sites (e.g.,
                                WhatsApp, Google Maps). We are not responsible for their privacy
                                practices.
                            </p>
                        </Section>

                        <Section title="8. Children's Privacy">
                            <p>
                                Our services are not intended for children under 18. We do not
                                knowingly collect data from minors.
                            </p>
                        </Section>

                        <Section title="9. Changes to This Policy">
                            <p>
                                We may update this Privacy Policy from time to time. Changes
                                will be posted on this page with an updated "Last updated" date.
                            </p>
                        </Section>

                        <Section title="10. Contact Us">
                            <p>
                                For any privacy-related questions, contact:
                            </p>
                            <div
                                className="mt-4 p-5 border"
                                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                            >
                                <p className="font-medium mb-2">Nawazish Furniture</p>
                                <p>5WWQ+499, Raddi Chowki, Gazi Nagar</p>
                                <p>Adhartal, Jabalpur, MP — 482004</p>
                                <p className="mt-2">
                                    Email:{' '}
                                    <a
                                        href="mailto:nawazishfurniture25@gmail.com"
                                        className="underline"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        nawazishfurniture25@gmail.com
                                    </a>
                                </p>
                                <p>
                                    Phone:{' '}
                                    <a
                                        href="tel:+919713624142"
                                        className="underline"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        +91 9713624142
                                    </a>
                                </p>
                            </div>
                        </Section>
                    </div>
                </div>

                {/* Legal styles */}
                <style>{`
        .prose-legal h2 {
          font-family: 'Fraunces', serif;
          font-size: 1.25rem;
          margin-bottom: 0.75rem;
          color: var(--ink);
        }
        .prose-legal p {
          color: var(--ink2);
          line-height: 1.9;
          margin-bottom: 0.75rem;
        }
      `}</style>
            </section>
        </>
    );
}

function Section({ title, children }) {
    return (
        <div
            className="pt-6 border-t"
            style={{ borderColor: 'var(--line)' }}
        >
            <h2 className="font-serif text-xl mb-4">{title}</h2>
            {children}
        </div>
    );
}