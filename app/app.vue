<script setup lang="ts">
const config = useRuntimeConfig();
useHead({ htmlAttrs: { lang: "ru" }, titleTemplate: "%s · ZAGL VPN" });
useSchemaOrg([
  defineOrganization({
    name: "ZAGL",
    url: config.public.siteUrl,
    logo: `${config.public.siteUrl}/logo.svg`,
  }),
  defineWebSite({
    name: "ZAGL VPN",
    url: config.public.siteUrl,
    inLanguage: "ru-RU",
  }),
]);
</script>
<template>
  <a href="#main-content" class="skip-link">Перейти к содержимому</a
  ><SiteHeader />
  <main id="main-content" tabindex="-1"><NuxtPage /></main>
  <SiteFooter />
</template>
