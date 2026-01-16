import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

export function useProducts(first: number = 20) {
  return useQuery<ShopifyProduct[]>({
    queryKey: ['products', first],
    queryFn: () => fetchProducts(first),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}