<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/servers",
    "Серверы VPN и направления подключения",
    "География ZAGL VPN: 50+ локаций по данным сервиса. Как подобрать регион и проверить доступные серверы в Telegram-боте.",
  ),
);
const selected = ref("Все");
const search = ref("");
const regions = ["Все", "Европа", "Азия", "Америка"];
const locations = [
  { country: "Германия", city: "Франкфурт", code: "DE", region: "Европа" },
  { country: "Нидерланды", city: "Амстердам", code: "NL", region: "Европа" },
  { country: "Финляндия", city: "Хельсинки", code: "FI", region: "Европа" },
  { country: "Франция", city: "Париж", code: "FR", region: "Европа" },
  { country: "Сингапур", city: "Сингапур", code: "SG", region: "Азия" },
  { country: "Япония", city: "Токио", code: "JP", region: "Азия" },
  { country: "США", city: "Нью-Йорк", code: "US", region: "Америка" },
  { country: "Канада", city: "Торонто", code: "CA", region: "Америка" },
];
const filtered = computed(() =>
  locations.filter(
    (l) =>
      (selected.value === "Все" || selected.value === l.region) &&
      `${l.country} ${l.city} ${l.code}`
        .toLocaleLowerCase("ru")
        .includes(search.value.trim().toLocaleLowerCase("ru")),
  ),
);
</script>
<template>
  <div>
    <PageIntro
      eyebrow="ГЕОГРАФИЯ / ZAGL"
      title="Мир ближе,"
      accent="чем кажется."
      description="50+ локаций по данным сервиса. Выбирайте направление для комфортной задержки и нужных задач. Точный список доступен в Telegram."
    />
    <section class="container section compact">
      <div class="catalog-note">
        <AppIcon name="globe" />
        <p>
          <strong>Примеры направлений.</strong> Это обзор географии, а не
          онлайн-каталог серверов ZAGL. Наличие конкретной страны и города
          проверьте в боте.
        </p>
      </div>
      <div class="server-toolbar">
        <div class="filter-pills" aria-label="Регион">
          <button
            v-for="region in regions"
            :key="region"
            :aria-pressed="selected === region"
            :class="{ active: selected === region }"
            @click="selected = region"
          >
            {{ region }}
          </button>
        </div>
        <label class="search-field"
          ><AppIcon name="search" :size="19" /><span class="sr-only"
            >Поиск страны или города</span
          ><input v-model="search" type="search" placeholder="Страна или город"
        /></label>
      </div>
      <p class="sr-only" role="status">
        Найдено направлений: {{ filtered.length }}
      </p>
      <div class="server-grid">
        <article
          v-for="location in filtered"
          :key="location.code"
          class="server-card"
        >
          <span class="country-code">{{ location.code }}</span>
          <div>
            <h2>{{ location.country }}</h2>
            <p>{{ location.city }}</p>
          </div>
          <span class="server-region">{{ location.region }}</span>
        </article>
      </div>
      <div v-if="!filtered.length" class="empty-state">
        <h2>Такого направления в примерах нет</h2>
        <p>
          Попробуйте другой запрос или посмотрите актуальные локации в боте.
        </p>
        <button
          class="button button-secondary"
          @click="
            search = '';
            selected = 'Все';
          "
        >
          Сбросить фильтры
        </button>
      </div>
    </section>
    <section class="section container prose-block">
      <h2>Как выбрать VPN-сервер</h2>
      <p>
        Начните с ближайшего направления и проверьте приложение, для которого
        нужен VPN. Близость сервера часто уменьшает задержку, но качество
        маршрута зависит от оператора. Если соединение нестабильно, сравните
        несколько доступных профилей.
      </p>
      <p>
        Для мобильных сетей с белыми списками сначала важна доступность входного
        адреса. Получите подходящий профиль в боте, затем выбирайте направление
        из доступных вариантов.
      </p>
      <NuxtLink to="/blog/choose-vpn-location" class="text-link"
        >Подробная инструкция <AppIcon
      /></NuxtLink>
    </section>
    <JoinBanner />
  </div>
</template>
