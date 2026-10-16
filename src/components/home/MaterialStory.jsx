const MATERIALS = [
    {
        num: '01',
        title: 'Seasoned Sheesham',
        subtitle: '2-year air-dried wood',
        description:
            'Every frame begins with Sheesham logs that have been air-dried for two full years. No kiln shortcuts. The result is wood that will not warp, crack, or sag — even after 25 years of daily use.',
        stat: '2 yrs',
        statLabel: 'Seasoning',
    },
    {
        num: '02',
        title: 'High-Density Foam',
        subtitle: '32–40 HR density',
        description:
            'We use 32–40 density HR foam from certified suppliers — the same quality used in premium hotel furniture. Cheaper 18–22 density foam may feel soft for a year, but it compresses permanently. Ours does not.',
        stat: '40 HR',
        statLabel: 'Max density',
    },
    {
        num: '03',
        title: 'Hand-Stitched Upholstery',
        subtitle: '200+ fabric options',
        description:
            'From velvet to bouclé, every fabric is hand-stitched by our tailoring team in Jabalpur. No machine piping. No shortcuts. Each seam is reinforced at the corners — the places where sofas typically tear first.',
        stat: '200+',
        statLabel: 'Fabrics',
    },
    {
        num: '04',
        title: 'Traditional Joinery',
        subtitle: 'No nails in stress points',
        description:
            'Our craftsmen use traditional mortise-and-tenon joints at every stress point. Nails and screws may be faster, but they loosen within a few years. Our joinery holds for generations.',
        stat: '100%',
        statLabel: 'Traditional joints',
    },
];

export default function MaterialStory() {
    return (
        <section className="section">
            <div className="container-custom">
                {/* Header */}
                <div className="max-w-3xl mb-16">
                    <p className="eyebrow mb-5">Behind the craft</p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        What goes into your{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            furniture
                        </em>
                    </h2>
                    <p
                        className="text-base md:text-lg"
                        style={{ color: 'var(--ink2)' }}
                    >
                        Most furniture sellers hide their materials. We show you exactly
                        what goes into every piece — because quality does not need to hide.
                    </p>
                </div>

                {/* Materials Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    {MATERIALS.map((item) => (
                        <div
                            key={item.num}
                            className="group p-6 md:p-8 border transition-colors hover:border-[var(--gold)]"
                            style={{
                                borderColor: 'var(--line)',
                                background: 'var(--card)',
                            }}
                        >
                            {/* Num + Stat */}
                            <div className="flex items-start justify-between mb-6">
                                <span
                                    className="font-serif italic text-4xl md:text-5xl leading-none"
                                    style={{ color: 'var(--gold)', opacity: 0.5 }}
                                >
                                    {item.num}
                                </span>
                                <div className="text-right">
                                    <div
                                        className="font-serif text-2xl md:text-3xl"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        {item.stat}
                                    </div>
                                    <div
                                        className="text-[10px] tracking-[0.24em] uppercase mt-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        {item.statLabel}
                                    </div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="font-serif text-xl md:text-2xl mb-1">
                                {item.title}
                            </h3>
                            <p
                                className="text-xs tracking-[0.16em] uppercase mb-4"
                                style={{ color: 'var(--muted)' }}
                            >
                                {item.subtitle}
                            </p>

                            {/* Description */}
                            <p
                                className="text-sm leading-relaxed"
                                style={{ color: 'var(--ink2)' }}
                            >
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}