# Иллюстрации и шрифты

Hero создан встроенным imagegen для ZAGL. В проекте используются оптимизированные WebP 768/1536 и JPEG Open Graph 1200×630. Скриншоты референсов не включены в сайт.

Промпт: «Cinematic detailed 3D render of a mysterious armored cyber samurai bust in a wide conical black woven hat, face obscured by graphite face armor, hot magenta illuminated eye slits, textured carbon and metal, restrained neon edge illumination. Subject on right two thirds of landscape composition, almost black background, subtle smoky magenta halo and curved orbit. Left third black negative space. Premium luxury tech advertising. No text, logos, UI, weapons or watermark.»

Изображения: `public/images/hero-768.webp`, `public/images/hero-1536.webp`, `public/images/og-cover.jpg`.
Повторная оптимизация из исходного PNG: `node scripts/prepare-assets.mjs /absolute/path/hero.png`.

Локальные variable fonts Manrope и Unbounded подключены через Fontsource, только Latin и Cyrillic, с font-display: swap. Лицензии OFL распространяются в соответствующих npm-пакетах. Внешних запросов к Google Fonts нет.

Иконки интерфейса и логотип — SVG в исходниках, без внешнего icon CDN.
