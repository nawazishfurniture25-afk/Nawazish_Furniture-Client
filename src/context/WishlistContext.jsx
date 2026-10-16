import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const WishlistContext = createContext(null);

const STORAGE_KEY = 'nawazish_wishlist';

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);

    // Load from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed)) setWishlist(parsed);
            }
        } catch (err) {
            console.error('Failed to load wishlist:', err);
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
        } catch (err) {
            console.error('Failed to save wishlist:', err);
        }
    }, [wishlist]);

    // Toggle wishlist
    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item.id === product.id);

            if (exists) {
                toast.success('Removed from wishlist');
                return prev.filter((item) => item.id !== product.id);
            }

            toast.success(`${product.name} added to wishlist`);
            return [
                ...prev,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0]?.url || '/images/placeholder.jpg',
                    category: product.category,
                },
            ];
        });
    };

    // Check if in wishlist
    const isInWishlist = (productId) => {
        return wishlist.some((item) => item.id === productId);
    };

    // Remove from wishlist
    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
        toast.success('Removed from wishlist');
    };

    const value = {
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        count: wishlist.length,
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within WishlistProvider');
    }
    return context;
}