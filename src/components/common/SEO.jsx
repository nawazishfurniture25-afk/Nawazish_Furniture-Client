import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Nawazish Furniture';
const SITE_URL = 'https://nawazishfurniture.in';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const DEFAULT_DESC =
    'Handcrafted sofas, diwans & recliners made in our Jabalpur atelier. Direct from factory. Delivered across Madhya Pradesh.';

export default function SEO({
    title,
    description = DEFAULT_DESC,
    keywords,
    image = DEFAULT_IMAGE,
    url,
    type = 'website',
    jsonLd = null,
    noindex = false,
}) {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Handcrafted Sofas in Jabalpur, MP`;
    const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL;

    return (
        <Helmet>
            {/* Basic meta */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
            {!noindex && <meta name="robots" content="index, follow" />}

            {/* Canonical */}
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="en_IN" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Schema */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}