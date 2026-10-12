import tailwindcss from "@tailwindcss/vite";
import { pageRoutes } from "./shared/content";

const siteUrl = (
  process.env.NUXT_SITE_URL || "https://zagl.vercel.app"
).replace(/\/$/, "");
const indexable = process.env.NUXT_SITE_INDEXABLE !== "false";

export default defineNuxtConfig({
  compatibilityDate: "2026-10-01",
  ssr: true,
  devtools: { enabled: false },
  modules: ["@nuxtjs/seo", "nuxt-ai-ready"],
  css: ["~/assets/css/main.css"],
  vite: { plugins: [tailwindcss()] },
  typescript: { strict: true },
  site: {
    url: siteUrl,
    name: "ZAGL VPN",
    description: "VPN для сетей с белыми списками. Свобода быть онлайн.",
    defaultLocale: "ru",
    indexable,
  },
  runtimeConfig: { public: { siteUrl } },
  app: {
    head: {
      htmlAttrs: { lang: "ru" },
      meta: [
        { name: "theme-color", content: "#08080b" },
        { name: "color-scheme", content: "dark" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
    },
  },
  // @nuxtjs/seo registers sitemap, robots, schema-org and seo-utils once.
  robots: {
    groups: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "OAI-SearchBot",
          "ChatGPT-User",
        ],
        allow: "/",
      },
    ],
    sitemap: [`${siteUrl}/sitemap.xml`],
    blockAiBots: false,
    credits: false,
  },
  sitemap: { urls: pageRoutes, exclude: ["/404", "/200"], credits: false },
  // Share cards are prebuilt JPEG assets: no image renderer in production.
  ogImage: { enabled: false },
  schemaOrg: {
    identity: {
      type: "Organization",
      name: "ZAGL",
      url: siteUrl,
      logo: `${siteUrl}/logo.svg`,
    },
  },
  aiReady: {
    database: false,
    contentNegotiation: false,
    contentSignal: false,
    webmcp: false,
    mcp: { tools: false, resources: false },
    llmsTxt: {
      notes: [
        "ZAGL — VPN-сервис. Актуальные цены, лимиты и доступность локаций уточняются в Telegram-боте.",
        "Работа в сетях с белыми списками зависит от оператора, региона и текущей фильтрации. Примеры городов не являются live-каталогом.",
      ],
    },
  },
  nitro: {
    compressPublicAssets: true,
    prerender: {
      routes: [...pageRoutes, "/robots.txt", "/sitemap.xml"],
      crawlLinks: true,
      failOnError: true,
    },
  },
  routeRules: {
    "/**": {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "X-Frame-Options": "SAMEORIGIN",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
    "/images/**": { headers: { "Cache-Control": "public, max-age=86400" } },
    "/_nuxt/**": {
      headers: { "Cache-Control": "public, max-age=31536000, immutable" },
    },
  },
});
