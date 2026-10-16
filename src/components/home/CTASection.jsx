import { Link } from 'react-router-dom';

export default function CTASection() {
    return (
        <section
            className="text-center py-24 md:py-32 border-t"
            style={{
                background:
                    'radial-gradient(ellipse at center, var(--glow, rgba(163,123,52,0.25)), transparent 65%)',
                borderColor: 'var(--line)',
            }}
        >
            <div className="container-custom">
                <h2 className="font-serif text-3xl md:text-6xl leading-tight mb-6">
                    Commission your{' '}
                    <em className="italic" style={{ color: 'var(--gold)' }}>
                        own.
                    </em>
                </h2>
                <p
                    className="max-w-xl mx-auto mb-10 text-base md:text-lg"
                    style={{ color: 'var(--ink2)' }}
                >
                    Tell us what you have in mind. We will reply on WhatsApp within a
                    day.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                    <Link to="/custom" className="btn btn-gold">
                        Begin the Conversation
                    </Link>
                    <a
                        href="https://wa.me/919713624142"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn"
                    >
                        WhatsApp Us
                    </a>
                </div>
            </div>
        </section>
    );
}