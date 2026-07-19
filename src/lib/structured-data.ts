export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Uniqliurz',
    url: 'https://www.uniqliurz.com',
    logo: 'https://www.uniqliurz.com/logo.png',
    description: 'Custom gifts and keepsakes handcrafted in New Jersey, USA.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Jersey',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-551-229-7949',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    sameAs: [
      'https://wa.me/15512297949',
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Uniqliurz',
    image: 'https://www.uniqliurz.com/logo.png',
    url: 'https://www.uniqliurz.com',
    telephone: '+1-551-229-7949',
    description: 'Personalized gifts, resin art, engraved items, custom keepsakes handcrafted in New Jersey.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'New Jersey',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.0583,
      longitude: -74.4057,
    },
    openingHours: 'Mo-Fr 09:00-18:00',
    priceRange: '$$',
    areaServed: {
      '@type': 'State',
      name: 'New Jersey',
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Uniqliurz',
    url: 'https://www.uniqliurz.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.uniqliurz.com/shop?search={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    description: 'Custom gifts and keepsakes handcrafted in New Jersey. Shop unique personalized gifts for every occasion.',
  };
}

export function productSchema(product: {
  title: string;
  description: string;
  handle: string;
  image: string;
  price: number;
  currencyCode: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image?.startsWith('http') ? product.image : `https://www.uniqliurz.com${product.image || '/logo.png'}`,
    url: `https://www.uniqliurz.com/product/${product.handle}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currencyCode || 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://www.uniqliurz.com/product/${product.handle}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'Uniqliurz',
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://www.uniqliurz.com${item.url}`,
    })),
  };
}
