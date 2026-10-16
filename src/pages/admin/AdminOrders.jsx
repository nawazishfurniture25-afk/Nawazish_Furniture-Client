import { useEffect, useState } from 'react';
import { Search, Phone, MessageCircle, CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getOrders, updateOrderStatus } from '../../lib/api';
import toast from 'react-hot-toast';

const STATUSES = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');
    const [search, setSearch] = useState('');
    const [updatingId, setUpdatingId] = useState(null);

    const load = async () => {
        try {
            setLoading(true);
            const res = await getOrders();
            // Handles both { data: [...] } and [...]
            const list = Array.isArray(res.data) ? res.data : res.data.data || [];
            setOrders(list);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const formatPrice = (paise) =>
        '₹ ' + ((Number(paise) || 0) / 100).toLocaleString('en-IN');

    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
        });

    const handleStatusChange = async (order, newStatus) => {
        try {
            setUpdatingId(order.id);
            await updateOrderStatus(order.id, { status: newStatus });
            setOrders((prev) =>
                prev.map((o) => (o.id === order.id ? { ...o, status: newStatus } : o))
            );
            toast.success(`Order ${order.orderNumber} → ${newStatus}`);
        } catch (err) {
            console.error(err);
            toast.error('Status update failed');
        } finally {
            setUpdatingId(null);
        }
    };

    const filtered = orders.filter((o) => {
        if (filter !== 'ALL' && o.status !== filter) return false;
        if (!search) return true;
        const q = search.toLowerCase();
        return (
            o.orderNumber?.toLowerCase().includes(q) ||
            o.customerName?.toLowerCase().includes(q) ||
            o.phone?.includes(q)
        );
    });

    const statusColor = (s) => {
        if (s === 'DELIVERED') return 'var(--forest)';
        if (s === 'CANCELLED') return 'var(--terra)';
        if (s === 'SHIPPED') return 'var(--gold)';
        return 'var(--muted)';
    };

    return (
        <AdminLayout title="Orders">
            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
                <div className="relative flex-1 min-w-[200px]">
                    <Search
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2"
                        style={{ color: 'var(--muted)' }}
                    />
                    <input
                        type="text"
                        placeholder="Search order #, name, phone…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border text-sm"
                        style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                    />
                </div>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="px-3 py-2 border text-sm"
                    style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                >
                    <option value="ALL">All statuses</option>
                    {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div
                className="border"
                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
            >
                {loading ? (
                    <div className="p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
                        Loading…
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="p-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
                        No orders found
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead
                                className="text-[10px] tracking-[0.2em] uppercase"
                                style={{ color: 'var(--muted)', background: 'var(--bg2)' }}
                            >
                                <tr>
                                    <th className="text-left p-3">Order #</th>
                                    <th className="text-left p-3">Customer</th>
                                    <th className="text-left p-3">Contact</th>
                                    <th className="text-left p-3">Total</th>
                                    <th className="text-left p-3">Payment</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.map((o) => (
                                    <tr
                                        key={o.id}
                                        className="border-t"
                                        style={{ borderColor: 'var(--line)' }}
                                    >
                                        <td className="p-3 font-mono text-xs">{o.orderNumber}</td>
                                        <td className="p-3">{o.customerName}</td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={`tel:${o.phone}`}
                                                    className="hover:text-[var(--gold)]"
                                                    title="Call"
                                                >
                                                    <Phone size={14} />
                                                </a>
                                                <a
                                                    href={`https://wa.me/91${o.phone}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-[var(--gold)]"
                                                    title="WhatsApp"
                                                >
                                                    <MessageCircle size={14} />
                                                </a>
                                                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                                                    {o.phone}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="p-3 font-medium" style={{ color: 'var(--gold)' }}>
                                            {formatPrice(o.totalAmount)}
                                        </td>
                                        <td className="p-3">
                                            <span
                                                className="px-2 py-1 text-[10px] tracking-wider uppercase"
                                                style={{
                                                    background:
                                                        o.paymentStatus === 'PAID'
                                                            ? 'var(--forest)'
                                                            : 'var(--bg3)',
                                                    color:
                                                        o.paymentStatus === 'PAID' ? '#fff' : 'var(--ink2)',
                                                }}
                                            >
                                                {o.paymentStatus || 'PENDING'}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <select
                                                value={o.status}
                                                disabled={updatingId === o.id}
                                                onChange={(e) => handleStatusChange(o, e.target.value)}
                                                className="px-2 py-1 border text-xs"
                                                style={{
                                                    background: 'var(--card)',
                                                    borderColor: 'var(--line)',
                                                    color: statusColor(o.status),
                                                }}
                                            >
                                                {STATUSES.map((s) => (
                                                    <option key={s} value={s}>{s}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="p-3 text-xs" style={{ color: 'var(--muted)' }}>
                                            {formatDate(o.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}