const steps = [
    {
        num: 'I',
        title: 'Consultation',
        desc: 'Share your room, size and taste on WhatsApp or at the atelier.',
    },
    {
        num: 'II',
        title: 'Sketch & Select',
        desc: 'We draw the piece and send fabric swatches.',
    },
    {
        num: 'III',
        title: 'The Craft',
        desc: 'Frame, foam and stitching are made by hand in Jabalpur.',
    },
    {
        num: 'IV',
        title: 'Delivery',
        desc: 'White-glove delivery and setup anywhere in Madhya Pradesh.',
    },
];

export default function ProcessSection() {
    return (
        <section className="section" style={{ background: 'var(--bg2)' }}>
            <div className="container-custom">
                <div className="mb-14">
                    <p className="eyebrow mb-5">Process</p>
                    <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight">
                        From first sketch to{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            final stitch
                        </em>
                    </h2>
                </div>

                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t"
                    style={{ borderColor: 'var(--line-strong)' }}
                >
                    {steps.map((step, i) => (
                        <div
                            key={step.num}
                            className="p-8 md:p-10 transition-colors duration-500 hover:bg-[var(--bg3)]"
                            style={{
                                borderRight:
                                    i < steps.length - 1 ? '1px solid var(--line-strong)' : 'none',
                                borderBottom: '1px solid var(--line-strong)',
                            }}
                        >
                            <div
                                className="font-serif italic text-5xl md:text-6xl mb-6 leading-none"
                                style={{ color: 'var(--gold)' }}
                            >
                                {step.num}
                            </div>
                            <h3 className="font-serif text-xl mb-3">{step.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}