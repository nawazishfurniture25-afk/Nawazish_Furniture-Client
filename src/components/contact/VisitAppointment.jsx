import { useState } from 'react';
import { Calendar, Clock, User, Phone, MessageSquare } from 'lucide-react';
import { createEnquiry } from '../../lib/api';
import toast from 'react-hot-toast';

const TIME_SLOTS = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
];

export default function VisitAppointment() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        date: '',
        time: '',
        purpose: 'general',
        notes: '',
    });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Save as enquiry with type CUSTOM_ORDER (or CONTACT)
            await createEnquiry({
                type: 'CONTACT',
                name: form.name,
                phone: form.phone,
                message: `VISIT APPOINTMENT REQUEST\n\nDate: ${form.date}\nTime: ${form.time}\nPurpose: ${form.purpose}\n\nNotes: ${form.notes || 'None'}`,
            });

            toast.success(
                'Appointment requested! We will confirm on WhatsApp within 2 hours.'
            );

            setForm({
                name: '',
                phone: '',
                date: '',
                time: '',
                purpose: 'general',
                notes: '',
            });
        } catch (err) {
            toast.error(
                err.response?.data?.message || 'Failed. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    // Today's date for min date
    const today = new Date().toISOString().split('T')[0];

    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left — Copy */}
                    <div>
                        <p className="eyebrow mb-5">Book a visit</p>
                        <h2 className="font-serif text-3xl md:text-5xl leading-tight mb-6">
                            Come see our sofas{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>
                                in person
                            </em>
                        </h2>
                        <p
                            className="text-base md:text-lg mb-6 leading-relaxed"
                            style={{ color: 'var(--ink2)' }}
                        >
                            Nothing compares to running your hand across velvet or testing
                            the firmness of our foam. Our atelier is open to customers
                            Mon–Sat.
                        </p>

                        <ul className="space-y-4 mb-8">
                            {[
                                {
                                    icon: User,
                                    title: 'Personal consultation',
                                    desc: 'Meet our senior craftsman for design advice.',
                                },
                                {
                                    icon: Clock,
                                    title: '45-minute visit',
                                    desc: 'Enough time to see, touch, and decide.',
                                },
                                {
                                    icon: MessageSquare,
                                    title: 'No pressure',
                                    desc: 'No obligation to buy. Just honest conversation.',
                                },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <li key={i} className="flex gap-4">
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                                            style={{
                                                background: 'rgba(163,123,52,0.15)',
                                                color: 'var(--gold)',
                                            }}
                                        >
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className="font-medium mb-1">{item.title}</h4>
                                            <p
                                                className="text-sm"
                                                style={{ color: 'var(--muted)' }}
                                            >
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Right — Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="p-6 md:p-8 border"
                        style={{
                            background: 'var(--card)',
                            borderColor: 'var(--line)',
                        }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Calendar size={22} style={{ color: 'var(--gold)' }} />
                            <h3 className="font-serif text-xl">Request appointment</h3>
                        </div>

                        <div className="space-y-5">
                            {/* Name */}
                            <div>
                                <label
                                    className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Your Name *
                                </label>
                                <input
                                    name="name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="Full name"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label
                                    className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    WhatsApp Number *
                                </label>
                                <input
                                    name="phone"
                                    type="tel"
                                    required
                                    maxLength={10}
                                    inputMode="numeric"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="input"
                                    placeholder="10-digit mobile"
                                />
                            </div>

                            {/* Date + Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Preferred Date *
                                    </label>
                                    <input
                                        name="date"
                                        type="date"
                                        required
                                        min={today}
                                        value={form.date}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Preferred Time *
                                    </label>
                                    <select
                                        name="time"
                                        required
                                        value={form.time}
                                        onChange={handleChange}
                                        className="input"
                                    >
                                        <option value="">Select…</option>
                                        {TIME_SLOTS.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Purpose */}
                            <div>
                                <label
                                    className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Purpose of Visit
                                </label>
                                <select
                                    name="purpose"
                                    value={form.purpose}
                                    onChange={handleChange}
                                    className="input"
                                >
                                    <option value="general">Just browsing</option>
                                    <option value="custom">Discuss a custom order</option>
                                    <option value="fabric">See fabric samples</option>
                                    <option value="wholesale">Wholesale enquiry</option>
                                    <option value="measurement">Home measurement</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label
                                    className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Any specific requirements?
                                </label>
                                <textarea
                                    name="notes"
                                    rows={3}
                                    value={form.notes}
                                    onChange={handleChange}
                                    className="input resize-vertical"
                                    placeholder="e.g. Interested in L-shape sofas for a 12x15 ft living room"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-gold w-full disabled:opacity-50"
                            >
                                {submitting ? 'Requesting…' : 'Request Appointment'}
                            </button>

                            <p
                                className="text-xs text-center"
                                style={{ color: 'var(--muted)' }}
                            >
                                We confirm within 2 hours on WhatsApp.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}