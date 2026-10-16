import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Package, AlertCircle } from 'lucide-react';
import AdminLayout from '../../components/admin/AdminLayout';
import ImageUploader from '../../components/admin/ImageUploader';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
} from '../../lib/api';
import toast from 'react-hot-toast';

const EMPTY_FORM = {
    name: '',
    slug: '',
    shortDesc: '',
    description: '',
    price: '',
    mrp: '',
    category: '',
    fabric: '',
    dimensions: '',
    warranty: '10 years on frame',
    tag: '',
    featured: false,
    inStock: true,
    stockQty: 1,
    sortOrder: 0,
    images: [],
};

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState('');

    const load = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data.data || []);
        } catch (err) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const openCreate = () => {
        setEditing(null);
        setForm(EMPTY_FORM);
        setModalOpen(true);
    };

    const openEdit = (product) => {
        setEditing(product);
        setForm({
            name: product.name,
            slug: product.slug,
            shortDesc: product.shortDesc || '',
            description: product.description || '',
            price: (product.price / 100).toString(),
            mrp: product.mrp ? (product.mrp / 100).toString() : '',
            category: product.category,
            fabric: product.fabric || '',
            dimensions: product.dimensions || '',
            warranty: product.warranty || '10 years on frame',
            tag: product.tag || '',
            featured: product.featured || false,
            inStock: product.inStock !== false,
            stockQty: product.stockQty ?? 1,
            sortOrder: product.sortOrder || 0,
            images: (product.images || []).map((img) => ({
                url: img.url,
                publicId: img.publicId || img.id,
                isPrimary: img.isPrimary,
            })),
        });
        setModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]:
                type === 'checkbox'
                    ? checked
                    : type === 'number'
                        ? Number(value)
                        : value,
        }));
    };

    const autoGenerateSlug = () => {
        const slug = form.name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
        setForm((prev) => ({ ...prev, slug }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.images.length === 0) {
            toast.error('Please add at least one image');
            return;
        }

        setSaving(true);
        try {
            const data = {
                name: form.name.trim(),
                slug: form.slug.trim().toLowerCase().replace(/\s+/g, '-'),
                shortDesc: form.shortDesc.trim(),
                description: form.description.trim(),
                price: Math.round(parseFloat(form.price) * 100),
                mrp: form.mrp ? Math.round(parseFloat(form.mrp) * 100) : undefined,
                gstRate: 18,
                hsnCode: '9401',
                category: form.category.trim(),
                fabric: form.fabric.trim(),
                dimensions: form.dimensions.trim(),
                warranty: form.warranty.trim(),
                tag: form.tag.trim() || null,
                featured: form.featured,
                inStock: form.inStock,
                stockQty: form.stockQty,
                sortOrder: form.sortOrder,
                images: form.images,
            };

            if (editing) {
                await updateProduct(editing.id, data);
                toast.success('Product updated');
            } else {
                await createProduct(data);
                toast.success('Product created');
            }

            setModalOpen(false);
            load();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete "${name}" permanently?`)) return;
        try {
            await deleteProduct(id);
            toast.success('Product deleted');
            load();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const formatPrice = (paise) => '₹ ' + (paise / 100).toLocaleString('en-IN');

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AdminLayout title="Products">
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <div>
                    <p className="text-sm" style={{ color: 'var(--muted)' }}>
                        {products.length} products ·{' '}
                        {products.filter((p) => p.inStock).length} in stock
                    </p>
                </div>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Search products…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input !min-h-[44px] w-48"
                    />
                    <button onClick={openCreate} className="btn btn-gold whitespace-nowrap">
                        <Plus size={16} />
                        Add Product
                    </button>
                </div>
            </div>

            {/* Table */}
            <div
                className="border overflow-x-auto"
                style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
            >
                <table className="w-full text-sm min-w-[900px]">
                    <thead
                        className="text-[10px] tracking-[0.2em] uppercase"
                        style={{ color: 'var(--muted)', background: 'var(--bg2)' }}
                    >
                        <tr>
                            <th className="text-left p-3">Image</th>
                            <th className="text-left p-3">Name</th>
                            <th className="text-left p-3">Category</th>
                            <th className="text-left p-3">Price</th>
                            <th className="text-left p-3">Stock</th>
                            <th className="text-left p-3">Status</th>
                            <th className="text-left p-3">Featured</th>
                            <th className="text-right p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="p-8 text-center"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Loading…
                                </td>
                            </tr>
                        ) : filtered.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={8}
                                    className="p-8 text-center"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    {search ? 'No matching products' : 'No products yet'}
                                </td>
                            </tr>
                        ) : (
                            filtered.map((p) => (
                                <tr
                                    key={p.id}
                                    className="border-t"
                                    style={{ borderColor: 'var(--line)' }}
                                >
                                    <td className="p-3">
                                        <img
                                            src={p.images?.[0]?.url || '/images/IMG1.jpeg'}
                                            alt={p.name}
                                            className="w-14 h-14 object-cover"
                                            style={{ background: 'var(--bg3)' }}
                                        />
                                    </td>
                                    <td className="p-3">
                                        <div className="font-medium">{p.name}</div>
                                        <div
                                            className="text-xs"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {p.shortDesc || p.category}
                                        </div>
                                    </td>
                                    <td className="p-3">{p.category}</td>
                                    <td
                                        className="p-3 font-medium"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        {formatPrice(p.price)}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className="px-2 py-1 text-[10px] tracking-wider uppercase font-medium"
                                            style={{
                                                background:
                                                    p.stockQty > 5
                                                        ? 'rgba(47,74,60,0.15)'
                                                        : p.stockQty > 0
                                                            ? 'rgba(184,84,44,0.15)'
                                                            : 'rgba(166,58,28,0.15)',
                                                color:
                                                    p.stockQty > 5
                                                        ? 'var(--forest)'
                                                        : 'var(--terra)',
                                            }}
                                        >
                                            {p.stockQty || 0} left
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {p.inStock ? (
                                            <span
                                                className="flex items-center gap-1 text-xs"
                                                style={{ color: 'var(--forest)' }}
                                            >
                                                <Package size={12} /> In Stock
                                            </span>
                                        ) : (
                                            <span
                                                className="flex items-center gap-1 text-xs"
                                                style={{ color: 'var(--terra)' }}
                                            >
                                                <AlertCircle size={12} /> Out
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-3 text-xs">
                                        {p.featured ? '✓ Yes' : '—'}
                                    </td>
                                    <td className="p-3 text-right whitespace-nowrap">
                                        <button
                                            onClick={() => openEdit(p)}
                                            className="p-2 hover:text-[var(--gold)]"
                                            aria-label="Edit"
                                            title="Edit"
                                        >
                                            <Pencil size={15} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id, p.name)}
                                            className="p-2 hover:text-[var(--terra)]"
                                            aria-label="Delete"
                                            title="Delete"
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {modalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto"
                    style={{ background: 'rgba(0,0,0,0.7)' }}
                    onClick={() => setModalOpen(false)}
                >
                    <div
                        className="w-full max-w-4xl my-8"
                        style={{ background: 'var(--card)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div
                            className="flex justify-between items-center p-6 border-b sticky top-0 z-10"
                            style={{ background: 'var(--card)', borderColor: 'var(--line)' }}
                        >
                            <h2 className="font-serif text-2xl">
                                {editing ? 'Edit Product' : 'Add Product'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                aria-label="Close"
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--bg2)]"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Images */}
                            <div>
                                <label
                                    className="block text-[10px] uppercase tracking-wider mb-2 font-medium"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Product Images *
                                </label>
                                <ImageUploader
                                    images={form.images}
                                    onChange={(images) =>
                                        setForm((prev) => ({ ...prev, images }))
                                    }
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Product Name *
                                    </label>
                                    <input
                                        name="name"
                                        required
                                        value={form.name}
                                        onChange={handleChange}
                                        onBlur={() => !form.slug && autoGenerateSlug()}
                                        className="input"
                                        placeholder="The Narmada Sectional"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Slug * (URL)
                                    </label>
                                    <input
                                        name="slug"
                                        required
                                        value={form.slug}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="narmada-sectional"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Short Description
                                    </label>
                                    <input
                                        name="shortDesc"
                                        value={form.shortDesc}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="6-Seater · Brown Velvet"
                                    />
                                </div>
                            </div>

                            {/* Pricing & Stock */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Price (₹) *
                                    </label>
                                    <input
                                        name="price"
                                        type="number"
                                        step="0.01"
                                        required
                                        value={form.price}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="42000"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        MRP (₹)
                                    </label>
                                    <input
                                        name="mrp"
                                        type="number"
                                        step="0.01"
                                        value={form.mrp}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="50000"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Stock Qty *
                                    </label>
                                    <input
                                        name="stockQty"
                                        type="number"
                                        min="0"
                                        required
                                        value={form.stockQty}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Sort Order
                                    </label>
                                    <input
                                        name="sortOrder"
                                        type="number"
                                        min="0"
                                        value={form.sortOrder}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Category & Details */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Category *
                                    </label>
                                    <input
                                        name="category"
                                        required
                                        value={form.category}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="L-Shape"
                                        list="category-list"
                                    />
                                    <datalist id="category-list">
                                        <option value="L-Shape" />
                                        <option value="3-Seater" />
                                        <option value="Recliner" />
                                        <option value="Diwan" />
                                        <option value="Sofa Cum Bed" />
                                    </datalist>
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Fabric
                                    </label>
                                    <input
                                        name="fabric"
                                        value={form.fabric}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="Brown Velvet"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Dimensions
                                    </label>
                                    <input
                                        name="dimensions"
                                        value={form.dimensions}
                                        onChange={handleChange}
                                        className="input"
                                        placeholder="84 x 36 x 32 inches"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Warranty
                                    </label>
                                    <input
                                        name="warranty"
                                        value={form.warranty}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="block text-[10px] uppercase tracking-wider mb-1"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        Tag (e.g. Signature, New)
                                    </label>
                                    <input
                                        name="tag"
                                        value={form.tag}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="flex flex-wrap gap-6 pt-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={form.featured}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm">Feature on homepage</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="inStock"
                                        checked={form.inStock}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm">Available for purchase</span>
                                </label>
                            </div>

                            {/* Description */}
                            <div>
                                <label
                                    className="block text-[10px] uppercase tracking-wider mb-1"
                                    style={{ color: 'var(--muted)' }}
                                >
                                    Full Description
                                </label>
                                <textarea
                                    name="description"
                                    rows={5}
                                    value={form.description}
                                    onChange={handleChange}
                                    className="input resize-vertical"
                                    placeholder="Detailed product description..."
                                />
                            </div>

                            {/* Actions */}
                            <div
                                className="flex gap-3 pt-4 border-t"
                                style={{ borderColor: 'var(--line)' }}
                            >
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="btn btn-gold flex-1 disabled:opacity-50"
                                >
                                    {saving
                                        ? 'Saving…'
                                        : editing
                                            ? 'Update Product'
                                            : 'Create Product'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="btn flex-1"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}