import { Link } from 'react-router-dom';

export default function Terms() {
    const lastUpdated = 'October 15, 2026';

    return (
        <section className="section">
            <div className="container-custom max-w-4xl">
                <p className="eyebrow mb-4">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                    Terms & Conditions
                </h1>
                <p
                    className="text-sm mb-10 pb-6 border-b"
                    style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}
                >
                    Last updated: {lastUpdated}
                </p>

                <div className="space-y-8">
                    <Section title="1. Agreement to Terms">
                        <p>
                            By accessing or using the Nawazish Furniture website
                            ("Site"), you agree to be bound by these Terms & Conditions.
                            If you do not agree, please do not use the Site.
                        </p>
                    </Section>

                    <Section title="2. About Us">
                        <p>
                            Nawazish Furniture is a sole-proprietor furniture manufacturing
                            business based in Jabalpur, Madhya Pradesh, India. We are
                            currently an unregistered MSME (turnover below ₹40 lakh
                            threshold) and issue a "Bill of Supply" instead of a GST tax
                            invoice.
                        </p>
                    </Section>

                    <Section title="3. Products & Pricing">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                All prices are in Indian Rupees (₹) and are subject to change
                                without notice.
                            </li>
                            <li>
                                Product images are for representation. Actual fabric colors
                                may vary slightly due to screen differences.
                            </li>
                            <li>
                                Dimensions are approximate. Custom orders are made to your
                                exact specifications.
                            </li>
                            <li>
                                Prices exclude GST (we are not yet GST-registered). Once
                                registered, 18% GST will apply on all furniture (HSN 9401).
                            </li>
                        </ul>
                    </Section>

                    <Section title="4. Orders & Payment">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Order Confirmation:</strong> Orders are confirmed
                                only after 50% advance payment is received.
                            </li>
                            <li>
                                <strong>Payment Terms:</strong> 50% advance, 50% on
                                delivery. We accept UPI, bank transfer, and cash.
                            </li>
                            <li>
                                <strong>Order Cancellation:</strong> You may cancel within
                                24 hours of placing the order for a full refund of the
                                advance. After production starts, cancellations attract a
                                20% charge.
                            </li>
                        </ul>
                    </Section>

                    <Section title="5. Delivery">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Delivery Area:</strong> We deliver within Madhya
                                Pradesh only. Interstate delivery is not available at
                                present.
                            </li>
                            <li>
                                <strong>Lead Time:</strong> 2–3 weeks for stock designs,
                                3–4 weeks for custom orders.
                            </li>
                            <li>
                                <strong>Delivery Charges:</strong> Free for orders above
                                ₹25,000 within MP. Below that, ₹500–₹1,500 applies
                                depending on location.
                            </li>
                            <li>
                                <strong>Risk of Loss:</strong> Risk passes to you upon
                                delivery. Please inspect the piece before signing.
                            </li>
                        </ul>
                    </Section>

                    <Section title="6. Warranty">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>10-year warranty</strong> on all wooden frames.
                            </li>
                            <li>
                                <strong>2-year warranty</strong> on foam and upholstery for
                                manufacturing defects.
                            </li>
                            <li>
                                <strong>Not covered:</strong> Normal wear, misuse, water
                                damage, pet damage, or alterations by third parties.
                            </li>
                            <li>
                                Warranty honoured with original Bill of Supply.
                            </li>
                        </ul>
                    </Section>

                    <Section title="7. Refunds & Returns">
                        <p>
                            See our full{' '}
                            <Link
                                to="/refund"
                                className="underline"
                                style={{ color: 'var(--gold)' }}
                            >
                                Refund Policy
                            </Link>
                            . In short: Custom-made pieces are non-returnable unless
                            defective. Manufacturing defects are repaired or replaced at
                            our cost.
                        </p>
                    </Section>

                    <Section title="8. Intellectual Property">
                        <p>
                            All content on this Site — including text, images, design,
                            logos, and code — is the property of Nawazish Furniture and
                            protected by Indian copyright laws. Unauthorised use is
                            prohibited.
                        </p>
                    </Section>

                    <Section title="9. Limitation of Liability">
                        <p>
                            Nawazish Furniture is not liable for indirect, incidental, or
                            consequential damages arising from use of our products or
                            Site. Our total liability is limited to the amount you paid
                            for the product in question.
                        </p>
                    </Section>

                    <Section title="10. Governing Law">
                        <p>
                            These Terms are governed by the laws of India. Any disputes
                            shall be subject to the exclusive jurisdiction of the courts
                            in Jabalpur, Madhya Pradesh.
                        </p>
                    </Section>

                    <Section title="11. Changes to Terms">
                        <p>
                            We may update these Terms at any time. Continued use of the
                            Site after changes constitutes acceptance of the new Terms.
                        </p>
                    </Section>

                    <Section title="12. Contact">
                        <div
                            className="p-5 border"
                            style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                        >
                            <p className="font-medium mb-2">Nawazish Furniture</p>
                            <p>5WWQ+499, Raddi Chowki, Gazi Nagar</p>
                            <p>Adhartal, Jabalpur, MP — 482004</p>
                            <p className="mt-2">
                                Email:{' '}
                                <a
                                    href="mailto:nawazishfurniture@gmail.com"
                                    className="underline"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    nawazishfurniture@gmail.com
                                </a>
                            </p>
                        </div>
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