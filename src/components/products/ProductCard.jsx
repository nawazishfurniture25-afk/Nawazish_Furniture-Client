import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);

    const image = product.images?.[0]?.url || '/images/IMG1.jpeg';

    const formatPrice = (paise) => {
        return '₹ ' + (paise / 100).toLocaleString('en-IN');
    };

    return (
        <article
            className="group relative flex flex-col card-3d"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--line)',
            }}
        >
            {/* Image */}
            <div
                className="relative aspect-[4/3] overflow-hidden"
                style={{ background: 'var(--bg3)' }}
            >
                <img
                    src={image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.08]"
                />

                {/* Tag badge */}
                {product.tag && (
                    <span
                        className="absolute top-3 left-3 px-3 py-1.5 text-[10px] tracking-[0.24em] uppercase font-medium"
                        style={{ background: 'var(--gold)', color: '#fff' }}
                    >
                        {product.tag}
                    </span>
                )}
            </div>

            {/* Body */}
            <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="font-serif text-lg md:text-xl mb-1.5">
                    {product.name}
                </h3>

                <p
                    className="text-[10px] tracking-[0.24em] uppercase mb-5"
                    style={{ color: 'var(--muted)' }}
                >
                    {product.shortDesc || product.category}
                </p>

                <div
                    className="font-serif text-xl md:text-2xl mt-auto pt-5 border-t flex items-baseline justify-between"
                    style={{ borderColor: 'var(--line)', color: 'var(--gold)' }}
                >
                    <span>{formatPrice(product.price)}</span>
                    <small
                        className="text-[10px] tracking-[0.24em] uppercase"
                        style={{ color: 'var(--muted)', fontFamily: 'Manrope, sans-serif' }}
                    >
                        From
                    </small>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                    <button
                        onClick={() => addToCart(product)}
                        aria-label={`Add ${product.name} to cart`}
                        className="btn btn-gold flex-1 !text-[10px] !min-h-[44px] !px-3"
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={() => toggleWishlist(product)}
                        aria-label={
                            inWishlist
                                ? `Remove ${product.name} from wishlist`
                                : `Add ${product.name} to wishlist`
                        }
                        aria-pressed={inWishlist}
                        className="w-11 h-11 flex-shrink-0 flex items-center justify-center border transition-colors"
                        style={{
                            background: inWishlist ? 'var(--gold)' : 'transparent',
                            borderColor: inWishlist ? 'var(--gold)' : 'var(--line-strong)',
                            color: inWishlist ? '#fff' : 'var(--ink-soft)',
                        }}
                    >
                        <Heart
                            size={18}
                            fill={inWishlist ? 'currentColor' : 'none'}
                        />
                    </button>
                </div>
            </div>
        </article>
    );
}