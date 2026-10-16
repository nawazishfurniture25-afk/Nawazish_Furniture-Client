import { useState } from 'react';
import { createEnquiry } from '../lib/api';
import toast from 'react-hot-toast';
import LocationMap from '../components/contact/LocationMap';
import VisisAppointment from '../components/contact/VisitAppointment';
import SEO from '../components/common/SEO';

const FAQS = [
    {
        q: 'Do you deliver outside Madhya Pradesh?',
        a: 'Not yet. We currently deliver within Madhya Pradesh only. For bulk orders outside MP, please contact us.',
    },
    {
        q: 'How long does delivery take?',
        a: 'Most pieces are ready and delivered in 2–3 weeks from the advance payment.',
    },
    {
        q: 'How does payment work?',
        a: '50% advance to start production and 50% on delivery. We issue a Bill of Supply (no GST).',
    },
    {
        q: 'What warranty do you offer?',
        a: 'A 10-year warranty on the frame. Foam and fabric are covered for manufacturing defects.',
    },
];

// Contact page pe FAQ schema
const CONTACT_SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'LocalBusiness',
            '@id': 'https://nawazishfurniture.in/#localbusiness',
            name: 'Nawazish Furniture',
            image: 'https://nawazishfurniture.in/images/og-contact.jpg',
            telephone: '+91-9713624142',
            email: 'nawazishfurniture25@gmail.com',
            url: 'https://nawazishfurniture.in/contact',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '5WWQ+499, Raddi Chowki, Gazi Nagar, Adhartal',
                addressLocality: 'Jabalpur',
                addressRegion: 'Madhya Pradesh',
                postalCode: '482004',
                addressCountry: 'IN',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 23.1970036,
                longitude: 79.9384033,
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                    opens: '10:00',
                    closes: '20:00',
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Saturday',
                    opens: '10:00',
                    closes: '18:00',
                },
            ],
        },
        {
            '@type': 'FAQPage',
            mainEntity: FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.a,
                },
            })),
        },
    ],
};

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        city: '',
        pincode: '',
        message: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await createEnquiry({
                type: 'CONTACT',
                ...form,
            });
            toast.success('Message sent! We will contact you within 24 hours.');
            setForm({
                name: '',
                phone: '',
                email: '',
                city: '',
                pincode: '',
                message: '',
            });
        } catch (err) {
            const msg =
                err.response?.data?.message || 'Failed to send. Please try again.';
            toast.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <SEO
                title="Contact Us — Jabalpur Atelier"
                description="Visit our atelier in Jabalpur, MP. Open Mon–Sat, 10 AM – 8 PM. WhatsApp +91 9713624142. Free fabric swatches delivered across MP."
                keywords="contact sofa manufacturer Jabalpur, sofa shop Jabalpur, furniture atelier MP, sofa wholesale contact MP"
                url="/contact"
                type="website"
                image="https://nawazishfurniture.in/images/og-contact.jpg"
                jsonLd={CONTACT_SCHEMA}
            />

            {/* Head */}
            <section className="section pb-8">
                <div className="container-custom">
                    <p className="eyebrow mb-6">Contact</p>
                    <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
                        Let us{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            talk
                        </em>
                    </h1>
                    <p className="max-w-2xl" style={{ color: 'var(--ink2)' }}>
                        Wholesale enquiry, bespoke commission, fabric swatches — whatever
                        you need, start here.
                    </p>

                    <div
                        className="inline-block mt-6 px-4 py-2.5 border text-[10px] tracking-[0.16em] uppercase"
                        style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                    >
                        Delivery notice — We currently deliver within Madhya Pradesh only
                    </div>
                </div>
            </section>

            {/* Form + Info */}
            <section className="pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12">
                        {/* Left: Info */}
                        <div>
                            <div
                                className="p-6 border mb-3"
                                style={{
                                    borderColor: 'var(--line)',
                                    background: 'var(--card)',
                                }}
                            >
                                <div
                                    className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    Phone
                                </div>
                                <a
                                    href="tel:+919713624142"
                                    className="text-lg hover:underline"
                                    style={{ color: 'var(--ink)' }}
                                >
                                    +91 9713624142
                                </a>
                            </div>

                            <div
                                className="p-6 border mb-3"
                                style={{
                                    borderColor: 'var(--line)',
                                    background: 'var(--card)',
                                }}
                            >
                                <div
                                    className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    Email
                                </div>
                                <a
                                    href="mailto:nawazishfurniture@gmail.com"
                                    className="text-lg hover:underline break-all"
                                    style={{ color: 'var(--ink)' }}
                                >
                                    nawazishfurniture225@gmail.com
                                </a>
                            </div>

                            <div
                                className="p-6 border"
                                style={{
                                    borderColor: 'var(--line)',
                                    background: 'var(--card)',
                                }}
                            >
                                <div
                                    className="text-[10px] tracking-[0.3em] uppercase font-medium mb-2"
                                    style={{ color: 'var(--gold)' }}
                                >
                                    Atelier
                                </div>
                                <p className="text-lg">5WWQ+499, Raddi Chowki
                                    Gazi Nagar, Adhartal
                                    Jabalpur, MP — 482004</p>
                                <p
                                    className="text-sm mt-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Mon–Sat, 10 AM – 8 PM
                                </p>
                            </div>
                        </div>

                        {/* Right: Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8 border"
                            style={{
                                borderColor: 'var(--line)',
                                background: 'var(--card)',
                            }}
                        >
                            <h2 className="font-serif text-2xl mb-6">Send a message</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label htmlFor="name" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Name *
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Phone *
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="10-digit mobile"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="city" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        City (MP)
                                    </label>
                                    <input
                                        id="city"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="e.g. Bhopal"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="pincode" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Pincode
                                    </label>
                                    <input
                                        id="pincode"
                                        name="pincode"
                                        maxLength={6}
                                        value={form.pincode}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="6 digits"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="message" className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={handleChange}
                                        className="input resize-vertical"
                                        placeholder="Tell us what you're looking for..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-gold w-full disabled:opacity-50"
                            >
                                {submitting ? 'Sending…' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section" style={{ background: 'var(--bg2)' }}>
                <div className="container-custom">
                    <h2 className="font-serif text-3xl md:text-5xl mb-12">
                        Good to{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            know
                        </em>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        {FAQS.map((faq, i) => (
                            <details
                                key={i}
                                className="border-b py-4"
                                style={{ borderColor: 'var(--line)' }}
                            >
                                <summary className="font-serif text-lg cursor-pointer list-none flex justify-between items-center py-2">
                                    {faq.q}
                                    <span style={{ color: 'var(--gold)' }}>+</span>
                                </summary>
                                <p
                                    className="mt-3 text-sm leading-relaxed"
                                    style={{ color: 'var(--ink2)' }}
                                >
                                    {faq.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
            <LocationMap />
            <VisisAppointment />

        </>
    );
}