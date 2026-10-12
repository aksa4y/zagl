<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/blog",
    "Блог: понятные инструкции о VPN",
    "Блог ZAGL: как работают белые списки, чем отличаются CIDR и SNI и как выбрать VPN-локацию для звонков, видео и работы.",
  ),
);
</script>
<template>
  <div>
    <PageIntro
      eyebrow="JOURNAL / ZAGL"
      title="Больше понимания."
      accent="Меньше сложностей."
      description="О сетях, ограничениях и свободе выбора. Объясняем технологии так, чтобы ими было проще пользоваться."
    />
    <section class="section compact container"><ArticleCards /></section>
    <section class="container seo-section">
      <h2>Практический блог о VPN</h2>
      <p>
        Здесь собраны инструкции по выбору VPN-локации, объяснения работы белых
        списков и сетевых технологий. Материалы помогают оценить возможности
        подключения и отличать особенности маршрута от проблем мобильного
        интернета.
      </p>
    </section>
    <JoinBanner />
  </div>
</template>
