const FABRICS = [
    {
        name: 'Velvet',
        colors: ['#4a2a1a', '#1b4d33', '#6b1a2b', '#1e3154'],
        desc: 'Plush, rich, luxurious. Perfect for formal living rooms.',
        price: 'Premium',
    },
    {
        name: 'Linen',
        colors: ['#d9c9a8', '#c5bcac', '#8a7a5e', '#e6dcc6'],
        desc: 'Breathable, natural, textured. Ideal for Indian summers.',
        price: 'Standard',
    },
    {
        name: 'Leatherette',
        colors: ['#3a2010', '#1a1a1a', '#4a3a2a', '#6b3a1a'],
        desc: 'Durable, easy to clean. Great for families with kids.',
        price: 'Premium',
    },
    {
        name: 'Bouclé',
        colors: ['#efe7d6', '#d4c4a8', '#c8b896', '#e8dcc0'],
        desc: 'Trendy, soft, textured. Modern minimalist look.',
        price: 'Luxury',
    },
    {
        name: 'Cotton Blend',
        colors: ['#f5f0e8', '#b8542c', '#2f4a3c', '#7a5a26'],
        desc: 'Affordable, breathable, easy maintenance.',
        price: 'Budget',
    },
    {
        name: 'Jute',
        colors: ['#c8b896', '#a89060', '#8a7a5e', '#e6dcc6'],
        desc: 'Earthy, rustic, durable. Traditional Indian aesthetic.',
        price: 'Standard',
    },
];

export default function FabricShowcase() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="mb-14 max-w-3xl">
                    <p className="eyebrow mb-5">Fabric library</p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        200+ fabrics,{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            touched before you choose
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        We courier free swatches anywhere in Madhya Pradesh so you can feel
                        the fabric before ordering. Or visit our atelier to run your hand
                        across every option.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {FABRICS.map((fabric) => (
                        <div
                            key={fabric.name}
                            className="p-6 border transition-colors hover:border-[var(--gold)]"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-serif text-xl">{fabric.name}</h3>
                                <span
                                    className="text-[10px] tracking-[0.24em] uppercase"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    {fabric.price}
                                </span>
                            </div>

                            {/* Color swatches */}
                            <div className="flex gap-2 mb-4">
                                {fabric.colors.map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full border"
                                        style={{
                                            background: color,
                                            borderColor: 'var(--line-strong)',
                                        }}
                                    />
                                ))}
                            </div>

                            <p className="text-sm" style={{ color: 'var(--ink2)' }}>
                                {fabric.desc}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a href="/contact" className="btn btn-gold">
                        Request Free Swatch Kit
                    </a>
                </div>
            </div>
        </section>
    );
}