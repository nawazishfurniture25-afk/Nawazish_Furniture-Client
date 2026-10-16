import { useState } from 'react';
import { createEnquiry } from '../lib/api';
import toast from 'react-hot-toast';
import FabricShowcase from '../components/custom/FabricShowcase';
import CustomTimeline from '../components/custom/CutomTimeline';
import SEO from '../components/common/SEO';

const PIECES = [
    '3-Seater',
    'L-Shape',
    'Recliner',
    'Diwan',
    'Sofa Cum Bed',
    'Wholesale / bulk',
    'Other',
];

export default function Custom() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        city: '',
        pincode: '',
        pieceType: '',
        dimensions: '',
        fabric: '',
        budget: '',
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
                type: 'CUSTOM_ORDER',
                ...form,
            });
            toast.success('Commission received! We will contact you within 24 hours.');
            setForm({
                name: '',
                phone: '',
                city: '',
                pincode: '',
                pieceType: '',
                dimensions: '',
                fabric: '',
                budget: '',
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
                title="Custom Sofa Commissions"
                description="Commission a bespoke sofa. Your exact dimensions, your fabric choice, your leg finish. Handcrafted in Jabalpur, delivered across MP in 2–3 weeks."
                keywords="custom sofa Jabalpur, bespoke furniture MP, made to order sofa, custom dimensions sofa, personalized sofa design"
                url="/custom"
                type="website"
                image="https://nawazishfurniture.in/images/og-custom.jpg"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'Service',
                    name: 'Custom Sofa Commissioning',
                    provider: {
                        '@type': 'FurnitureStore',
                        name: 'Nawazish Furniture',
                        url: 'https://nawazishfurniture.in',
                    },
                    areaServed: 'Madhya Pradesh',
                    description:
                        'Bespoke sofas built to your exact dimensions and fabric preference.',
                }}
            />

            <section className="section pb-8">
                <div className="container-custom">
                    <p className="eyebrow mb-6">The Atelier</p>
                    <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5">
                        Commission a piece{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            made for you
                        </em>
                    </h1>
                    <p className="max-w-2xl mb-6" style={{ color: 'var(--ink2)' }}>
                        Tell us the room, the size and the mood. We reply on WhatsApp
                        within a day.
                    </p>
                    <div
                        className="inline-block px-4 py-2.5 border text-[10px] tracking-[0.16em] uppercase"
                        style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                    >
                        MP only — Custom commissions currently limited to deliveries
                        within Madhya Pradesh
                    </div>
                </div>
            </section>

            <section className="pb-20">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12">
                        {/* Aside */}
                        <aside>
                            <h2 className="font-serif text-3xl md:text-4xl mb-6">
                                Why{' '}
                                <em className="italic" style={{ color: 'var(--gold)' }}>
                                    bespoke
                                </em>
                            </h2>
                            <ul className="space-y-3">
                                {[
                                    'Cut to your exact dimensions',
                                    '200+ fabrics, swatches sent to you',
                                    '10-year warranty on the frame',
                                    '50% advance, 50% on delivery',
                                    'Delivery in 2–3 weeks',
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="pb-3 border-b text-sm flex gap-3"
                                        style={{ borderColor: 'var(--line)', color: 'var(--ink2)' }}
                                    >
                                        <span style={{ color: 'var(--gold)' }}>◆</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </aside>

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8 border"
                            style={{
                                borderColor: 'var(--line)',
                                background: 'var(--card)',
                            }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Name *
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Phone *
                                    </label>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        maxLength={10}
                                        value={form.phone}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        City (in MP) *
                                    </label>
                                    <input
                                        name="city"
                                        required
                                        value={form.city}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Pincode *
                                    </label>
                                    <input
                                        name="pincode"
                                        required
                                        maxLength={6}
                                        value={form.pincode}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="6 digits"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Type of piece *
                                    </label>
                                    <select
                                        name="pieceType"
                                        required
                                        value={form.pieceType}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="">Select…</option>
                                        {PIECES.map((p) => (
                                            <option key={p} value={p}>
                                                {p}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Dimensions (inches)
                                    </label>
                                    <input
                                        name="dimensions"
                                        value={form.dimensions}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="e.g. 84 x 36"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Fabric preference
                                    </label>
                                    <input
                                        name="fabric"
                                        value={form.fabric}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Velvet / Linen"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Budget range
                                    </label>
                                    <input
                                        name="budget"
                                        value={form.budget}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="₹25,000 – ₹40,000"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--muted)' }}>
                                        Notes
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={3}
                                        maxLength={1000}
                                        value={form.message}
                                        onChange={handleChange}
                                        className="input resize-vertical"
                                        placeholder="Special requirements, reference images, sketches..."
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-gold w-full disabled:opacity-50"
                            >
                                {submitting ? 'Sending…' : 'Submit Commission'}
                            </button>
                        </form>
                        <FabricShowcase />
                        <CustomTimeline />
                    </div>
                </div>
            </section>
        </>
    );
}