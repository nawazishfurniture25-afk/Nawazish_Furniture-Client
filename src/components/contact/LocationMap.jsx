import { MapPin, Navigation, Phone, Clock } from 'lucide-react';

export default function LocationMap() {
    // Tumhara real Google Maps embed URL
    const MAP_EMBED_URL =
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.265208649737!2d79.93840329999998!3d23.197003600000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae368f4bc461%3A0xe0530a232309fbe6!2s5WWQ%2B499%20Raddi%20Chowki%2C%20Gazi%20Nagar%2C%20Adhartal%2C%20Jabalpur%2C%20Madhya%20Pradesh%20482004!5e0!3m2!1sen!2sin!4v1792017039620!5m2!1sen!2sin';

    // "Get Directions" link — same address
    const MAP_LINK =
        'https://www.google.com/maps/search/?api=1&query=5WWQ%2B499+Raddi+Chowki+Gazi+Nagar+Adhartal+Jabalpur+Madhya+Pradesh+482004';

    return (
        <section className="section" style={{ background: 'var(--bg2)' }}>
            <div className="container-custom">
                {/* Header */}
                <div className="mb-12 max-w-3xl">
                    <p className="eyebrow mb-5">Visit us</p>
                    <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-5">
                        Find our{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            atelier
                        </em>
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--ink2)' }}>
                        Our workshop is open to customers and wholesale partners.
                        Call ahead so we can arrange time with our senior craftsman.
                    </p>
                </div>

                {/* Map + Info Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
                    {/* Map */}
                    <div
                        className="relative aspect-video lg:aspect-auto lg:min-h-[500px] border overflow-hidden"
                        style={{ borderColor: 'var(--line)' }}
                    >
                        <iframe
                            title="Nawazish Furniture Workshop Location"
                            src={MAP_EMBED_URL}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="absolute inset-0"
                        />
                    </div>

                    {/* Info Cards */}
                    <div className="space-y-4">
                        {/* Address */}
                        <div
                            className="p-6 border"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            <div className="flex gap-3">
                                <MapPin
                                    size={20}
                                    style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }}
                                />
                                <div>
                                    <h3
                                        className="text-[10px] tracking-[0.24em] uppercase font-medium mb-2"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        Address
                                    </h3>
                                    <p style={{ color: 'var(--ink2)', lineHeight: 1.7 }}>
                                        Nawazish Furniture Workshop
                                        <br />
                                        5WWQ+499, Raddi Chowki
                                        <br />
                                        Gazi Nagar, Adhartal
                                        <br />
                                        5WWQ+499, Raddi Chowki
                                        Gazi Nagar, Adhartal
                                        Jabalpur, MP — 482004
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div
                            className="p-6 border"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            <div className="flex gap-3">
                                <Phone
                                    size={20}
                                    style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }}
                                />
                                <div>
                                    <h3
                                        className="text-[10px] tracking-[0.24em] uppercase font-medium mb-2"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        Call before visiting
                                    </h3>
                                    <a
                                        href="tel:+919713624142"
                                        className="hover:underline"
                                        style={{ color: 'var(--ink2)' }}
                                    >
                                        +91 9713624142
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div
                            className="p-6 border"
                            style={{
                                background: 'var(--card)',
                                borderColor: 'var(--line)',
                            }}
                        >
                            <div className="flex gap-3">
                                <Clock
                                    size={20}
                                    style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '4px' }}
                                />
                                <div className="flex-1">
                                    <h3
                                        className="text-[10px] tracking-[0.24em] uppercase font-medium mb-3"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        Visiting Hours
                                    </h3>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex justify-between gap-4">
                                            <span style={{ color: 'var(--muted)' }}>Mon – Fri</span>
                                            <span>10:00 AM – 8:00 PM</span>
                                        </li>
                                        <li className="flex justify-between gap-4">
                                            <span style={{ color: 'var(--muted)' }}>Saturday</span>
                                            <span>10:00 AM – 6:00 PM</span>
                                        </li>
                                        <li className="flex justify-between gap-4">
                                            <span style={{ color: 'var(--muted)' }}>Sunday</span>
                                            <span style={{ color: 'var(--gold)' }}>
                                                By appointment
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Directions CTA */}
                        <a
                            href={MAP_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-gold w-full flex items-center justify-center gap-2"
                        >
                            <Navigation size={16} />
                            Get Directions on Google Maps
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}