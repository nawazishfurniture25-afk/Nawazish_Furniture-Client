export default function Shipping() {
    return (
        <section className="section">
            <div className="container-custom max-w-4xl">
                <p className="eyebrow mb-4">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                    Shipping Policy
                </h1>
                <p
                    className="text-sm mb-10 pb-6 border-b"
                    style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}
                >
                    Last updated: October 15, 2026
                </p>

                <div className="space-y-8">
                    <Section title="1. Delivery Area">
                        <p>
                            We currently deliver{' '}
                            <strong>within Madhya Pradesh only</strong>. This includes
                            Jabalpur, Bhopal, Indore, Gwalior, Ujjain, Sagar, Rewa, Satna,
                            and all other MP districts.
                        </p>
                        <p className="mt-3">
                            For wholesale orders (10+ pieces) outside MP, please contact us
                            — special logistics can be arranged.
                        </p>
                    </Section>

                    <Section title="2. Delivery Timeline">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Stock designs:</strong> 2–3 weeks from advance payment
                            </li>
                            <li>
                                <strong>Custom orders:</strong> 3–4 weeks from design approval
                            </li>
                            <li>
                                <strong>Within Jabalpur:</strong> Free delivery + assembly
                            </li>
                            <li>
                                <strong>Rest of MP:</strong> 3–7 days after piece is ready
                            </li>
                        </ul>
                    </Section>

                    <Section title="3. Delivery Charges">
                        <table className="w-full mt-4 text-sm">
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <th className="text-left py-2">Order Value</th>
                                    <th className="text-left py-2">Delivery Charge</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2">Above ₹25,000</td>
                                    <td className="py-2" style={{ color: 'var(--forest)' }}>
                                        Free
                                    </td>
                                </tr>
                                <tr style={{ borderBottom: '1px solid var(--line)' }}>
                                    <td className="py-2">₹10,000 – ₹25,000</td>
                                    <td className="py-2">₹500</td>
                                </tr>
                                <tr>
                                    <td className="py-2">Below ₹10,000</td>
                                    <td className="py-2">₹1,000 – ₹1,500</td>
                                </tr>
                            </tbody>
                        </table>
                    </Section>

                    <Section title="4. Delivery Process">
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>We call 1 day before delivery to confirm time slot</li>
                            <li>Delivery team brings the piece to your home</li>
                            <li>Assembly and placement included</li>
                            <li>You inspect and sign the delivery challan</li>
                            <li>Final payment collected</li>
                            <li>Warranty card and Bill of Supply handed over</li>
                        </ol>
                    </Section>

                    <Section title="5. Delivery Address Changes">
                        <p>
                            Address can be changed up to 48 hours before dispatch at no
                            extra charge. After dispatch, changes may incur additional
                            charges or require re-delivery.
                        </p>
                    </Section>

                    <Section title="6. Failed Delivery">
                        <p>
                            If no one is available at the delivery address:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-3">
                            <li>Delivery team waits up to 30 minutes</li>
                            <li>Re-delivery is arranged for the next available slot</li>
                            <li>Re-delivery charge of ₹500 may apply for multiple failed attempts</li>
                        </ul>
                    </Section>

                    <Section title="7. Damage During Transit">
                        <p>
                            Rare but possible. If your piece arrives damaged:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-3">
                            <li>Do NOT accept delivery if damage is clearly visible</li>
                            <li>Take photos/video immediately</li>
                            <li>Report to us within 24 hours</li>
                            <li>We repair or replace at our cost</li>
                        </ul>
                    </Section>

                    <Section title="8. Contact">
                        <p>
                            WhatsApp:{' '}
                            <a
                                href="https://wa.me/919713624142"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline"
                                style={{ color: 'var(--gold)' }}
                            >
                                +91 9713624142
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