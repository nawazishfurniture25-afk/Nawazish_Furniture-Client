import { Link } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
    const {
        cart,
        removeFromCart,
        updateQty,
        totalItems,
        subtotal,
        clearCart,
    } = useCart();

    const formatPrice = (paise) => {
        return '₹ ' + (paise / 100).toLocaleString('en-IN');
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className="relative w-full max-w-[480px] h-full flex flex-col animate-slide-in"
                style={{ background: 'var(--bg)' }}
            >
                {/* Head */}
                <div
                    className="flex justify-between items-start p-6 border-b"
                    style={{ borderColor: 'var(--line)' }}
                >
                    <div>
                        <h2 className="font-serif text-2xl">Your Cart</h2>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                            {totalItems} {totalItems === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close cart"
                        className="w-11 h-11 rounded-full border flex items-center justify-center transition-transform hover:rotate-90"
                        style={{ borderColor: 'var(--line-strong)' }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        // Empty state
                        <div className="text-center py-16">
                            <ShoppingBag
                                size={48}
                                className="mx-auto mb-4"
                                style={{ color: 'var(--gold)' }}
                            />
                            <h3 className="font-serif text-2xl mb-2">
                                Your cart is empty
                            </h3>
                            <p
                                className="text-sm mb-6"
                                style={{ color: 'var(--muted)' }}
                            >
                                Add pieces from our collection to begin.
                            </p>
                            <Link to="/collections" onClick={onClose} className="btn btn-gold">
                                Browse Collection
                            </Link>
                        </div>
                    ) : (
                        // Cart items
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[88px_1fr_auto] gap-4 pb-4 border-b items-center"
                                    style={{ borderColor: 'var(--line)' }}
                                >
                                    {/* Image */}
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-[88px] h-[88px] object-cover"
                                        style={{ background: 'var(--bg3)' }}
                                    />

                                    {/* Info */}
                                    <div>
                                        <h3 className="font-serif text-base leading-tight mb-1">
                                            {item.name}
                                        </h3>
                                        <p
                                            className="text-[10px] tracking-[0.24em] uppercase mb-2"
                                            style={{ color: 'var(--muted)' }}
                                        >
                                            {item.category}
                                        </p>
                                        <p
                                            className="font-serif text-base"
                                            style={{ color: 'var(--gold)' }}
                                        >
                                            {formatPrice(item.price * item.qty)}
                                        </p>

                                        {/* Qty controls */}
                                        <div
                                            className="inline-flex items-center border mt-2"
                                            style={{ borderColor: 'var(--line-strong)' }}
                                        >
                                            <button
                                                onClick={() => updateQty(item.id, -1)}
                                                aria-label={`Decrease quantity of ${item.name}`}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg2)]"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="min-w-[28px] text-center text-sm font-medium">
                                                {item.qty}
                                            </span>
                                            <button
                                                onClick={() => updateQty(item.id, 1)}
                                                aria-label={`Increase quantity of ${item.name}`}
                                                className="w-8 h-8 flex items-center justify-center hover:bg-[var(--bg2)]"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        aria-label={`Remove ${item.name} from cart`}
                                        className="w-10 h-10 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--bg2)]"
                                        style={{ color: 'var(--muted)' }}
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div
                        className="border-t p-6"
                        style={{
                            borderColor: 'var(--line)',
                            background: 'var(--bg2)',
                        }}
                    >
                        <div className="flex justify-between text-sm mb-2">
                            <span style={{ color: 'var(--muted)' }}>Subtotal</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-3">
                            <span style={{ color: 'var(--muted)' }}>Delivery (MP)</span>
                            <span>Free</span>
                        </div>
                        <div
                            className="flex justify-between items-baseline font-serif text-2xl pt-3 mb-5 border-t"
                            style={{ borderColor: 'var(--line)', color: 'var(--gold)' }}
                        >
                            <span>Total</span>
                            <span>{formatPrice(subtotal)}</span>
                        </div>

                        <Link
                            to="/checkout"
                            onClick={onClose}
                            className="btn btn-gold w-full mb-2"
                        >
                            Proceed to Checkout
                        </Link>
                        <button onClick={onClose} className="btn w-full">
                            Continue Browsing
                        </button>
                    </div>
                )}
            </aside>
        </div>
    );
}