const TIERS = [
    {
        qty: '5–9 pieces',
        price: 'Standard',
        discount: '—',
        features: ['Free delivery in MP', 'Standard lead time', 'Retail price'],
        highlighted: false,
    },
    {
        qty: '10–24 pieces',
        price: '15% off',
        discount: '15%',
        features: [
            'Free delivery + assembly',
            'Priority production',
            'Custom branding available',
            'Dedicated account manager',
        ],
        highlighted: true,
    },
    {
        qty: '25–49 pieces',
        price: '25% off',
        discount: '25%',
        features: [
            'All 15% tier benefits',
            'Custom fabric sourcing',
            'Free swatch kit',
            'Flexible payment terms',
            'Extended warranty',
        ],
        highlighted: false,
    },
    {
        qty: '50+ pieces',
        price: 'Custom quote',
        discount: 'Custom',
        features: [
            'All 25% tier benefits',
            'White-label manufacturing',
            'Volume-based discounts',
            'Contractual pricing',
            'Free design consultation',
        ],
        highlighted: false,
    },
];

export default function BulkPricing() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="text-center mb-14 max-w-3xl mx-auto">
                    <p className="eyebrow justify-center mb-5 inline-flex">
                        Wholesale pricing
                    </p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        The more you order,{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            the more you save
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        Factory-direct pricing for retailers, hotels, offices, and interior
                        designers across Madhya Pradesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {TIERS.map((tier, i) => (
                        <div
                            key={i}
                            className={`relative p-6 md:p-7 border flex flex-col ${tier.highlighted ? 'md:scale-105 z-10' : ''
                                }`}
                            style={{
                                borderColor: tier.highlighted
                                    ? 'var(--gold)'
                                    : 'var(--line)',
                                background: tier.highlighted ? 'var(--card)' : 'transparent',
                            }}
                        >
                            {tier.highlighted && (
                                <div
                                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-[10px] tracking-[0.24em] uppercase font-medium"
                                    style={{ background: 'var(--gold)', color: '#fff' }}
                                >
                                    Most Popular
                                </div>
                            )}

                            <div
                                className="text-[10px] tracking-[0.24em] uppercase mb-3"
                                style={{ color: 'var(--muted)' }}
                            >
                                {tier.qty}
                            </div>

                            <div
                                className="font-serif text-3xl md:text-4xl mb-5"
                                style={{ color: 'var(--gold)' }}
                            >
                                {tier.price}
                            </div>

                            <ul className="space-y-3 mb-6 flex-1">
                                {tier.features.map((f, j) => (
                                    <li
                                        key={j}
                                        className="text-sm flex gap-2"
                                        style={{ color: 'var(--ink2)' }}
                                    >
                                        <span style={{ color: 'var(--gold)' }}>◆</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="/contact"
                                className={`btn w-full ${tier.highlighted ? 'btn-gold' : ''
                                    }`}
                            >
                                Enquire
                            </a>
                        </div>
                    ))}
                </div>

                <p
                    className="text-center text-xs mt-10"
                    style={{ color: 'var(--muted)' }}
                >
                    All prices exclude GST (we are not GST-registered yet). Terms:
                    50% advance, 50% on delivery. Lead time: 2–4 weeks.
                </p>
            </div>
        </section>
    );
}