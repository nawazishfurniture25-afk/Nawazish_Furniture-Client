export default function ProductFilters({
    categories = [],
    activeCategory,
    onChange,
}) {
    return (
        <div className="flex gap-1 overflow-x-auto border-b -mx-5 md:mx-0 px-5 md:px-0 scrollbar-hide" style={{
            borderColor: 'var(--line)'
        }} role="group" aria-label="Filter by category">
            {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                    <button key={cat} onClick={() => onChange(cat)}
                        aria-pressed={isActive}
                        className="flex-shrink-0 min-h-[44px] px-4 md:px-5 text-[11px] tracking-[0.18em] uppercase transition-colors"
                        style={{
                            color: isActive ? 'var(--gold)' : 'var(--muted)',
                            borderBottom: isActive
                                ? '2px solid var(--gold)'
                                : '2px solid transparent',
                        }}
                    >
                        {cat}
                    </button>
                );
            })}
        </div>
    );
}