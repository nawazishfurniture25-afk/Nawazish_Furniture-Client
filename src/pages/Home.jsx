import { useEffect, useState } from 'react';
import SEO from '../components/common/SEO';
import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import SignatureSection from '../components/home/SignatureSection';
import FeaturedGrid from '../components/home/FeaturedGrid';
import MaterialStory from '../components/home/MaterialStory';
import VideoSection from '../components/home/VideoSection';
import ProcessSection from '../components/home/ProcessSection';
import Testimonials from '../components/home/Testimonials';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';
import { getProducts } from '../lib/api';

// ==================== JSON-LD SCHEMA ====================
const HOME_SCHEMA = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'FurnitureStore',
            '@id': 'https://nawazishfurniture.in/#store',
            name: 'Nawazish Furniture',
            url: 'https://nawazishfurniture.in',
            image: 'https://nawazishfurniture.in/images/og-default.jpg',
            logo: 'https://nawazishfurniture.in/images/logo.png',
            description:
                'Bespoke handcrafted sofas, diwans and recliners made in Jabalpur, delivered across Madhya Pradesh since 1998.',
            telephone: '+91-9713624142',
            email: 'hello@nawazishfurniture.in',
            priceRange: '₹₹',
            currenciesAccepted: 'INR',
            paymentAccepted: 'UPI, Bank Transfer, Cash',
            address: {
                '@type': 'PostalAddress',
                streetAddress: '5WWQ+499, Raddi Chowki, Gazi Nagar, Adhartal',
                addressLocality: 'Jabalpur',
                addressRegion: 'Madhya Pradesh',
                postalCode: '482004',
                addressCountry: 'IN',
            },
            geo: {
                '@type': 'GeoCoordinates',
                latitude: 23.1970036,
                longitude: 79.9384033,
            },
            areaServed: {
                '@type': 'State',
                name: 'Madhya Pradesh',
            },
            openingHoursSpecification: [
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                    ],
                    opens: '10:00',
                    closes: '20:00',
                },
                {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Saturday',
                    opens: '10:00',
                    closes: '18:00',
                },
            ],
            sameAs: [
                'https://www.instagram.com/nawazishfurniture',
                'https://www.facebook.com/nawazishfurniture',
            ],
        },
        {
            '@type': 'WebSite',
            '@id': 'https://nawazishfurniture.in/#website',
            url: 'https://nawazishfurniture.in',
            name: 'Nawazish Furniture',
            publisher: { '@id': 'https://nawazishfurniture.in/#store' },
            potentialAction: {
                '@type': 'SearchAction',
                target:
                    'https://nawazishfurniture.in/collections?q={search_term_string}',
                'query-input': 'required name=search_term_string',
            },
        },
    ],
};

// ==================== COMPONENT ====================
export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getProducts({ featured: 'true' });
                setProducts(res.data.data || []);
            } catch (err) {
                console.error('Failed to load products:', err);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            {/* ==================== SEO ==================== */}
            <SEO
                title="Handcrafted Sofas in Jabalpur, MP"
                description="Bespoke handcrafted sofas, diwans & recliners. Direct from our Jabalpur atelier. Delivered across Madhya Pradesh. 10-year frame warranty. Custom dimensions available."
                keywords="sofa manufacturer Jabalpur, custom sofa MP, handcrafted furniture Jabalpur, L-shape sofa Madhya Pradesh, diwan maker Jabalpur, sofa factory MP, furniture manufacturer Jabalpur"
                url="/"
                type="website"
                image="https://nawazishfurniture.in/images/og-home.jpg"
                jsonLd={HOME_SCHEMA}
            />

            {/* ==================== SECTIONS ==================== */}
            <Hero />
            <Marquee />
            <SignatureSection />
            <FeaturedGrid products={products} />
            <MaterialStory />
            <VideoSection />
            <ProcessSection />
            <Testimonials />
            <FAQSection />
            <CTASection />
        </>
    );
}