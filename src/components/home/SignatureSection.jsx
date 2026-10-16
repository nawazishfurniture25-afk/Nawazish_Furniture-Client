import { Link } from 'react-router-dom';
import SofaViewer from './SofaViewer';

export default function SignatureSection() {
    return (
        <section className="section">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left — copy */}
                    <div>
                        <p className="eyebrow mb-5">The signature piece</p>

                        <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-tight mb-6">
                            Meet the Narmada{' '}
                            <em className="italic" style={{ color: 'var(--gold)' }}>
                                Sectional.
                            </em>
                        </h2>

                        <p
                            className="text-base md:text-lg leading-relaxed mb-8 max-w-[520px]"
                            style={{ color: 'var(--ink2)' }}
                        >
                            Brown velvet, cream tufted cushions and gold piping, on turned
                            Sheesham legs. Drag the model to look from every side.
                        </p>

                        {/* Spec list */}
                        <ul
                            className="border-t max-w-[520px] mb-8"
                            style={{ borderColor: 'var(--line)' }}
                        >
                            {[
                                { label: 'Frame', value: 'Seasoned Sheesham' },
                                { label: 'Seating', value: 'HR foam, 6-seater' },
                                { label: 'Fabric', value: 'Brown velvet + cream' },
                                { label: 'Warranty', value: '10 years on frame' },
                            ].map((item) => (
                                <li
                                    key={item.label}
                                    className="flex justify-between items-center py-3.5 border-b text-sm"
                                    style={{ borderColor: 'var(--line)' }}
                                >
                                    <span style={{ color: 'var(--muted)' }}>{item.label}</span>
                                    <span
                                        className="font-medium"
                                        style={{ color: 'var(--gold)' }}
                                    >
                                        {item.value}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Link to="/collections" className="btn btn-gold">
                            View Collection
                        </Link>
                    </div>

                    {/* Right — 3D viewer */}
                    <div
                        className="relative w-full aspect-square md:aspect-[5/4] border overflow-hidden"
                        style={{ borderColor: 'var(--line)' }}
                    >
                        <SofaViewer />
                    </div>
                </div>
            </div>
        </section>
    );
}