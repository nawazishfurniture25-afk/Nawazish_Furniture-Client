import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Lock, Shield } from 'lucide-react';
import toast from 'react-hot-toast';
import useRazorpay from '../hooks/useRazorpay';
import { useCart } from '../context/CartContext';
import { createOrder, verifyPayment } from '../lib/api';
import SEO from '../components/common/SEO';

const MP_PIN_REGEX = /^4[5-8]\d{4}$/;

// MP pincode → city mapping (first 3 digits)
const PIN_CITY = {
    482: 'Jabalpur',
    462: 'Bhopal',
    452: 'Indore',
    474: 'Gwalior',
    456: 'Ujjain',
    470: 'Sagar',
    486: 'Rewa',
    485: 'Satna',
    457: 'Ratlam',
    455: 'Dewas',
    450: 'Khandwa',
    480: 'Chhindwara',
    450: 'Burhanpur',
    486: 'Singrauli',
    483: 'Katni',
    464: 'Vidisha',
    461: 'Hoshangabad',
    473: 'Shivpuri',
    458: 'Neemuch',
    458: 'Mandsaur',
    480: 'Seoni',
    470: 'Damoh',
    471: 'Chhatarpur',
    481: 'Balaghat',
    460: 'Betul',
};

export default function Checkout() {
    const navigate = useNavigate();
    const razorpayLoaded = useRazorpay();
    const { cart, subtotal, clearCart } = useCart();

    const [form, setForm] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        deliveryAddress: '',
        deliveryCity: '',
        deliveryPincode: '',
        customerGstin: '',
        notes: '',
    });

    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            navigate('/collections', { replace: true });
        }
    }, [cart.length, navigate]);

    // Auto-fill city when pincode is valid MP pincode
    useEffect(() => {
        const pin = form.deliveryPincode;
        if (pin.length === 6 && MP_PIN_REGEX.test(pin)) {
            const prefix = pin.slice(0, 3);
            const city = PIN_CITY[prefix];
            if (city && !form.deliveryCity) {
                setForm((prev) => ({ ...prev, deliveryCity: city }));
            }
        }
    }, [form.deliveryPincode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!form.customerName.trim() || form.customerName.trim().length < 2) {
            newErrors.customerName = 'Please enter your name (min 2 characters)';
        }

        if (!/^[6-9]\d{9}$/.test(form.customerPhone)) {
            newErrors.customerPhone = 'Enter 10-digit mobile starting with 6-9';
        }

        if (
            form.customerEmail &&
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)
        ) {
            newErrors.customerEmail = 'Enter a valid email';
        }

        if (!form.deliveryAddress.trim() || form.deliveryAddress.trim().length < 10) {
            newErrors.deliveryAddress = 'Please enter complete address (min 10 chars)';
        }

        if (!form.deliveryCity.trim()) {
            newErrors.deliveryCity = 'Please enter your city';
        }

        if (!form.deliveryPincode.trim()) {
            newErrors.deliveryPincode = 'Please enter your pincode';
        } else if (!/^\d{6}$/.test(form.deliveryPincode)) {
            newErrors.deliveryPincode = 'Pincode must be 6 digits';
        } else if (!MP_PIN_REGEX.test(form.deliveryPincode)) {
            newErrors.deliveryPincode =
                'Sorry, we currently deliver only within Madhya Pradesh. Please contact us for bulk orders outside MP.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            const firstErr = document.querySelector('[aria-invalid="true"]');
            if (firstErr) {
                firstErr.focus();
                firstErr.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
            return;
        }

        setSubmitting(true);

        try {
            // 1. Create order in backend
            const items = cart.map((item) => ({
                productId: item.id,
                quantity: item.qty,
            }));

            const orderRes = await createOrder({
                ...form,
                items,
            });

            const { order, razorpayOrder, razorpayKeyId } = orderRes.data.data;

            // 2. If Razorpay is configured, open checkout
            if (razorpayOrder && razorpayKeyId && window.Razorpay && razorpayLoaded) {
                const options = {
                    key: razorpayKeyId,
                    amount: razorpayOrder.amount,
                    currency: razorpayOrder.currency,
                    name: 'Nawazish Furniture',
                    description: `Order ${order.orderNumber}`,
                    image: '/favicon.svg',
                    order_id: razorpayOrder.id,
                    prefill: {
                        name: form.customerName,
                        contact: form.customerPhone,
                        email: form.customerEmail || '',
                    },
                    notes: {
                        orderId: order.id,
                        orderNumber: order.orderNumber,
                    },
                    theme: {
                        color: '#a37b34',
                    },
                    handler: async function (response) {
                        try {
                            await verifyPayment({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            });

                            toast.success('Payment successful!');
                            clearCart();
                            navigate('/order-success', {
                                state: {
                                    orderNumber: order.orderNumber,
                                    phone: form.customerPhone,   // ← YEH ADD KARO
                                },
                            });
                        } catch (err) {
                            console.error('Payment verification failed:', err);
                            toast.error('Payment recorded. We will confirm shortly.');
                            clearCart();
                            navigate('/order-success', {
                                state: {
                                    orderNumber: order.orderNumber,
                                    phone: form.customerPhone,   // ← YEH ADD KARO
                                },
                            });
                        }
                    },
                    modal: {
                        ondismiss: function () {
                            toast.success('Order saved! We will call you to complete payment.');
                            clearCart();
                            navigate('/order-success', {
                                state: {
                                    orderNumber: order.orderNumber,
                                    phone: form.customerPhone,   // ← YEH ADD KARO
                                },
                            });
                        },
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                // Razorpay not configured — fall back to WhatsApp order
                toast.success('Order received! We will contact you shortly.');

                const orderMsg = encodeURIComponent(
                    `*NEW ORDER — Nawazish Furniture*\n\n` +
                    `Order #: ${order.orderNumber}\n\n` +
                    `*Customer Details:*\n` +
                    `Name: ${form.customerName}\n` +
                    `Phone: +91 ${form.customerPhone}\n` +
                    (form.customerEmail ? `Email: ${form.customerEmail}\n` : '') +
                    `\n*Delivery Address:*\n` +
                    `${form.deliveryAddress}\n` +
                    `${form.deliveryCity} — ${form.deliveryPincode}\n` +
                    (form.customerGstin ? `GSTIN: ${form.customerGstin}\n` : '') +
                    `\n*Order Items:*\n` +
                    cart
                        .map(
                            (item) =>
                                `• ${item.name} × ${item.qty} = ₹${(
                                    (item.price * item.qty) /
                                    100
                                ).toLocaleString('en-IN')}`
                        )
                        .join('\n') +
                    `\n\n*Total: ₹${(order.totalAmount / 100).toLocaleString('en-IN')}*` +
                    (form.notes ? `\n\nNotes: ${form.notes}` : '')
                );

                window.open(`https://wa.me/919713624142?text=${orderMsg}`, '_blank');

                clearCart();
                navigate('/order-success', {
                    state: { orderNumber: order.orderNumber, phone: form.customerPhone },
                });
            }
        } catch (err) {
            console.error('Order failed:', err);
            toast.error(
                err.response?.data?.message ||
                'Failed to place order. Please try again.'
            );
        } finally {
            setSubmitting(false);
        }
    };

    const formatPrice = (paise) => '₹ ' + (paise / 100).toLocaleString('en-IN');

    // Calculate totals
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    if (cart.length === 0) return null;

    return (
        <>
            <SEO
                title="Checkout"
                description="Complete your furniture order. Secure payment, MP-only delivery."
                url="/checkout"
                noindex={true}
            />

            <section className="section">
                <div className="container-custom">
                    {/* Page head */}
                    <div className="mb-10">
                        <p className="eyebrow mb-5">Checkout</p>
                        <h1 className="font-serif text-4xl md:text-5xl leading-tight">
                            Complete your{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>
                                order
                            </em>
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-10">
                        {/* Left — Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="p-6 md:p-8 border"
                            style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                            noValidate
                        >
                            <h2 className="font-serif text-2xl mb-6">Delivery details</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="customerName"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        id="customerName"
                                        name="customerName"
                                        required
                                        value={form.customerName}
                                        onChange={handleChange}
                                        className="input"
                                        aria-invalid={!!errors.customerName}
                                        autoComplete="name"
                                    />
                                    {errors.customerName && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.customerName}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="customerPhone"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Mobile Number *
                                    </label>
                                    <input
                                        id="customerPhone"
                                        name="customerPhone"
                                        required
                                        maxLength={10}
                                        inputMode="numeric"
                                        value={form.customerPhone}
                                        onChange={handleChange}
                                        className="input"
                                        aria-invalid={!!errors.customerPhone}
                                        autoComplete="tel-national"
                                        placeholder="10-digit mobile"
                                    />
                                    {errors.customerPhone && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.customerPhone}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="customerEmail"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Email (optional)
                                    </label>
                                    <input
                                        id="customerEmail"
                                        name="customerEmail"
                                        type="email"
                                        value={form.customerEmail}
                                        onChange={handleChange}
                                        className="input"
                                        aria-invalid={!!errors.customerEmail}
                                        autoComplete="email"
                                    />
                                    {errors.customerEmail && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.customerEmail}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="deliveryAddress"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Full Address *
                                    </label>
                                    <textarea
                                        id="deliveryAddress"
                                        name="deliveryAddress"
                                        required
                                        rows={3}
                                        value={form.deliveryAddress}
                                        onChange={handleChange}
                                        className="input resize-vertical"
                                        aria-invalid={!!errors.deliveryAddress}
                                        autoComplete="street-address"
                                        placeholder="House no., street, landmark, area..."
                                    />
                                    {errors.deliveryAddress && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.deliveryAddress}
                                        </p>
                                    )}
                                </div>

                                {/* Pincode first (auto-fills city) */}
                                <div>
                                    <label
                                        htmlFor="deliveryPincode"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Pincode * (MP only)
                                    </label>
                                    <input
                                        id="deliveryPincode"
                                        name="deliveryPincode"
                                        required
                                        maxLength={6}
                                        inputMode="numeric"
                                        value={form.deliveryPincode}
                                        onChange={handleChange}
                                        className="input"
                                        aria-invalid={!!errors.deliveryPincode}
                                        autoComplete="postal-code"
                                        placeholder="e.g. 482004"
                                    />
                                    {errors.deliveryPincode && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.deliveryPincode}
                                        </p>
                                    )}
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="deliveryCity"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        City *
                                    </label>
                                    <input
                                        id="deliveryCity"
                                        name="deliveryCity"
                                        required
                                        value={form.deliveryCity}
                                        onChange={handleChange}
                                        className="input"
                                        aria-invalid={!!errors.deliveryCity}
                                        autoComplete="address-level2"
                                        placeholder="Auto-filled"
                                    />
                                    {errors.deliveryCity && (
                                        <p
                                            className="text-xs mt-1"
                                            style={{ color: 'var(--terra)' }}
                                            role="alert"
                                        >
                                            {errors.deliveryCity}
                                        </p>
                                    )}
                                </div>

                                {/* GSTIN */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="customerGstin"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        GSTIN (optional — for business buyers)
                                    </label>
                                    <input
                                        id="customerGstin"
                                        name="customerGstin"
                                        value={form.customerGstin}
                                        onChange={handleChange}
                                        className="input"
                                        maxLength={15}
                                        placeholder="22AAAAA0000A1Z5"
                                    />
                                </div>

                                {/* Notes */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="notes"
                                        className="block text-[10px] tracking-[0.2em] uppercase mb-2"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Order Notes (optional)
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows={2}
                                        value={form.notes}
                                        onChange={handleChange}
                                        className="input resize-vertical"
                                        placeholder="Delivery instructions, preferred time, etc."
                                    />
                                </div>
                            </div>

                            {/* Delivery notice */}
                            <div
                                className="mt-6 p-4 border-l-2 text-sm"
                                style={{
                                    borderColor: 'var(--gold)',
                                    background: 'rgba(163,123,52,0.08)',
                                    color: 'var(--ink2)',
                                }}
                            >
                                <strong style={{ color: 'var(--gold)' }}>DELIVERY NOTICE —</strong>{' '}
                                We currently deliver within Madhya Pradesh only. For orders
                                outside MP, please WhatsApp us.
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="btn btn-gold w-full mt-6 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                <Lock size={14} />
                                {submitting
                                    ? 'Processing…'
                                    : `Pay ${formatPrice(total)} Securely`}
                            </button>

                            <p
                                className="text-xs text-center mt-3"
                                style={{ color: 'var(--muted)' }}
                            >
                                <Link to="/collections" className="hover:underline">
                                    ← Back to shopping
                                </Link>
                            </p>
                        </form>

                        {/* Right — Order Summary */}
                        <aside
                            className="p-6 md:p-8 border h-fit lg:sticky lg:top-24"
                            style={{ background: 'var(--bg2)', borderColor: 'var(--line)' }}
                        >
                            <h2 className="font-serif text-2xl mb-6">Order summary</h2>

                            {/* Items */}
                            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-1">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 object-cover flex-shrink-0"
                                            style={{ background: 'var(--bg3)' }}
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm truncate">
                                                {item.name}
                                            </div>
                                            <div
                                                className="text-xs"
                                                style={{ color: 'var(--muted)' }}
                                            >
                                                {item.category} · Qty: {item.qty}
                                            </div>
                                            <div
                                                className="font-serif text-sm mt-1"
                                                style={{ color: 'var(--gold)' }}
                                            >
                                                {formatPrice(item.price * item.qty)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Totals */}
                            <div
                                className="space-y-2 pt-4 border-t"
                                style={{ borderColor: 'var(--line)' }}
                            >
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: 'var(--muted)' }}>GST (18%)</span>
                                    <span>{formatPrice(gst)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span style={{ color: 'var(--muted)' }}>Delivery (MP)</span>
                                    <span style={{ color: 'var(--forest)' }}>Free</span>
                                </div>
                                <div
                                    className="flex justify-between items-baseline font-serif text-2xl pt-3 mt-3 border-t"
                                    style={{ borderColor: 'var(--line)', color: 'var(--gold)' }}
                                >
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Trust badges */}
                            <div
                                className="mt-6 p-4 text-xs space-y-2"
                                style={{ background: 'var(--card)', color: 'var(--muted)' }}
                            >
                                <div className="flex items-start gap-2">
                                    <Shield size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>Secure payment via Razorpay</span>
                                </div>
                                <div className="flex items-start gap-2">
                                    <ShoppingBag size={14} className="flex-shrink-0 mt-0.5" />
                                    <span>50% advance, 50% on delivery</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </>
    );
}