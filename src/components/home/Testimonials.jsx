const testimonials = [
    {
        quote:
            'The sofa fits our living room perfectly. Nothing off-the-shelf would have.',
        name: 'Priya S.',
        city: 'Bhopal',
    },
    {
        quote:
            'Delivered on time and the finish is better than showroom pieces.',
        name: 'Rakesh M.',
        city: 'Indore',
    },
    {
        quote: 'Third piece from Nawazish. The frame is rock solid.',
        name: 'Anita J.',
        city: 'Jabalpur',
    },
];

export default function Testimonials() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="mb-14">
                    <p className="eyebrow mb-5">Homes we have furnished</p>
                    <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight">
                        Kind <em className="italic" style={{ color: 'var(--gold)' }}>words</em>
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-3 border-t"
                    style={{ borderColor: 'var(--line-strong)' }}
                >
                    {testimonials.map((t, i) => (
                        <div
                            key={i}
                            className="p-8 md:p-10"
                            style={{
                                borderRight:
                                    i < testimonials.length - 1
                                        ? '1px solid var(--line-strong)'
                                        : 'none',
                                borderBottom: '1px solid var(--line-strong)',
                            }}
                        >
                            <p
                                className="font-serif italic text-lg md:text-xl leading-relaxed mb-6"
                                style={{ color: 'var(--ink2)' }}
                            >
                                "{t.quote}"
                            </p>
                            <cite
                                className="not-italic text-[11px] tracking-[0.2em] uppercase"
                                style={{ color: 'var(--gold)' }}
                            >
                                <strong className="font-medium block mb-1">
                                    {t.name}
                                </strong>
                                <span style={{ color: 'var(--muted)' }}>{t.city}</span>
                            </cite>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}