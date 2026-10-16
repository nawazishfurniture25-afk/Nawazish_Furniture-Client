export default function Refund() {
    return (
        <section className="section">
            <div className="container-custom max-w-4xl">
                <p className="eyebrow mb-4">Legal</p>
                <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">
                    Refund Policy
                </h1>
                <p
                    className="text-sm mb-10 pb-6 border-b"
                    style={{ color: 'var(--muted)', borderColor: 'var(--line)' }}
                >
                    Last updated: October 15, 2026
                </p>

                <div className="space-y-8">
                    <Section title="1. Order Cancellation">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Within 24 hours:</strong> Full refund of advance
                                (100%).
                            </li>
                            <li>
                                <strong>After 24 hours but before production starts:</strong>{' '}
                                90% refund (10% processing charge).
                            </li>
                            <li>
                                <strong>After production starts:</strong> 80% refund (20%
                                charge covers materials and labor already spent).
                            </li>
                            <li>
                                <strong>After dispatch:</strong> No cancellation possible.
                            </li>
                        </ul>
                    </Section>

                    <Section title="2. Returns for Manufacturing Defects">
                        <p>
                            If your piece has a genuine manufacturing defect (broken frame,
                            seam failure, foam sag within warranty period):
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-3">
                            <li>Report within 7 days of delivery with photos/video</li>
                            <li>We inspect and confirm the defect</li>
                            <li>
                                <strong>Repair:</strong> For minor issues, we repair at our
                                cost within 10–15 days
                            </li>
                            <li>
                                <strong>Replace:</strong> For major issues, we remake the
                                piece at no cost
                            </li>
                            <li>
                                <strong>Refund:</strong> If neither repair nor replacement
                                works, full refund within 7 working days
                            </li>
                        </ul>
                    </Section>

                    <Section title="3. Non-Returnable Items">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Custom-made pieces</strong> (specific dimensions,
                                fabric, or design requested by you)
                            </li>
                            <li>
                                Pieces damaged due to misuse, water, pets, or accidents
                            </li>
                            <li>
                                Normal wear and tear (fabric fading, minor foam compression)
                            </li>
                            <li>Pieces altered by third-party carpenters or cleaners</li>
                        </ul>
                    </Section>

                    <Section title="4. Refund Process">
                        <ol className="list-decimal pl-6 space-y-2">
                            <li>Submit your request via WhatsApp or email</li>
                            <li>We confirm the issue within 48 hours</li>
                            <li>
                                If eligible, refund is initiated to your original payment
                                method (UPI/bank transfer)
                            </li>
                            <li>Refund reflects in 5–7 working days</li>
                        </ol>
                    </Section>

                    <Section title="5. Shipping Charges on Returns">
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Defective pieces:</strong> We bear the return
                                shipping cost.
                            </li>
                            <li>
                                <strong>Change of mind:</strong> Not eligible for return.
                            </li>
                        </ul>
                    </Section>

                    <Section title="6. Contact for Refunds">
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
                        <p>
                            Email:{' '}
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