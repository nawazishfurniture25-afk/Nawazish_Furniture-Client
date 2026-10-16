import { useEffect, useState } from 'react';
import {
    Phone,
    MessageCircle,
    Mail,
    CheckCircle,
    XCircle,
    Clock,
    Search,
    Eye,
    Trash2,
} from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getEnquiries, updateEnquiry } from '../../lib/api';
import toast from 'react-hot-toast';

const STATUSES = [
    { value: 'NEW', label: 'New', color: 'var(--gold)' },
    { value: 'CONTACTED', label: 'Contacted', color: 'var(--forest)' },
    { value: 'CONVERTED', label: 'Converted', color: 'var(--forest)' },
    { value: 'CLOSED', label: 'Closed', color: 'var(--muted)' },
];

const TYPES = [
    { value: 'CONTACT', label: 'Contact Form' },
    { value: 'CUSTOM_ORDER', label: 'Custom Order' },
];

export default function AdminEnquiries() {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            const params = {};
            if (statusFilter) params.status = statusFilter;
            if (typeFilter) params.type = typeFilter;

            const res = await getEnquiries(params);
            setEnquiries(res.data.data || []);
        } catch (err) {
            toast.error('Failed to load enquiries');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, [statusFilter, typeFilter]);

    const handleStatusChange = async (id, status) => {
        try {
            await updateEnquiry(id, { status });
            toast.success(`Marked as ${status}`);
            load();
            if (selected?.id === id) {
                setSelected({ ...selected, status });
            }
        } catch (err) {
            toast.error('Update failed');
        }
    };

    const formatDate = (d) =>
        new Date(d).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });

    const filtered = enquiries.filter((e) => {
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            e.name?.toLowerCase().includes(q) ||
            e.phone?.includes(q) ||
            e.email?.toLowerCase().includes(q) ||
            e.city?.toLowerCase().includes(q)
        );
    });

    // ==================== REPLY HANDLERS ====================

    const handleWhatsApp = (enquiry) => {
        // Build WhatsApp message with enquiry context
        const message = encodeURIComponent(
            `Hello ${enquiry.name}!\n\n` +
            `Thank you for your enquiry with Nawazish Furniture.\n` +
            (enquiry.type === 'CUSTOM_ORDER'
                ? `We received your custom order request. Our team will help you design the perfect piece.\n\n`
                : `We received your message and will get back to you soon.\n\n`) +
            `How can we help you today?\n\n` +
            `— Nawazish Furniture`
        );

        window.open(
            `https://wa.me/91${enquiry.phone}?text=${message}`,
            '_blank'
        );

        // Auto-mark as contacted
        if (enquiry.status === 'NEW') {
            handleStatusChange(enquiry.id, 'CONTACTED');
        }
    };

    const handleCall = (enquiry) => {
        window.open(`tel:+91${enquiry.phone}`, '_self');

        if (enquiry.status === 'NEW') {
            handleStatusChange(enquiry.id, 'CONTACTED');
        }
    };

    const handleEmail = (enquiry) => {
        if (!enquiry.email) {
            toast.error('No email provided');
            return;
        }

        const subject = encodeURIComponent(
            `Re: Your enquiry with Nawazish Furniture`
        );

        const body = encodeURIComponent(
            `Hello ${enquiry.name},\n\n` +
            `Thank you for your enquiry with Nawazish Furniture. We received your message:\n\n` +
            `"${enquiry.message || ''}"\n\n` +
            `We will help you with your requirement. Please let us know a convenient time to call.\n\n` +
            `Best regards,\n` +
            `Nawazish Furniture\n` +
            `+91 96853 25881`
        );

        window.open(
            `mailto:${enquiry.email}?subject=${subject}&body=${body}`,
            '_self'
        );

        if (enquiry.status === 'NEW') {
            handleStatusChange(enquiry.id, 'CONTACTED');
        }
    };

    const getStatusConfig = (status) => {
        return (
            STATUSES.find((s) => s.value === status) || {
                label: status,
                color: 'var(--muted)',
            }
        );
    };

    return (
        <AdminLayout title="Enquiries">
            {/* Header */}
            <div className="mb-6">
                <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    {enquiries.length} total ·{' '}
                    {enquiries.filter((e) => e.status === 'NEW').length} new
                </p>

                {/* Search + Filters */}
                <div className="flex flex-wrap gap-3 mb-4">
                    <div className="relative flex-1 min-w-[200px]">
                        <Search
                            size={14}
                            className="absolute left-3 top-1/2 -translate-y-1/2"
                            style={{ color: 'var(--muted)' }}
                        />
                        <input
                            type="text"
                            placeholder="Search by name, phone, email…"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input !min-h-[44px] pl-9"
                        />
                    </div>
                </div>

                {/* Status filter chips */}
                <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-2">
                    <span
                        className="text-[10px] tracking-[0.2em] uppercase mr-1"
                        style={{ color: 'var(--muted)' }}
                    >
                        Status:
                    </span>
                    <button
                        onClick={() => setStatusFilter('')}
                        className="px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                        style={{
                            background: statusFilter === '' ? 'var(--gold)' : 'var(--bg2)',
                            color: statusFilter === '' ? '#fff' : 'var(--ink2)',
                        }}
                    >
                        All
                    </button>
                    {STATUSES.map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setStatusFilter(s.value)}
                            className="px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                            style={{
                                background:
                                    statusFilter === s.value ? 'var(--gold)' : 'var(--bg2)',
                                color: statusFilter === s.value ? '#fff' : 'var(--ink2)',
                            }}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>

                {/* Type filter chips */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    <span
                        className="text-[10px] tracking-[0.2em] uppercase mr-1"
                        style={{ color: 'var(--muted)' }}
                    >
                        Type:
                    </span>
                    <button
                        onClick={() => setTypeFilter('')}
                        className="px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                        style={{
                            background: typeFilter === '' ? 'var(--gold)' : 'var(--bg2)',
                            color: typeFilter === '' ? '#fff' : 'var(--ink2)',
                        }}
                    >
                        All
                    </button>
                    {TYPES.map((t) => (
                        <button
                            key={t.value}
                            onClick={() => setTypeFilter(t.value)}
                            className="px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap"
                            style={{
                                background:
                                    typeFilter === t.value ? 'var(--gold)' : 'var(--bg2)',
                                color: typeFilter === t.value ? '#fff' : 'var(--ink2)',
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Enquiries List */}
            {loading ? (
                <div className="text-center py-12" style={{ color: 'var(--muted)' }}>
                    Loading…
                </div>
            ) : filtered.length === 0 ? (
                <div
                    className="text-center py-16 border"
                    style={{
                        background: 'var(--card)',
                        borderColor: 'var(--line)',
                        color: 'var(--muted)',
                    }}
                >
                    {search || statusFilter || typeFilter
                        ? 'No matching enquiries'
                        : 'No enquiries yet'}
                </div>
            ) : (
                <div className="space-y-3">
                    {filtered.map((enquiry) => {
                        const statusCfg = getStatusConfig(enquiry.status);
                        return (
                            <div
                                key={enquiry.id}
                                className="border"
                                style={{
                                    background: 'var(--card)',
                                    borderColor: 'var(--line)',
                                    borderLeft: `3px solid ${statusCfg.color}`,
                                }}
                            >
                                {/* Header */}
                                <div
                                    className="flex flex-wrap justify-between items-start gap-3 p-4 border-b cursor-pointer hover:bg-[var(--bg2)]"
                                    style={{ borderColor: 'var(--line)' }}
                                    onClick={() =>
                                        setSelected(selected?.id === enquiry.id ? null : enquiry)
                                    }
                                >
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-medium">{enquiry.name}</span>
                                            <span
                                                className="px-2 py-0.5 text-[9px] tracking-wider uppercase font-medium"
                                                style={{
                                                    background: statusCfg.color + '22',
                                                    color: statusCfg.color,
                                                }}
                                            >
                                                {statusCfg.label}
                                            </span>
                                            <span
                                                className="px-2 py-0.5 text-[9px] tracking-wider uppercase"
                                                style={{
                                                    background: 'var(--bg3)',
                                                    color: 'var(--ink2)',
                                                }}
                                            >
                                                {enquiry.type === 'CUSTOM_ORDER'
                                                    ? 'Custom Order'
                                                    : 'Contact'}
                                            </span>
                                        </div>
                                        <div
                                            className="text-xs"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {enquiry.phone}
                                            {enquiry.city && ` · ${enquiry.city}`}
                                            {enquiry.email && ` · ${enquiry.email}`}
                                        </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <div
                                            className="text-xs"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {formatDate(enquiry.createdAt)}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {selected?.id === enquiry.id && (
                                    <div className="p-4 space-y-4">
                                        {/* Enquiry details */}
                                        {(enquiry.pieceType ||
                                            enquiry.dimensions ||
                                            enquiry.fabric ||
                                            enquiry.budget ||
                                            enquiry.message) && (
                                                <div
                                                    className="p-4 border"
                                                    style={{
                                                        background: 'var(--bg2)',
                                                        borderColor: 'var(--line)',
                                                    }}
                                                >
                                                    <div
                                                        className="text-[10px] tracking-[0.2em] uppercase mb-3"
                                                        style={{ color: 'var(--muted)' }}
                                                    >
                                                        Enquiry Details
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                                                        {enquiry.pieceType && (
                                                            <div>
                                                                <span style={{ color: 'var(--muted)' }}>
                                                                    Piece:&nbsp;
                                                                </span>
                                                                {enquiry.pieceType}
                                                            </div>
                                                        )}
                                                        {enquiry.dimensions && (
                                                            <div>
                                                                <span style={{ color: 'var(--muted)' }}>
                                                                    Dimensions:&nbsp;
                                                                </span>
                                                                {enquiry.dimensions}
                                                            </div>
                                                        )}
                                                        {enquiry.fabric && (
                                                            <div>
                                                                <span style={{ color: 'var(--muted)' }}>
                                                                    Fabric:&nbsp;
                                                                </span>
                                                                {enquiry.fabric}
                                                            </div>
                                                        )}
                                                        {enquiry.budget && (
                                                            <div>
                                                                <span style={{ color: 'var(--muted)' }}>
                                                                    Budget:&nbsp;
                                                                </span>
                                                                {enquiry.budget}
                                                            </div>
                                                        )}
                                                        {enquiry.pincode && (
                                                            <div>
                                                                <span style={{ color: 'var(--muted)' }}>
                                                                    Pincode:&nbsp;
                                                                </span>
                                                                {enquiry.pincode}
                                                            </div>
                                                        )}
                                                    </div>
                                                    {enquiry.message && (
                                                        <div className="mt-3 pt-3 border-t" style={{ borderColor: 'var(--line)' }}>
                                                            <div
                                                                className="text-[10px] tracking-[0.2em] uppercase mb-2"
                                                                style={{ color: 'var(--muted)' }}
                                                            >
                                                                Message
                                                            </div>
                                                            <p
                                                                className="text-sm leading-relaxed whitespace-pre-wrap"
                                                                style={{ color: 'var(--ink2)' }}
                                                            >
                                                                {enquiry.message}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                        {/* Reply Actions */}
                                        <div>
                                            <div
                                                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                                                style={{ color: 'var(--muted)' }}
                                            >
                                                Reply to Customer
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleWhatsApp(enquiry)}
                                                    className="btn btn-gold flex items-center gap-2"
                                                >
                                                    <MessageCircle size={16} />
                                                    WhatsApp
                                                </button>

                                                <button
                                                    onClick={() => handleCall(enquiry)}
                                                    className="btn flex items-center gap-2"
                                                >
                                                    <Phone size={16} />
                                                    Call
                                                </button>

                                                {enquiry.email && (
                                                    <button
                                                        onClick={() => handleEmail(enquiry)}
                                                        className="btn flex items-center gap-2"
                                                    >
                                                        <Mail size={16} />
                                                        Email
                                                    </button>
                                                )}
                                            </div>
                                        </div>

                                        {/* Status Update */}
                                        <div>
                                            <div
                                                className="text-[10px] tracking-[0.2em] uppercase mb-3"
                                                style={{ color: 'var(--muted)' }}
                                            >
                                                Update Status
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {STATUSES.map((s) => (
                                                    <button
                                                        key={s.value}
                                                        onClick={() =>
                                                            handleStatusChange(enquiry.id, s.value)
                                                        }
                                                        className="px-3 py-2 text-xs uppercase tracking-wider"
                                                        style={{
                                                            background:
                                                                enquiry.status === s.value
                                                                    ? s.color
                                                                    : 'var(--bg2)',
                                                            color:
                                                                enquiry.status === s.value
                                                                    ? '#fff'
                                                                    : 'var(--ink2)',
                                                        }}
                                                    >
                                                        {s.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </AdminLayout>
    );
}