import { Link } from 'react-router-dom';
import { X, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

export default function WishlistDrawer({ isOpen, onClose }) {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const formatPrice = (paise) => {
        return '₹ ' + (paise / 100).toLocaleString('en-IN');
    };

    if (!isOpen) return null;

    const handleMoveToCart = (item) => {
        // We need full product data for addToCart
        // Since wishlist only stores partial, we make a compatible object
        addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            images: [{ url: item.image }],
            category: item.category,
        });
        removeFromWishlist(item.id);
    };

    return (
        <div
            className="fixed inset-0 z-[200] flex justify-end"
            role="dialog"
            aria-modal="true"
            aria-label="Wishlist"
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
                        <h2 className="font-serif text-2xl">Wishlist</h2>
                        <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close wishlist"
                        className="w-11 h-11 rounded-full border flex items-center justify-center transition-transform hover:rotate-90"
                        style={{ borderColor: 'var(--line-strong)' }}
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                    {wishlist.length === 0 ? (
                        <div className="text-center py-16">
                            <Heart
                                size={48}
                                className="mx-auto mb-4"
                                style={{ color: 'var(--gold)' }}
                            />
                            <h3 className="font-serif text-2xl mb-2">
                                Your wishlist is empty
                            </h3>
                            <p
                                className="text-sm mb-6"
                                style={{ color: 'var(--muted)' }}
                            >
                                Tap the heart on any piece to save it here.
                            </p>
                            <Link to="/collections" onClick={onClose} className="btn btn-gold">
                                Browse Collection
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {wishlist.map((item) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[88px_1fr_auto] gap-4 pb-4 border-b"
                                    style={{ borderColor: 'var(--line)' }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-[88px] h-[88px] object-cover"
                                        style={{ background: 'var(--bg3)' }}
                                    />

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
                                            className="font-serif text-base mb-3"
                                            style={{ color: 'var(--gold)' }}
                                        >
                                            {formatPrice(item.price)}
                                        </p>

                                        <button
                                            onClick={() => handleMoveToCart(item)}
                                            className="btn btn-gold !min-h-[36px] !px-4 !text-[10px]"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromWishlist(item.id)}
                                        aria-label={`Remove ${item.name} from wishlist`}
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
            </aside>
        </div>
    );
}