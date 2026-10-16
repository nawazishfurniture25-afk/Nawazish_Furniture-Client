const TEAM = [
    {
        name: 'Mohammed Nawazish',
        role: 'Founder & Master Craftsman',
        years: '25 years',
        bio: 'Started the workshop in 1998 with a single carpenter\'s bench. Still personally reviews every sofa frame before it leaves the atelier.',
        initial: 'MN',
    },
    {
        name: 'Abdul Rahman',
        role: 'Head of Upholstery',
        years: '18 years',
        bio: 'Leads our tailoring team. Has hand-stitched over 8,000 pieces. Expert in velvet, linen, and traditional Indian patterns.',
        initial: 'AR',
    },
    {
        name: 'Sunil Verma',
        role: 'Senior Carpenter',
        years: '15 years',
        bio: 'Specialist in mortise-and-tenon joinery. Trained three generations of apprentices. Built our first-ever L-shape sectional.',
        initial: 'SV',
    },
    {
        name: 'Priya Sharma',
        role: 'Design Consultant',
        years: '7 years',
        bio: 'Works with customers on fabric selection, dimensions, and space planning. Available for home visits within Jabalpur.',
        initial: 'PS',
    },
];

export default function TeamSection() {
    return (
        <section className="section" style={{ background: 'var(--bg2)' }}>
            <div className="container-custom">
                {/* Header */}
                <div className="mb-14 max-w-3xl">
                    <p className="eyebrow mb-5">The people</p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        Meet the{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            craftsmen
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        Our sofas are made by fourteen skilled artisans. Each brings
                        decades of experience and a personal commitment to quality that
                        machines cannot replicate.
                    </p>
                </div>

                {/* Team grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {TEAM.map((member) => (
                        <div
                            key={member.name}
                            className="p-6 md:p-7 border text-center transition-colors hover:border-[var(--gold)]"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            {/* Avatar circle */}
                            <div
                                className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center font-serif text-2xl font-medium"
                                style={{ background: 'var(--gold)', color: '#fff' }}
                            >
                                {member.initial}
                            </div>

                            {/* Name */}
                            <h3 className="font-serif text-lg mb-1">{member.name}</h3>

                            {/* Role */}
                            <p
                                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                                style={{ color: 'var(--gold)' }}
                            >
                                {member.role}
                            </p>

                            {/* Years */}
                            <p
                                className="text-[10px] tracking-[0.24em] uppercase mb-4 pb-4 border-b"
                                style={{
                                    color: 'var(--muted)',
                                    borderColor: 'var(--line)',
                                }}
                            >
                                {member.years}
                            </p>

                            {/* Bio */}
                            <p
                                className="text-xs leading-relaxed"
                                style={{ color: 'var(--ink2)' }}
                            >
                                {member.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}