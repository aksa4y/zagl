<script setup lang="ts">
import { navigation } from "~~/shared/content";
const open = ref(false);
const route = useRoute();
watch(
  () => route.path,
  () => {
    open.value = false;
  },
);
</script>
<template>
  <header class="site-header" @keydown.esc="open = false">
    <div class="container header-inner">
      <BrandLogo />
      <nav class="desktop-nav" aria-label="Основная навигация">
        <NuxtLink v-for="link in navigation" :key="link.to" :to="link.to">{{
          link.label
        }}</NuxtLink>
      </nav>
      <TelegramButton
        class="header-cta"
        label="Перейти"
        variant="secondary"
      /><button
        class="menu-toggle"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
        @click="open = !open"
      >
        <AppIcon :name="open ? 'close' : 'menu'" />
      </button>
    </div>
    <nav
      v-if="open"
      id="mobile-nav"
      class="mobile-nav container"
      aria-label="Мобильная навигация"
    >
      <NuxtLink v-for="link in navigation" :key="link.to" :to="link.to">{{
        link.label
      }}</NuxtLink
      ><TelegramButton label="Перейти в Telegram" />
    </nav>
  </header>
</template>
