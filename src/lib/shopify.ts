import { shopifyConfig } from '@/config/shopify';

const API_URL = `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`;

async function shopifyQuery(query: string, variables?: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || 'Shopify API error');
  }
  return json.data;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  handle: string;
  tags: string[];
  price: number;
  currencyCode: string;
  image: string;
  images: string[];
  shopifyVariantId: string | null;
  category: string;
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    }
  }
`;

const CATEGORY_TAGS = [
  'resin-art', 'engraved', 'frames', 'bottles',
  'keychains', 'custom', 'home-decor', 'accessories',
  'apparel', 'trophies', 'gifts',
] as const;

function mapCategory(tags: string[]): string {
  const match = tags.find(t => CATEGORY_TAGS.includes(t as typeof CATEGORY_TAGS[number]));
  return match || 'custom';
}

export async function fetchShopifyProducts(): Promise<ShopifyProduct[]> {
  const data = await shopifyQuery(PRODUCTS_QUERY, { first: 250 });

  return data.products.edges.map(({ node }: any) => {
    const images = node.images.edges.map((e: any) => e.node.url);
    const variantId = node.variants.edges[0]?.node?.id || null;

    return {
      id: node.id,
      title: node.title,
      description: node.description || '',
      handle: node.handle,
      tags: node.tags || [],
      category: mapCategory(node.tags || []),
      price: parseFloat(node.priceRange.minVariantPrice.amount),
      currencyCode: node.priceRange.minVariantPrice.currencyCode,
      image: images[0] || '',
      images,
      shopifyVariantId: variantId,
    };
  });
}

const CART_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function createShopifyCheckoutUrl(
  variantId: string,
  quantity: number = 1
): Promise<string> {
  const data: any = await shopifyQuery(CART_MUTATION, {
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity,
        },
      ],
    },
  });

  if (data.cartCreate?.userErrors?.length) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart.checkoutUrl;
}

export function formatPrice(amount: number | string, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(typeof amount === 'string' ? parseFloat(amount) : amount);
}
