<script setup lang="ts">
import { telegramUrl } from "~~/shared/content";
withDefaults(
  defineProps<{ variant?: "primary" | "secondary"; label?: string }>(),
  { variant: "primary", label: "Перейти в Telegram" },
);
</script>
<template>
  <a
    :href="telegramUrl"
    target="_blank"
    rel="noopener noreferrer"
    :class="['button', `button-${variant}`]"
    ><span>{{ label }}</span
    ><AppIcon name="external" :size="19" /><span class="sr-only">
      (откроется в новой вкладке)</span
    ></a
  >
</template>
