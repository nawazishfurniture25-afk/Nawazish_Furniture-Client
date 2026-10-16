const STEPS = [
    {
        num: '01',
        title: 'Enquiry',
        duration: 'Day 1',
        desc: 'You submit the custom form or WhatsApp us your requirements.',
    },
    {
        num: '02',
        title: 'Consultation Call',
        duration: 'Day 1–2',
        desc: 'Our team calls you to understand your space, budget, and timeline.',
    },
    {
        num: '03',
        title: 'Design & Quote',
        duration: 'Day 2–4',
        desc: 'We send you a dimensioned sketch, fabric swatches, and fixed pricing.',
    },
    {
        num: '04',
        title: 'Advance Payment',
        duration: 'Day 4–5',
        desc: '50% advance confirms your order. Production slot is booked.',
    },
    {
        num: '05',
        title: 'Production',
        duration: 'Week 1–3',
        desc: 'Your sofa is handcrafted in our Jabalpur workshop. Photos shared on WhatsApp.',
    },
    {
        num: '06',
        title: 'Quality Check',
        duration: 'Week 3',
        desc: 'Final inspection by our senior craftsman. Video walkthrough sent to you.',
    },
    {
        num: '07',
        title: 'Delivery & Setup',
        duration: 'Week 3',
        desc: 'White-glove delivery anywhere in MP. Assembly and cleanup included.',
    },
    {
        num: '08',
        title: 'Final Payment',
        duration: 'On Delivery',
        desc: 'Pay 50% on delivery. Warranty card and Bill of Supply handed over.',
    },
];

export default function CustomTimeline() {
    return (
        <section className="section" style={{ background: 'var(--bg2)' }}>
            <div className="container-custom">
                <div className="mb-14 max-w-3xl">
                    <p className="eyebrow mb-5">Your order journey</p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        From enquiry to{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            delivery in 3 weeks
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        Transparent timeline. No hidden charges. No surprises. You know
                        exactly where your order stands at every step.
                    </p>
                </div>

                {/* Timeline grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {STEPS.map((step, i) => (
                        <div
                            key={step.num}
                            className="relative p-6 border"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            {/* Step number */}
                            <div className="flex items-center justify-between mb-4">
                                <span
                                    className="font-serif italic text-3xl"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    {step.num}
                                </span>
                                <span
                                    className="text-[10px] tracking-[0.24em] uppercase"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    {step.duration}
                                </span>
                            </div>

                            <h3 className="font-serif text-lg mb-2">{step.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--ink2)' }}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}