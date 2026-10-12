<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{ error: NuxtError }>();
useSeoMeta({
  title: "Страница не найдена · ZAGL",
  robots: "noindex, nofollow",
});
</script>
<template>
  <div class="error-page container">
    <BrandLogo />
    <p class="eyebrow">{{ error.statusCode }}</p>
    <h1>
      {{
        error.statusCode === 404
          ? "Маршрут не найден."
          : "Не удалось открыть страницу."
      }}
    </h1>
    <p>Вернитесь на главную и выберите другое направление.</p>
    <a href="/" class="button button-primary">На главную <AppIcon /></a>
  </div>
</template>
