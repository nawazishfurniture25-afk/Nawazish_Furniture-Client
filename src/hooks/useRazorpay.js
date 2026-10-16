import { useEffect, useState } from 'react';

export default function useRazorpay() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Check if already loaded
        if (window.Razorpay) {
            setLoaded(true);
            return;
        }

        // Check if script tag already exists
        const existing = document.querySelector(
            'script[src*="checkout.razorpay.com"]'
        );
        if (existing) {
            existing.addEventListener('load', () => setLoaded(true));
            return;
        }

        // Create and append script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => setLoaded(true);
        script.onerror = () => console.error('Failed to load Razorpay');
        document.body.appendChild(script);
    }, []);

    return loaded;
}