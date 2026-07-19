import { useState, useEffect } from 'react';
import products, { LocalProduct, getProductByHandle } from '@/data/products';
import { fetchShopifyProducts, ShopifyProduct } from '@/lib/shopify';

function toLocalProduct(sp: ShopifyProduct): LocalProduct {
  return {
    id: sp.id,
    title: sp.title,
    description: sp.description,
    handle: sp.handle,
    category: sp.category,
    price: sp.price,
    currencyCode: sp.currencyCode,
    image: sp.image,
    images: sp.images,
    shopifyVariantId: sp.shopifyVariantId,
  };
}

let cached: LocalProduct[] | null = null;
let cachedError: Error | null = null;
let fetchStarted = false;
const listeners: Set<() => void> = new Set();

function notify() {
  listeners.forEach(fn => fn());
}

function startFetch() {
  if (fetchStarted) return;
  fetchStarted = true;
  fetchShopifyProducts()
    .then(sp => {
      if (sp.length === 0) {
        console.warn('Shopify has no products yet, using local products');
        cached = products as LocalProduct[];
      } else {
        cached = sp.map(toLocalProduct);
      }
      cachedError = null;
    })
    .catch(err => {
      console.warn('Shopify fetch failed, using local products:', err.message);
      cached = products as LocalProduct[];
      cachedError = null;
    })
    .finally(() => notify());
}

startFetch();

export function useProducts() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const fn = () => setTick(t => t + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);

  if (cached) {
    return { data: cached, isLoading: false, error: null };
  }

  return {
    data: products as LocalProduct[],
    isLoading: !cachedError && !cached,
    error: cachedError,
  };
}

export function useProduct(handle: string) {
  const { data: all } = useProducts();
  const product = all.find(p => p.handle === handle) || getProductByHandle(handle) || null;
  return { data: product, isLoading: false, error: product ? null : new Error('Product not found') };
}
