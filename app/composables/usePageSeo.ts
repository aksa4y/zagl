export function usePageSeo(
  path: string,
  title: string,
  description: string,
  type: "website" | "article" = "website",
) {
  const config = useRuntimeConfig();
  const url = new URL(path, `${config.public.siteUrl}/`).href;
  useHead({ link: [{ rel: "canonical", href: url }] });
  return {
    title,
    description,
    ogTitle: `${title} · ZAGL VPN`,
    ogDescription: description,
    ogType: type,
    ogUrl: url,
    ogSiteName: "ZAGL VPN",
    ogLocale: "ru_RU",
    ogImage: `${config.public.siteUrl}/images/og-cover.jpg`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
    ogImageAlt: "ZAGL VPN — свобода быть онлайн",
    twitterCard: "summary_large_image" as const,
    twitterTitle: `${title} · ZAGL VPN`,
    twitterDescription: description,
    twitterImage: `${config.public.siteUrl}/images/og-cover.jpg`,
  };
}
