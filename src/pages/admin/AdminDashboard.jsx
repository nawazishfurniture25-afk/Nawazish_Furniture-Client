import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, MessageSquare, TrendingUp } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import { getProducts, getOrders, getEnquiries } from '../../lib/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        enquiries: 0,
        revenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [recentEnquiries, setRecentEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [productsRes, ordersRes, enquiriesRes] = await Promise.all([
                    getProducts(),
                    getOrders(),
                    getEnquiries(),
                ]);

                const orders = ordersRes.data.data || [];
                const paidOrders = orders.filter((o) => o.paymentStatus === 'PAID');
                const revenue = paidOrders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

                setStats({
                    products: productsRes.data.count || 0,
                    orders: orders.length,
                    enquiries: enquiriesRes.data.count || 0,
                    revenue,
                });

                setRecentOrders(orders.slice(0, 5));
                setRecentEnquiries((enquiriesRes.data.data || []).slice(0, 5));
            } catch (err) {
                console.error('Dashboard load failed:', err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const formatPrice = (paise) => '₹ ' + (paise / 100).toLocaleString('en-IN');
    const formatDate = (d) =>
        new Date(d).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    const StatCard = ({ icon: Icon, label, value, color }) => (
        <div
            className="p-6 border"
            style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
        >
            <div className="flex items-center justify-between mb-3">
                <span
                    className="text-[10px] tracking-[0.24em] uppercase"
                    style={{ color: 'var(--muted)' }}
                >
                    {label}
                </span>
                <Icon size={18} style={{ color }} />
            </div>
            <div className="font-serif text-3xl" style={{ color }}>
                {loading ? '—' : value}
            </div>
        </div>
    );

    return (
        <AdminLayout title="Dashboard">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={Package}
                    label="Products"
                    value={stats.products}
                    color="var(--gold)"
                />
                <StatCard
                    icon={ShoppingCart}
                    label="Orders"
                    value={stats.orders}
                    color="var(--forest)"
                />
                <StatCard
                    icon={MessageSquare}
                    label="Enquiries"
                    value={stats.enquiries}
                    color="var(--terra)"
                />
                <StatCard
                    icon={TrendingUp}
                    label="Revenue"
                    value={formatPrice(stats.revenue)}
                    color="var(--gold)"
                />
            </div>

            <div
                className="border mb-6"
                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
            >
                <div
                    className="flex items-center justify-between p-5 border-b"
                    style={{ borderColor: 'var(--line)' }}
                >
                    <h2 className="font-serif text-lg">Recent Orders</h2>
                    <Link
                        to="/admin/orders"
                        className="text-[10px] tracking-[0.24em] uppercase"
                        style={{ color: 'var(--gold)' }}
                    >
                        View all →
                    </Link>
                </div>
                {recentOrders.length === 0 ? (
                    <div
                        className="p-8 text-center text-sm"
                        style={{ color: 'var(--muted)' }}
                    >
                        No orders yet
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
                                    <th className="text-left p-3">Total</th>
                                    <th className="text-left p-3">Status</th>
                                    <th className="text-left p-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((o) => (
                                    <tr
                                        key={o.id}
                                        className="border-t"
                                        style={{ borderColor: 'var(--line)' }}
                                    >
                                        <td className="p-3 font-mono text-xs">{o.orderNumber}</td>
                                        <td className="p-3">{o.customerName}</td>
                                        <td
                                            className="p-3 font-medium"
                                            style={{ color: 'var(--gold)' }}
                                        >
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
                                                {o.status}
                                            </span>
                                        </td>
                                        <td
                                            className="p-3 text-xs"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {formatDate(o.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div
                className="border"
                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
            >
                <div className="p-5 border-b" style={{ borderColor: 'var(--line)' }}>
                    <h2 className="font-serif text-lg">Recent Enquiries</h2>
                </div>
                {recentEnquiries.length === 0 ? (
                    <div
                        className="p-8 text-center text-sm"
                        style={{ color: 'var(--muted)' }}
                    >
                        No enquiries yet
                    </div>
                ) : (
                    <div className="divide-y" style={{ borderColor: 'var(--line)' }}>
                        {recentEnquiries.map((e) => (
                            <div key={e.id} className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="font-medium">{e.name}</div>
                                        <div
                                            className="text-xs"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {e.phone} · {e.city || 'N/A'}
                                        </div>
                                    </div>
                                    <span
                                        className="text-[10px] tracking-wider uppercase"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        {e.type}
                                    </span>
                                </div>
                                {e.message && (
                                    <p
                                        className="text-sm mt-2"
                                        style={{ color: 'var(--ink2)' }}
                                    >
                                        {e.message}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}