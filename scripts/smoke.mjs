import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

// Probe the real production server. No dev-mode SEO behavior or SPA fallback.
const port = process.env.SMOKE_PORT || "3187";
const origin = `http://127.0.0.1:${port}`;
const site = (process.env.NUXT_SITE_URL || "https://zagl.vercel.app").replace(
  /\/$/,
  "",
);
const content = await readFile(
  new URL("../shared/content.ts", import.meta.url),
  "utf8",
);
const slugs = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)].map(
  (match) => match[1],
);
assert.ok(
  slugs.length > 0,
  "Article routes must be discovered for smoke checks",
);
const routes = [
  "/",
  "/features",
  "/pricing",
  "/servers",
  "/blog",
  "/contacts",
  ...slugs.map((slug) => `/blog/${slug}`),
];
const server = spawn(process.execPath, [".output/server/index.mjs"], {
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: port,
    HOST: "127.0.0.1",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let logs = "";
server.stdout.on("data", (data) => {
  logs += data;
});
server.stderr.on("data", (data) => {
  logs += data;
});
const titles = new Set();
const decode = (text) => text.replaceAll("&amp;", "&");
async function get(path) {
  const response = await fetch(`${origin}${path}`, {
    redirect: "manual",
    signal: AbortSignal.timeout(15000),
  });
  assert.equal(response.status, 200, `${path}: HTTP ${response.status}`);
  return { response, body: await response.text() };
}
try {
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(`Server stopped: ${logs}`);
    try {
      await get("/");
      ready = true;
      break;
    } catch {
      await delay(200);
    }
  }
  assert.ok(ready, `Server did not start: ${logs}`);
  const internalLinks = new Set();
  for (const path of routes) {
    const { body } = await get(path);
    const head = body.split("</head>")[0];
    assert.equal(
      (body.match(/<h1(?:\s|>)/g) || []).length,
      1,
      `${path}: exactly one SSR h1`,
    );
    assert.match(body, /<html[^>]+lang="ru"/, `${path}: language`);
    const title = head.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${path}: title`);
    assert.ok(!titles.has(title), `${path}: duplicate title`);
    titles.add(title);
    assert.match(
      head,
      /name="description" content=".{40,}"/,
      `${path}: description`,
    );
    assert.match(head, /property="og:title"/, `${path}: Open Graph`);
    assert.match(
      head,
      /name="twitter:card" content="summary_large_image"/,
      `${path}: Twitter Card`,
    );
    assert.match(
      head,
      /property="og:image"[^>]+og-cover\.jpg/,
      `${path}: OG image`,
    );
    const canonicals = [
      ...head.matchAll(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g),
    ];
    assert.equal(canonicals.length, 1, `${path}: exactly one canonical`);
    assert.equal(
      decode(canonicals[0][1]).replace(/\/$/, ""),
      `${site}${path}`.replace(/\/$/, ""),
      `${path}: canonical origin`,
    );
    assert.doesNotMatch(
      head,
      /content="noindex/,
      `${path}: production indexability`,
    );
    assert.ok(
      body.includes("https://t.me/VPNbyDPrincebot?start=refwCM5G6oz"),
      `${path}: referral CTA`,
    );
    const schema = [
      ...body.matchAll(
        /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
      ),
    ].map((match) => JSON.parse(match[1]));
    assert.ok(schema.length, `${path}: JSON-LD`);
    if (path === "/")
      for (const type of ["Organization", "WebSite", "Product"])
        assert.ok(
          JSON.stringify(schema).includes(`"${type}"`),
          `Missing schema ${type}`,
        );
    for (const match of body.matchAll(/href="(\/[^"#?]*)/g))
      if (!match[1].startsWith("/_nuxt/")) internalLinks.add(decode(match[1]));
    console.log(`✓ SSR + metadata + canonical + schema: ${path}`);
  }
  const { body: robots } = await get("/robots.txt");
  assert.doesNotMatch(robots, /Disallow:\s*\/\s*(?:\r?\n|$)/);
  for (const bot of ["GPTBot", "ClaudeBot", "PerplexityBot"])
    assert.ok(robots.includes(`User-agent: ${bot}`), `Missing ${bot}`);
  assert.ok(robots.includes(`${site}/sitemap.xml`), "robots sitemap origin");
  const { body: sitemap } = await get("/sitemap.xml");
  for (const path of routes)
    assert.ok(
      sitemap.includes(`<loc>${site}${path === "/" ? "/" : path}</loc>`) ||
        (path === "/" && sitemap.includes(`<loc>${site}</loc>`)),
      `Sitemap missing ${path}`,
    );
  for (const path of ["/llms.txt", "/llms-full.txt"]) {
    const { response, body } = await get(path);
    assert.match(response.headers.get("content-type") || "", /text\//);
    assert.ok(
      body.includes("ZAGL") && body.length > 200,
      `${path}: populated content`,
    );
    assert.doesNotMatch(body, /<!DOCTYPE html>/i);
    if (path === "/llms-full.txt")
      for (const slug of slugs)
        assert.ok(body.includes(slug), `Full text missing ${slug}`);
    console.log(`✓ AI file: ${path} (${Buffer.byteLength(body)} bytes)`);
  }
  for (const path of internalLinks) await get(path);
  for (const path of [
    "/images/hero-768.webp",
    "/images/hero-1536.webp",
    "/images/og-cover.jpg",
    "/favicon.svg",
  ]) {
    const response = await fetch(`${origin}${path}`);
    assert.equal(response.status, 200, `Asset missing ${path}`);
    assert.match(response.headers.get("content-type") || "", /image\//);
    await response.arrayBuffer();
  }
  for (const path of [
    "/this-page-does-not-exist",
    "/blog/this-article-does-not-exist",
  ]) {
    const response = await fetch(`${origin}${path}`, {
      headers: { accept: "text/html" },
    });
    assert.equal(response.status, 404, `${path}: real 404 required`);
    assert.match(await response.text(), /noindex/);
  }
  console.log(
    `✓ robots.txt, sitemap.xml, ${internalLinks.size} internal links, assets and real 404 responses`,
  );
  console.log("All production smoke checks passed.");
} catch (error) {
  console.error(logs);
  throw error;
} finally {
  server.kill("SIGTERM");
}
