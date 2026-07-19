import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

const BASE_TITLE = 'Uniqliurz — Custom Gifts & Keepsakes';
const BASE_DESC = 'Uniqliurz crafts personalized gifts and keepsakes in New Jersey, USA. Custom resin art, engraved gifts, photo frames, apparel and more. Handcrafted with love.';
const BASE_URL = 'https://www.uniqliurz.com';
const BASE_IMAGE = '/og-image.png';

export function useSEO({
  title,
  description,
  image,
  url,
  type = 'website',
}: SEOProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Uniqliurz` : BASE_TITLE;
    const desc = description || BASE_DESC;
    const img = image || BASE_IMAGE;
    const pageUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    document.title = fullTitle;

    setMeta('description', desc);
    setMeta('og:title', fullTitle);
    setMeta('og:description', desc);
    setMeta('og:image', img);
    setMeta('og:url', pageUrl);
    setMeta('og:type', type);
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', desc);
    setMeta('twitter:image', img);
    setMeta('twitter:card', 'summary_large_image');
  }, [title, description, image, url, type]);
}

function setMeta(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement | null;
  }
  if (!el) {
    el = document.createElement('meta');
    if (property.startsWith('og:')) {
      el.setAttribute('property', property);
    } else {
      el.setAttribute('name', property);
    }
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
