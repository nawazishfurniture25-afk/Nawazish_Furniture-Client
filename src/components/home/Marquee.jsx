const phrases = [
    'Handcrafted in Jabalpur',
    'Seasoned Sheesham frames',
    '200+ fabrics',
    '10-year frame warranty',
    'Delivered across Madhya Pradesh',
];

export default function Marquee() {
    // Duplicate phrases so infinite scroll works seamlessly
    const items = [...phrases, ...phrases];

    return (
        <div
            className="overflow-hidden border-y py-5 relative"
            style={{
                background: 'var(--bg2)',
                borderColor: 'var(--line)',
            }}
        >
            <div
                className="flex gap-14 animate-marquee whitespace-nowrap"
                style={{ width: 'max-content' }}
            >
                {items.map((phrase, i) => (
                    <span
                        key={i}
                        className="font-serif italic text-xl md:text-2xl flex items-center gap-14"
                        style={{
                            color: i % 2 === 0 ? 'var(--ink2)' : 'var(--gold)',
                        }}
                    >
                        {phrase}
                        {i < items.length - 1 && (
                            <span style={{ color: 'var(--gold)' }}>◆</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    );
}