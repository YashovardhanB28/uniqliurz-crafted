import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const BASE_URL = 'https://www.uniqliurz.com';

const staticRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/shop', priority: '0.9', changefreq: 'weekly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
  { loc: '/customize', priority: '0.8', changefreq: 'monthly' },
  { loc: '/enquiry', priority: '0.5', changefreq: 'monthly' },
];

const productsSrc = fs.readFileSync(path.join(root, 'src', 'data', 'products.ts'), 'utf8');
const handleRegex = /handle:\s*"([^"]+)"/g;
const handles = [];
let m;
while ((m = handleRegex.exec(productsSrc)) !== null) {
  handles.push(m[1]);
}

const productRoutes = handles.map(h => ({
  loc: `/product/${h}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const allRoutes = [...staticRoutes, ...productRoutes];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map(r => `  <url>
    <loc>${BASE_URL}${r.loc}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(root, 'public', 'sitemap.xml'), sitemap, 'utf8');
console.log(`Sitemap generated with ${allRoutes.length} URLs (${handles.length} products)`);
