<script setup lang="ts">
withDefaults(defineProps<{ name?: string; size?: number }>(), {
  name: "arrow",
  size: 24,
});
const paths: Record<string, string> = {
  arrow: "M5 12h14m-6-6 6 6-6 6",
  external: "M7 17 17 7M7 7h10v10",
  shield: "M12 3 3.5 6.5V12c0 5 8.5 9 8.5 9s8.5-4 8.5-9V6.5L12 3Zm-4 9 3 3 5-6",
  bolt: "m13 2-9 12h7l-1 8 10-13h-8l1-7Z",
  route:
    "M5 5h6a4 4 0 0 1 0 8H9a4 4 0 0 0 0 8h10M3 3l4 4m0-4L3 7m14 12 2 2 2-2",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3c4 5 4 13 0 18-4-5-4-13 0-18Z",
  check: "m5 12 4 4L19 6",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "m6 6 12 12M6 18 18 6",
  telegram: "m21 3-4 18-6-5-4 3v-6L21 3 3 10l4 3 10-6-6 9",
  monitor: "M3 4h18v13H3V4Zm5 17h8m-4-4v4",
  lock: "M5 10h14v11H5V10Zm3 0V6a4 4 0 0 1 8 0v4m-4 4v3",
  plus: "M12 5v14M5 12h14",
  search: "M16 16l5 5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
};
</script>
<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name] || paths.arrow" />
  </svg>
</template>
