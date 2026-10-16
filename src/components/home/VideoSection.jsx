import { Play } from 'lucide-react';
import { useState } from 'react';

export default function VideoSection() {
    const [playing, setPlaying] = useState(false);

    // Replace this with your actual YouTube video ID
    // To get: upload video to YouTube → copy video ID from URL
    // Example: https://youtube.com/watch?v=dQw4w9WgXcQ → ID is 'dQw4w9WgXcQ'
    const YOUTUBE_ID = 'dQw4w9WgXcQ';

    return (
        <section
            className="relative overflow-hidden"
            style={{ background: 'var(--bg2)' }}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                {/* Left — Video/Image */}
                <div className="relative aspect-video lg:aspect-auto">
                    {playing ? (
                        <iframe
                            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                            title="Workshop Tour — Nawazish Furniture"
                            className="absolute inset-0 w-full h-full"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    ) : (
                        <>
                            {/* Placeholder image — replace with your workshop image */}
                            <img
                                src="/images/IMG1.jpeg"
                                alt="Inside the Nawazish Furniture workshop"
                                className="absolute inset-0 w-full h-full object-cover"
                                loading="lazy"
                            />

                            {/* Dark overlay */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background:
                                        'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
                                }}
                            />

                            {/* Play button */}
                            <button
                                onClick={() => setPlaying(true)}
                                aria-label="Play workshop video"
                                className="absolute inset-0 flex items-center justify-center group"
                            >
                                <div
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                                    style={{ background: 'var(--gold)' }}
                                >
                                    <Play
                                        size={32}
                                        fill="#fff"
                                        style={{ color: '#fff', marginLeft: '4px' }}
                                    />
                                </div>
                            </button>

                            {/* Label */}
                            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 text-white">
                                <p className="text-[10px] tracking-[0.28em] uppercase mb-2 opacity-80">
                                    Watch · 2 min
                                </p>
                                <h3 className="font-serif text-2xl md:text-3xl">
                                    Inside our workshop
                                </h3>
                            </div>
                        </>
                    )}
                </div>

                {/* Right — Copy */}
                <div className="flex items-center p-8 md:p-12 lg:p-16">
                    <div>
                        <p className="eyebrow mb-5">Our atelier</p>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6">
                            Where wood becomes{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>
                                furniture
                            </em>
                        </h2>
                        <p
                            className="text-base md:text-lg mb-6 leading-relaxed"
                            style={{ color: 'var(--ink2)' }}
                        >
                            Our 4,000 sq. ft. workshop in Jabalpur houses seasoned timber,
                            foam-cutting stations, upholstery tables, and a dedicated
                            finishing area.
                        </p>
                        <p
                            className="text-base mb-8 leading-relaxed"
                            style={{ color: 'var(--ink2)' }}
                        >
                            Every sofa passes through fourteen pairs of hands before it is
                            ready. Visit us in person — we welcome customers and wholesale
                            partners Mon–Sat, 10 AM to 8 PM.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-6 border-t"
                            style={{ borderColor: 'var(--line)' }}>
                            <div>
                                <div
                                    className="font-serif text-2xl md:text-3xl"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    4,000
                                </div>
                                <div
                                    className="text-[10px] tracking-[0.24em] uppercase mt-1"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Sq. ft.
                                </div>
                            </div>
                            <div>
                                <div
                                    className="font-serif text-2xl md:text-3xl"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    14
                                </div>
                                <div
                                    className="text-[10px] tracking-[0.24em] uppercase mt-1"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Craftsmen
                                </div>
                            </div>
                            <div>
                                <div
                                    className="font-serif text-2xl md:text-3xl"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    25+
                                </div>
                                <div
                                    className="text-[10px] tracking-[0.24em] uppercase mt-1"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Years
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}