import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import WishlistDrawer from '../cart/WishlistDrawer';
import CookieConsent from '../common/CookieConsent';

export default function Layout({ children }) {
    const [cartOpen, setCartOpen] = useState(false);
    const [wishlistOpen, setWishlistOpen] = useState(false);

    return (
        <>
            <Navbar
                onOpenCart={() => setCartOpen(true)}
                onOpenWishlist={() => setWishlistOpen(true)}
            />

            {/* Main content with top padding for fixed navbar */}
            <main className="pt-16 md:pt-20 min-h-screen">
                {children}
            </main>

            <Footer />

            {/* Slide-in drawers */}
            <CartDrawer
                isOpen={cartOpen}
                onClose={() => setCartOpen(false)}
                onOpenWishlist={() => {
                    setCartOpen(false);
                    setWishlistOpen(true);
                }}
            />
            <WishlistDrawer
                isOpen={wishlistOpen}
                onClose={() => setWishlistOpen(false)}
                onOpenCart={() => {
                    setWishlistOpen(false);
                    setCartOpen(true);
                }}
            />
            <CookieConsent />
        </>
    );
}