<script setup lang="ts">
import { navigation } from "~~/shared/content";
</script>
<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top">
        <div>
          <BrandLogo />
          <p>Свобода быть онлайн.</p>
        </div>
        <nav aria-label="Навигация в подвале">
          <NuxtLink v-for="link in navigation" :key="link.to" :to="link.to">{{
            link.label
          }}</NuxtLink>
        </nav>
        <TelegramButton variant="secondary" label="На связи в Telegram" />
      </div>
      <div class="footer-bottom">
        <span>© {{ new Date().getFullYear() }} ZAGL</span
        ><span>Скорость и доступность зависят от вашей сети.</span
        ><a href="/llms.txt">Информация для AI</a>
      </div>
    </div>
  </footer>
</template>
