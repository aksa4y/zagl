<script setup lang="ts">
import { features } from "~~/shared/content";
</script>
<template>
  <div class="feature-grid">
    <article
      v-for="feature in features"
      :key="feature.tag"
      class="feature-card reveal"
    >
      <div class="card-top">
        <AppIcon :name="feature.icon" :size="28" /><span>{{
          feature.tag
        }}</span>
      </div>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.text }}</p>
      <p class="fineprint">{{ feature.detail }}</p>
    </article>
  </div>
</template>
