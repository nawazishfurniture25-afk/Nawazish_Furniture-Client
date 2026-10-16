import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext(null);

const STORAGE_KEY = 'nawazish_cart';
const MAX_QTY = 10;

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) {
                    setCart(parsed);
                }
            }
        } catch (err) {
            console.error('Failed to load cart:', err);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (err) {
            console.error('Failed to save cart:', err);
        }
    }, [cart]);

    // Add to cart
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);

            if (existing) {
                if (existing.qty + quantity > MAX_QTY) {
                    toast.error(`Max ${MAX_QTY} per item. Enquire for bulk orders.`);
                    return prev;
                }
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + quantity }
                        : item
                );
            }

            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0]?.url || '/images/placeholder.jpg',
                    category: product.category,
                    qty: quantity,
                },
            ];
        });

        toast.success(`${product.name} added to cart`);
    };

    // Remove from cart
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
        toast.success('Removed from cart');
    };

    // Update quantity
    const updateQty = (productId, delta) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.id !== productId) return item;
                    const newQty = item.qty + delta;
                    if (newQty < 1) return null;
                    if (newQty > MAX_QTY) {
                        toast.error(`Max ${MAX_QTY} per item.`);
                        return item;
                    }
                    return { ...item, qty: newQty };
                })
                .filter(Boolean)
        );
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    // Computed values
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        subtotal,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}