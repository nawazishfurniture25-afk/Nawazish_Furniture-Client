import { Link, useLocation } from 'react-router-dom';
import {
    CheckCircle,
    Clock,
    XCircle,
    Phone,
    MessageCircle,
    Download,
    Share2,
} from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function OrderSuccess() {
    const location = useLocation();
    const { orderNumber, phone, failed, pending } = location.state || {};

    const config = failed
        ? {
            icon: XCircle,
            color: 'var(--terra)',
            title: 'Payment verification pending',
            message:
                'We received your order but could not verify the payment instantly. Our team will contact you to confirm.',
        }
        : pending
            ? {
                icon: Clock,
                color: 'var(--gold)',
                title: 'Order saved — payment pending',
                message:
                    'We received your order. Our team will call you to complete the payment.',
            }
            : {
                icon: CheckCircle,
                color: 'var(--forest)',
                title: 'Order confirmed!',
                message:
                    'Thank you for your order. We will start production shortly and keep you updated on WhatsApp.',
            };

    const Icon = config.icon;

    // Download invoice handler
    const handleDownloadInvoice = () => {
        if (!orderNumber || !phone) {
            toast.error('Order information missing');
            return;
        }

        const url = `${API_URL}/invoices/${orderNumber}?phone=${phone}`;
        window.open(url, '_blank');

        toast.success('Invoice downloading…');
    };

    // Preview invoice
    const handlePreviewInvoice = () => {
        if (!orderNumber || !phone) {
            toast.error('Order information missing');
            return;
        }

        const url = `${API_URL}/invoices/${orderNumber}/preview?phone=${phone}`;
        window.open(url, '_blank');
    };

    // Share invoice via WhatsApp
    const handleWhatsAppShare = () => {
        if (!orderNumber || !phone) {
            toast.error('Order information missing');
            return;
        }

        const invoiceUrl = `${API_URL}/invoices/${orderNumber}?phone=${phone}`;

        const message = encodeURIComponent(
            `Hello! I just placed an order.\n\n` +
            `Order #: ${orderNumber}\n\n` +
            `Download invoice: ${invoiceUrl}\n\n` +
            `— Nawazish Furniture`
        );

        window.open(`https://wa.me/919713624142?text=${message}`, '_blank');
    };

    return (
        <section className="section min-h-[70vh] flex items-center">
            <div className="container-custom text-center max-w-2xl mx-auto">
                <Icon
                    size={80}
                    className="mx-auto mb-6"
                    style={{ color: config.color }}
                />

                <p className="eyebrow mb-4">Thank you</p>
                <h1 className="font-serif text-4xl md:text-5xl mb-5">
                    {config.title}
                </h1>

                {orderNumber && (
                    <div
                        className="inline-block px-6 py-3 border mb-6 font-mono text-sm"
                        style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                    >
                        Order #{orderNumber}
                    </div>
                )}

                <p
                    className="text-base mb-8 max-w-lg mx-auto leading-relaxed"
                    style={{ color: 'var(--ink2)' }}
                >
                    {config.message}
                </p>

                {/* Invoice Actions */}
                {orderNumber && phone && !failed && (
                    <div className="mb-8">
                        <p
                            className="text-[10px] tracking-[0.24em] uppercase mb-3"
                            style={{ color: 'var(--muted)' }}
                        >
                            Your Invoice
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <button
                                onClick={handleDownloadInvoice}
                                className="btn btn-gold flex items-center gap-2"
                            >
                                <Download size={16} />
                                Download PDF
                            </button>
                            <button
                                onClick={handlePreviewInvoice}
                                className="btn flex items-center gap-2"
                            >
                                Preview Invoice
                            </button>
                            <button
                                onClick={handleWhatsAppShare}
                                className="btn flex items-center gap-2"
                            >
                                <Share2 size={16} />
                                Share
                            </button>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    <Link to="/" className="btn btn-gold">
                        Back to Home
                    </Link>
                    <Link to="/collections" className="btn">
                        Continue Shopping
                    </Link>
                </div>

                {/* Contact info */}
                <div
                    className="p-6 border inline-block text-left max-w-md w-full"
                    style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                >
                    <p
                        className="text-[10px] tracking-[0.24em] uppercase mb-3 text-center"
                        style={{ color: 'var(--muted)' }}
                    >
                        Need help with your order?
                    </p>
                    <div className="space-y-2 text-sm">
                        <a
                            href="https://wa.me/919713624142"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 hover:text-[var(--gold)]"
                            style={{ color: 'var(--ink2)' }}
                        >
                            <MessageCircle size={16} />
                            WhatsApp: +91 97136 24142
                        </a>
                        <a
                            href="tel:+919713624142"
                            className="flex items-center gap-2 hover:text-[var(--gold)]"
                            style={{ color: 'var(--ink2)' }}
                        >
                            <Phone size={16} />
                            Call: +91 97136 24142
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}