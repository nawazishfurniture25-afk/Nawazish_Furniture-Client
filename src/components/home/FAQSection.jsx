import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

// ==================== FAQ CONTENT ====================
// Yeh content tumhari business ke hisaab se customize kar sakte ho
const FAQS = [
    {
        q: 'Do you deliver outside Madhya Pradesh?',
        a: 'Not yet. We currently deliver only within Madhya Pradesh. This is because we operate as an unregistered MSME and GST registration is mandatory for inter-state supply. For bulk orders outside MP (10+ pieces), please contact us directly — we can arrange logistics for wholesale clients.',
        category: 'Delivery',
    },
    {
        q: 'How long does delivery take?',
        a: 'Most pieces are ready and delivered in 2–3 weeks from the advance payment. Custom pieces may take up to 4 weeks depending on complexity and fabric availability. For urgent orders, WhatsApp us — we will do our best to accommodate.',
        category: 'Delivery',
    },
    {
        q: 'How does payment work?',
        a: 'Standard terms: 50% advance to start production and 50% on delivery. We accept UPI, bank transfer, and cash. As we are not GST registered yet, we issue a "Bill of Supply" instead of a tax invoice — this is completely legal for unregistered businesses under the ₹40 lakh turnover threshold.',
        category: 'Payment',
    },
    {
        q: 'What warranty do you offer?',
        a: 'We provide a 10-year warranty on every wooden frame we build. Foam and fabric are covered for manufacturing defects for 2 years. Normal wear and tear, misuse, and damage from moisture or pets are not covered. Warranty is honoured with original Bill of Supply.',
        category: 'Warranty',
    },
    {
        q: 'Can I choose my own fabric and size?',
        a: 'Absolutely. We offer 200+ fabrics including velvet, linen, bouclé, leatherette, and cotton blends. You can also give us your exact dimensions to the inch. For an extra consultation fee (₹500, refundable on order), our team will visit your home within Jabalpur to measure the space.',
        category: 'Customisation',
    },
    {
        q: 'How do I place an order?',
        a: 'Three easy ways: (1) Add pieces to your cart here and check out with your delivery details — we will call you within 24 hours. (2) WhatsApp us on +91 9713624142 with your requirements. (3) Visit our Jabalpur atelier in person (Mon–Sat, 10 AM to 8 PM).',
        category: 'Ordering',
    },
    {
        q: 'Can I see the sofa in person before ordering?',
        a: 'Yes. Our atelier in Jabalpur is open to customers Mon–Sat, 10 AM to 8 PM. You can touch the fabrics, sit on sample sofas, and see our work in progress. Call ahead at +91 9713624142 so we can arrange time with our senior craftsman.',
        category: 'Showroom',
    },
    {
        q: 'Do you charge for delivery?',
        a: 'Delivery is free across Madhya Pradesh for all orders above ₹25,000. For smaller items or orders below ₹25,000, a nominal delivery charge (₹500–₹1,500 depending on location) applies. Assembly at your home is always free.',
        category: 'Delivery',
    },
    {
        q: 'What if the sofa does not fit my space?',
        a: 'That is why we recommend our home visit service for custom orders. We measure twice, cut once. If there is a measurement error from our side, we remake the piece at no cost. If you decide you want a different size after production starts, a 20% remake charge may apply.',
        category: 'Customisation',
    },
    {
        q: 'Do you offer EMI or financing?',
        a: 'Currently no. We accept 50% advance and 50% on delivery. Once we start accepting online payments through Razorpay (coming soon), no-cost EMI options will be available for orders above ₹20,000.',
        category: 'Payment',
    },
];

// ==================== FAQ SCHEMA (SEO) ====================
const FAQ_SCHEMA = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
        },
    })),
};

// ==================== COMPONENT ====================
export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (index) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <>
            {/* JSON-LD Schema for Google Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
            />

            <section className="section" style={{ background: 'var(--bg2)' }}>
                <div className="container-custom">
                    {/* Header */}
                    <div className="text-center mb-14 max-w-3xl mx-auto">
                        <p className="eyebrow justify-center mb-5 inline-flex">
                            Common questions
                        </p>
                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-5">
                            Everything you{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>
                                need to know
                            </em>
                        </h2>
                        <p
                            className="text-base md:text-lg"
                            style={{ color: 'var(--ink2)' }}
                        >
                            Have a question we haven't answered? Call us on{' '}
                            <a
                                href="tel:+919713624142"
                                className="underline"
                                style={{ color: 'var(--gold)' }}
                            >
                                +91 9713624142
                            </a>{' '}
                            or WhatsApp us anytime.
                        </p>
                    </div>

                    {/* FAQ Grid — 2 columns desktop, 1 mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
                        {FAQS.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <div
                                    key={index}
                                    className="border-b py-4"
                                    style={{ borderColor: 'var(--line)' }}
                                >
                                    <button
                                        onClick={() => toggle(index)}
                                        aria-expanded={isOpen}
                                        aria-controls={`faq-answer-${index}`}
                                        className="w-full flex items-start justify-between gap-4 text-left group"
                                    >
                                        <span
                                            className="font-serif text-lg md:text-xl leading-snug transition-colors group-hover:text-[var(--gold)]"
                                            style={{ color: isOpen ? 'var(--gold)' : 'var(--ink)' }}
                                        >
                                            {faq.q}
                                        </span>

                                        <span
                                            className="flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300"
                                            style={{
                                                borderColor: isOpen
                                                    ? 'var(--gold)'
                                                    : 'var(--line-strong)',
                                                background: isOpen ? 'var(--gold)' : 'transparent',
                                                color: isOpen ? '#fff' : 'var(--ink2)',
                                                transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                                            }}
                                        >
                                            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                        </span>
                                    </button>

                                    <div
                                        id={`faq-answer-${index}`}
                                        className="overflow-hidden transition-all duration-500 ease-out"
                                        style={{
                                            maxHeight: isOpen ? '500px' : '0',
                                            opacity: isOpen ? 1 : 0,
                                            marginTop: isOpen ? '16px' : '0',
                                        }}
                                    >
                                        <p
                                            className="text-sm md:text-base leading-relaxed pr-12"
                                            style={{ color: 'var(--ink2)' }}
                                        >
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* CTA below FAQ */}
                    <div className="text-center mt-16">
                        <p
                            className="text-sm mb-4"
                            style={{ color: 'var(--muted)' }}
                        >
                            Still have questions?
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <a
                                href="https://wa.me/919713624142"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-gold"
                            >
                                WhatsApp Us
                            </a>
                            <a href="/contact" className="btn">
                                Send an Enquiry
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}