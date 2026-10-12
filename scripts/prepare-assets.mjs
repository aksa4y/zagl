import sharp from "sharp";
import { mkdir } from "node:fs/promises";
const input = process.argv[2];
if (!input)
  throw new Error(
    "Usage: node scripts/prepare-assets.mjs /absolute/path/to/hero.png",
  );
await mkdir("public/images", { recursive: true });
await Promise.all(
  [768, 1536].map((width) =>
    sharp(input)
      .resize({ width })
      .webp({ quality: 83, effort: 6 })
      .toFile(`public/images/hero-${width}.webp`),
  ),
);
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><linearGradient id="bg"><stop stop-color="#08080b"/><stop offset=".5" stop-color="#08080b" stop-opacity=".7"/><stop offset="1" stop-color="#08080b" stop-opacity="0"/></linearGradient></defs><rect width="1200" height="630" fill="url(#bg)"/><g font-family="DejaVu Sans,sans-serif" font-weight="bold"><text x="65" y="100" font-size="40" fill="#ff1675">ZAGL</text><text x="65" y="263" font-size="64" fill="white">ИНТЕРНЕТ.</text><text x="65" y="340" font-size="64" fill="white">БЕЗ ЛИШНИХ</text><text x="65" y="417" font-size="64" fill="#ff1675">ГРАНИЦ.</text><text x="65" y="548" font-size="23" font-weight="normal" fill="#c1b9c9">VPN для сетей с белыми списками</text></g></svg>`,
);
await sharp(input)
  .resize(1200, 630, { fit: "cover" })
  .composite([{ input: overlay }])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile("public/images/og-cover.jpg");
console.log("Generated responsive WebP assets and 1200×630 Open Graph JPEG.");
