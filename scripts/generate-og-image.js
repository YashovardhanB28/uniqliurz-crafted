import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function generateOgImage() {
  const logoPath = path.join(root, 'public', 'logo.png');
  const outputPath = path.join(root, 'public', 'og-image.png');

  const width = 1200;
  const height = 630;

  const svgText = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a"/>
          <stop offset="100%" style="stop-color:#121212"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#D94F16"/>
          <stop offset="100%" style="stop-color:#FF7A2F"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <rect x="0" y="0" width="6" height="${height}" fill="url(#accent)"/>
      <text x="80" y="240" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="bold" fill="#ffffff" letter-spacing="4">UNIQLIURZ</text>
      <text x="80" y="310" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#a0a0a0" letter-spacing="2">Custom Gifts &amp; Keepsakes</text>
      <text x="80" y="380" font-family="Arial, Helvetica, sans-serif" font-size="18" fill="#707070" letter-spacing="1">Handcrafted in New Jersey, USA</text>
      <rect x="80" y="450" width="200" height="3" rx="1.5" fill="url(#accent)"/>
      <text x="80" y="500" font-family="Arial, Helvetica, sans-serif" font-size="14" fill="#555555" letter-spacing="2">www.uniqliurz.com</text>
    </svg>
  `;

  const svgBuffer = Buffer.from(svgText);

  try {
    await sharp(svgBuffer)
      .resize(width, height)
      .png()
      .toFile(outputPath);
    console.log('OG image generated:', outputPath);
  } catch (err) {
    console.error('Failed to generate OG image with SVG, trying fallback...');
    // Fallback: just resize the logo as a square on dark background
    try {
      const logoBuffer = await sharp(logoPath)
        .resize(400, 400, { fit: 'inside' })
        .toBuffer();

      const compositeImage = await sharp({
        create: {
          width,
          height,
          channels: 4,
          background: { r: 18, g: 18, b: 18, alpha: 1 },
        },
      })
        .composite([
          {
            input: logoBuffer,
            top: Math.floor((height - 400) / 2),
            left: Math.floor((width - 400) / 2),
          },
        ])
        .png()
        .toFile(outputPath);

      console.log('Fallback OG image generated:', outputPath);
    } catch (fallbackErr) {
      console.error('Fallback also failed:', fallbackErr);
    }
  }
}

generateOgImage();
