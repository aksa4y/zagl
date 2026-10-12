<script setup lang="ts">
import { faqs } from "~~/shared/content";
</script>
<template>
  <section class="section container faq-section">
    <div>
      <p class="eyebrow"><span />БЕЗ СЛОЖНЫХ СЛОВ</p>
      <h2>Есть вопросы?<br /><span class="muted">Есть ответы.</span></h2>
      <p>А если не нашли свой —<br />напишите через Telegram-бота.</p>
    </div>
    <div class="faq-list">
      <details v-for="item in faqs" :key="item.question">
        <summary>{{ item.question }}<AppIcon name="plus" :size="20" /></summary>
        <p>{{ item.answer }}</p>
      </details>
    </div>
  </section>
</template>
