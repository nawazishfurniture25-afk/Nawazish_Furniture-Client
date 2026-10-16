const ROOMS = [
    {
        img: '/images/IMG1.jpeg',
        title: 'The Living Room',
        subtitle: '6-Seater Sectional',
        tag: 'Modern',
    },
    {
        img: '/images/IMG2.jpeg',
        title: 'The Reading Nook',
        subtitle: 'Single Recliner',
        tag: 'Cosy',
    },
    {
        img: '/images/IMG3.jpeg',
        title: 'The Family Room',
        subtitle: '3-Seater + Diwan',
        tag: 'Traditional',
    },
    {
        img: '/images/IMG4.jpeg',
        title: 'The Balcony',
        subtitle: 'Compact 2-Seater',
        tag: 'Compact',
    },
];

export default function Lookbook() {
    return (
        <section className="section" style={{ background: 'var(--bg2)' }}>
            <div className="container-custom">
                <div className="mb-14 max-w-3xl">
                    <p className="eyebrow mb-5">Lookbook</p>
                    <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                        See it in{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            your space
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        Real homes across Madhya Pradesh. Every piece is custom-made — but
                        here is how our pieces usually come together.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {ROOMS.map((room, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden aspect-[3/4] cursor-pointer"
                            style={{ background: 'var(--bg3)' }}
                        >
                            <img
                                src={room.img}
                                alt={room.title}
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(to top, rgba(10,9,8,0.85), transparent 55%)',
                                }}
                            />
                            <div className="absolute top-4 right-4">
                                <span
                                    className="px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase font-medium"
                                    style={{ background: 'var(--gold)', color: '#fff' }}
                                >
                                    {room.tag}
                                </span>
                            </div>
                            <div className="absolute bottom-5 left-5 right-5 text-white">
                                <p className="text-[10px] tracking-[0.28em] uppercase mb-1 opacity-80">
                                    {room.subtitle}
                                </p>
                                <h3 className="font-serif text-xl">{room.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}