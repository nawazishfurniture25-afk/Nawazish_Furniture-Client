import { Link } from 'react-router-dom';
import Sofa3D from './Sofa3D';

export default function Hero() {
    return (
        <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
            {/* 3D Sofa Background */}
            <div className="absolute inset-0 z-[1]">
                <Sofa3D />
            </div>

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background: `linear-gradient(90deg, var(--bg) 8%, transparent 60%), linear-gradient(0deg, var(--bg), transparent 18%)`,
                }}
            />

            {/* Content */}
            <div className="relative z-[3] max-w-[1440px] mx-auto w-full px-5 md:px-8 py-16">
                <div className="max-w-[680px]">
                    <p className="eyebrow mb-6">
                        Handcrafted in Jabalpur · Since 1998
                    </p>

                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.98] tracking-tight mb-7">
                        The art of the perfect{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            sofa.
                        </em>
                    </h1>

                    <p
                        className="text-base md:text-lg max-w-[520px] mb-9 leading-relaxed"
                        style={{ color: 'var(--ink2)' }}
                    >
                        Furniture that whispers. Frames of seasoned Sheesham,
                        high-density foam and 200+ fabrics, made to your measurements
                        and delivered across Madhya Pradesh.
                    </p>

                    <div className="flex flex-wrap gap-3 mb-14">
                        <Link to="/collections" className="btn btn-gold">
                            The Collection
                        </Link>
                        <Link to="/custom" className="btn">
                            Commission
                        </Link>
                    </div>

                    {/* Stats */}
                    <div
                        className="grid grid-cols-3 gap-8 max-w-[640px] pt-8 border-t"
                        style={{ borderColor: 'var(--line)' }}
                    >
                        {[
                            { num: '25+', label: 'Years' },
                            { num: '3,400+', label: 'Pieces' },
                            { num: '10 Yr', label: 'Warranty' },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <div
                                    className="font-serif text-3xl md:text-4xl"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    {stat.num}
                                </div>
                                <div
                                    className="text-[10px] tracking-[0.24em] uppercase mt-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div
                className="absolute left-5 md:left-8 bottom-6 z-[3] text-[10px] tracking-[0.3em] uppercase hidden md:flex items-center gap-3"
                style={{ color: 'var(--muted)' }}
            >
                <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: 'var(--gold)' }}
                />
                Scroll to explore
            </div>
        </section>
    );
}