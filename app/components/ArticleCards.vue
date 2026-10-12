<script setup lang="ts">
import { articles } from "~~/shared/content";
</script>
<template>
  <div class="article-grid">
    <NuxtLink
      v-for="(article, i) in articles"
      :key="article.slug"
      :to="`/blog/${article.slug}`"
      class="article-card reveal"
      ><div :class="['article-art', `art-${i}`]" aria-hidden="true">
        <AppIcon :name="article.icon" :size="74" /><span
          >0{{ i + 1 }} / ZAGL JOURNAL</span
        >
      </div>
      <div class="article-body">
        <p class="micro">
          {{ article.category }} <span>· {{ article.minutes }} МИН</span>
        </p>
        <h3>{{ article.title }}</h3>
        <p>{{ article.description }}</p>
        <span class="text-link">Читать статью <AppIcon :size="18" /></span></div
    ></NuxtLink>
  </div>
</template>
