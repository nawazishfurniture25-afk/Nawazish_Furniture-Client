import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/products/ProductCard';
import ProductFilters from '../components/products/ProductFilters';
import Lookbook from '../components/products/Lookbook';
import BulkPricing from '../components/products/BulkPricing';
import { getProducts } from '../lib/api';
import SEO from '../components/common/SEO';

export default function Collections() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await getProducts();
                setProducts(res.data.data || []);
            } catch (err) {
                console.error('Failed to load products:', err);
                setError('Could not load products. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const cats = new Set(products.map((p) => p.category));
        return ['All', ...Array.from(cats)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === 'All') return products;
        return products.filter((p) => p.category === activeCategory);
    }, [products, activeCategory]);

    return (
        <>
            {/* ==================== SEO ==================== */}
            <SEO
                title="Collection — Handcrafted Sofas"
                description="Browse our collection of handcrafted sofas, L-shape sectionals, diwans, recliners. Custom dimensions, 200+ fabrics. Made in Jabalpur, delivered across MP."
                keywords="L-shape sofa, 3-seater sofa, recliner, diwan, sofa cum bed, custom furniture MP, handcrafted sofa Jabalpur"
                url="/collections"
                type="website"
                image="https://nawazishfurniture.in/images/og-collections.jpg"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Sofas & Furniture Collection',
                    description:
                        'Handcrafted sofas, diwans and recliners made to order in Jabalpur.',
                    url: 'https://nawazishfurniture.in/collections',
                    isPartOf: {
                        '@type': 'WebSite',
                        name: 'Nawazish Furniture',
                        url: 'https://nawazishfurniture.in',
                    },
                }}
            />

            {/* Page head */}
            <section className="section pb-8">
                <div className="container-custom">
                    <p className="eyebrow mb-6">Collections</p>
                    <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-5 max-w-3xl">
                        Sofas, made{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            to order
                        </em>
                    </h1>
                    <p
                        className="text-base md:text-lg max-w-2xl mb-6"
                        style={{ color: 'var(--ink2)' }}
                    >
                        Every piece is built after you order, so you can change the
                        fabric, size and legs.
                    </p>

                    <div
                        className="inline-block px-4 py-2.5 border text-[10px] tracking-[0.16em] uppercase"
                        style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                    >
                        MP only — Custom commissions currently limited to deliveries
                        within Madhya Pradesh
                    </div>
                </div>
            </section>

            {/* Products */}
            <section className="pb-20">
                <div className="container-custom">
                    {!loading && products.length > 0 && (
                        <ProductFilters
                            categories={categories}
                            activeCategory={activeCategory}
                            onChange={setActiveCategory}
                        />
                    )}

                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="animate-pulse"
                                    style={{
                                        background: 'var(--card)',
                                        border: '1px solid var(--line)',
                                    }}
                                >
                                    <div className="aspect-[4/3]" style={{ background: 'var(--bg3)' }} />
                                    <div className="p-6 space-y-3">
                                        <div className="h-5 w-3/4" style={{ background: 'var(--bg3)' }} />
                                        <div className="h-3 w-1/2" style={{ background: 'var(--bg3)' }} />
                                        <div className="h-6 w-1/3 mt-4" style={{ background: 'var(--bg3)' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {error && !loading && (
                        <div
                            className="text-center py-20 border mt-8"
                            style={{ borderColor: 'var(--line)' }}
                        >
                            <p style={{ color: 'var(--terra)' }}>{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn btn-gold mt-6"
                            >
                                Retry
                            </button>
                        </div>
                    )}

                    {!loading && !error && filteredProducts.length === 0 && (
                        <div
                            className="text-center py-20 border mt-8"
                            style={{ borderColor: 'var(--line)' }}
                        >
                            <p className="font-serif text-2xl mb-3">No pieces found</p>
                            <p className="text-sm mb-6" style={{ color: 'var(--muted)' }}>
                                Try a different category or contact us for a custom order.
                            </p>
                            <Link to="/custom" className="btn btn-gold">
                                Request Custom Order
                            </Link>
                        </div>
                    )}

                    {!loading && !error && filteredProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Wholesale section */}
            <section className="section" style={{ background: 'var(--bg2)' }}>
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="eyebrow mb-5">Wholesale</p>
                            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
                                For malls &{' '}
                                <em className="italic" style={{ color: 'var(--gold)' }}>
                                    showrooms
                                </em>
                            </h2>
                            <p
                                className="text-base md:text-lg mb-7 max-w-lg"
                                style={{ color: 'var(--ink2)' }}
                            >
                                Factory-direct rates for retailers, hotels and offices
                                across Madhya Pradesh. Minimum order of 10 pieces.
                            </p>
                            <Link to="/contact" className="btn btn-gold">
                                Request wholesale rates
                            </Link>
                        </div>

                        <div
                            className="p-8 md:p-10 border"
                            style={{
                                borderColor: 'var(--line)',
                                background: 'var(--card)',
                            }}
                        >
                            <div
                                className="text-[10px] tracking-[0.3em] uppercase font-medium mb-4"
                                style={{ color: 'var(--gold)' }}
                            >
                                Terms
                            </div>
                            <p style={{ color: 'var(--ink2)', lineHeight: 1.8 }}>
                                50% advance, 50% on delivery. Delivery in 2–3 weeks. Bulk
                                and modular layouts are quoted per project.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lookbook — NAYA */}
            <Lookbook />

            {/* BulkPricing — NAYA */}
            <BulkPricing />

            {/* CTA */}
            <section
                className="text-center py-20 md:py-24 border-t"
                style={{
                    background:
                        'radial-gradient(ellipse at center, rgba(163,123,52,0.2), transparent 65%)',
                    borderColor: 'var(--line)',
                }}
            >
                <div className="container-custom">
                    <h2 className="font-serif text-3xl md:text-5xl mb-5">
                        Something{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            bespoke?
                        </em>
                    </h2>
                    <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--ink2)' }}>
                        If you can imagine it, we can build it.
                    </p>
                    <Link to="/custom" className="btn btn-gold">
                        Enter the Atelier
                    </Link>
                </div>
            </section>
        </>
    );
}