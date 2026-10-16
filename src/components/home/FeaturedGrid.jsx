import { Link } from 'react-router-dom';

export default function FeaturedGrid({ products = [] }) {
    if (!products.length) return null;

    const [first, second, third, fourth] = products.slice(0, 4);

    const CardItem = ({ product, className }) => (
        <Link
            to="/collections"
            className={`group relative overflow-hidden card-3d ${className}`}
            style={{ background: 'var(--bg3)' }}
        >
            <img
                src={product.images?.[0]?.url || '/images/IMG1.jpeg'}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.06]"
                loading="lazy"
            />
            <div
                className="absolute inset-x-0 bottom-0 p-5 md:p-6 text-white transition-transform duration-500 group-hover:-translate-y-1.5"
                style={{
                    background:
                        'linear-gradient(0deg, rgba(10,9,8,0.85), transparent)',
                }}
            >
                <div
                    className="text-[10px] tracking-[0.24em] uppercase mb-2"
                    style={{ color: 'var(--gold-bright)' }}
                >
                    {product.category}
                </div>
                <h3 className="font-serif text-lg md:text-2xl">{product.name}</h3>
            </div>
        </Link>
    );

    return (
        <section className="section">
            <div className="container-custom">
                <div className="mb-12">
                    <p className="eyebrow mb-5">Selected work</p>
                    <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-tight">
                        From first sketch to{' '}
                        <em className="italic" style={{ color: 'var(--gold)' }}>
                            final stitch
                        </em>
                    </h2>
                </div>

                <div className="grid grid-cols-12 gap-4 md:gap-5">
                    {first && (
                        <CardItem
                            product={first}
                            className="col-span-12 md:col-span-7 aspect-[16/10]"
                        />
                    )}
                    {second && (
                        <CardItem
                            product={second}
                            className="col-span-12 md:col-span-5 aspect-[4/3] md:aspect-[4/3]"
                        />
                    )}
                    {third && (
                        <CardItem
                            product={third}
                            className="col-span-12 md:col-span-6 aspect-[5/4]"
                        />
                    )}
                    {fourth && (
                        <CardItem
                            product={fourth}
                            className="col-span-12 md:col-span-6 aspect-[5/4]"
                        />
                    )}
                </div>
            </div>
        </section>
    );
}