import { Link } from 'react-router-dom';
import TeamSection from '../components/about/TeamSection';
import SEO from '../components/common/SEO';

const VALUES = [
    {
        num: 'I',
        title: 'Honest materials',
        desc: 'Seasoned Sheesham, HR foam, fabrics we would use at home.',
    },
    {
        num: 'II',
        title: 'Made slowly',
        desc: 'One craftsman follows a piece from frame to final stitch.',
    },
    {
        num: 'III',
        title: 'Built to last',
        desc: 'A 10-year warranty on every frame we make.',
    },
];

const TIMELINE = [
    { year: '1998', text: 'A small workshop in Jabalpur makes its first sofas.' },
    { year: '2006', text: 'The team grows and wholesale begins for showrooms across MP.' },
    { year: '2014', text: 'Custom commissions and a fabric library of 200+ options.' },
    { year: 'Today', text: '3,400+ pieces delivered across Madhya Pradesh.' },
];

export default function About() {
    return (
        <>
            <SEO
                title="Heritage — 25+ Years of Craft"
                description="Three generations of craftsmen. Building handcrafted sofas in Jabalpur since 1998. Meet our team and see our atelier in MP."
                keywords="Nawazish Furniture history, Jabalpur furniture workshop, handcrafted sofa history, MP furniture manufacturer heritage"
                url="/about"
                type="website"
                image="https://nawazishfurniture.in/images/og-about.jpg"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'AboutPage',
                    name: 'About Nawazish Furniture',
                    url: 'https://nawazishfurniture.in/about',
                    mainEntity: {
                        '@type': 'Organization',
                        name: 'Nawazish Furniture',
                        foundingDate: '1998',
                        founder: 'Mohammed Nawazish',
                        numberOfEmployees: { '@type': 'QuantitativeValue', value: 14 },
                    },
                }}
            />
            <section className="section pb-8">
                <div className="container-custom">
                    <p className="eyebrow mb-6">Heritage</p>
                    <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5 max-w-3xl">
                        Twenty-five years of{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            quiet craft
                        </em>
                    </h1>
                    <p className="max-w-2xl" style={{ color: 'var(--ink2)' }}>
                        A sole-proprietor workshop in Jabalpur, building sofas by hand
                        since 1998.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="pb-20">
                <div className="container-custom">
                    <div
                        className="grid grid-cols-1 md:grid-cols-3 border-t"
                        style={{ borderColor: 'var(--line-strong)' }}
                    >
                        {VALUES.map((v, i) => (
                            <div
                                key={v.num}
                                className="p-8 md:p-10 transition-colors hover:bg-[var(--bg2)]"
                                style={{
                                    borderRight:
                                        i < VALUES.length - 1 ? '1px solid var(--line-strong)' : 'none',
                                    borderBottom: '1px solid var(--line-strong)',
                                }}
                            >
                                <div
                                    className="font-serif italic text-4xl mb-4"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    {v.num}
                                </div>
                                <h3 className="font-serif text-xl mb-2">{v.title}</h3>
                                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section" style={{ background: 'var(--bg2)' }}>
                <div className="container-custom">
                    <h2 className="font-serif text-3xl md:text-5xl mb-16 text-center">
                        A history of{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            quiet craft
                        </em>
                    </h2>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Center line */}
                        <div
                            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
                            style={{
                                background:
                                    'linear-gradient(to bottom, transparent, var(--line-strong), transparent)',
                            }}
                        />

                        {TIMELINE.map((item, i) => (
                            <div
                                key={i}
                                className={`relative flex ${i % 2 === 0 ? 'justify-start text-right' : 'justify-end'
                                    } pb-12`}
                            >
                                <div className="w-1/2 px-8">
                                    <div
                                        className="font-serif italic text-3xl md:text-4xl mb-2"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        {item.year}
                                    </div>
                                    <p className="text-sm" style={{ color: 'var(--ink2)' }}>
                                        {item.text}
                                    </p>
                                </div>

                                {/* Diamond dot */}
                                <div
                                    className="absolute left-1/2 top-2 w-3 h-3 -translate-x-1/2 rotate-45"
                                    style={{
                                        background: 'var(--gold)',
                                        boxShadow: '0 0 0 6px var(--bg2)',
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <TeamSection />

            {/* CTA */}
            <section
                className="text-center py-20 md:py-24"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(163,123,52,0.2), transparent 65%)',
                }}
            >
                <div className="container-custom">
                    <h2 className="font-serif text-3xl md:text-5xl mb-5">
                        Come see where it's{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            made
                        </em>
                    </h2>
                    <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--ink2)' }}>
                        Our atelier is open to customers and partners.
                    </p>
                    <Link to="/contact" className="btn btn-gold">
                        Plan Your Visit
                    </Link>
                </div>
            </section>
        </>
    );
}