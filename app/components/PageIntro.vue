<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
}>();
</script>
<template>
  <section class="page-intro container">
    <p class="eyebrow"><span />{{ eyebrow }}</p>
    <h1>
      {{ title }}<br v-if="accent" /><span v-if="accent" class="pink">{{
        accent
      }}</span>
    </h1>
    <p class="lead">{{ description }}</p>
  </section>
</template>
