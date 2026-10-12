<script setup lang="ts">
import { plans } from "~~/shared/content";
</script>
<template>
  <div class="pricing-grid">
    <article
      v-for="plan in plans"
      :key="plan.name"
      :class="['price-card', 'reveal', { featured: plan.featured }]"
    >
      <div class="plan-heading">
        <span class="micro">{{ plan.label }}</span
        ><span v-if="plan.featured" class="mini-badge">ДЛЯ СЕБЯ</span>
      </div>
      <h3>{{ plan.name }}</h3>
      <p>{{ plan.description }}</p>
      <div class="price">{{ plan.price }}</div>
      <span class="price-period">{{ plan.period }}</span>
      <ul>
        <li v-for="item in plan.items" :key="item">
          <AppIcon name="check" :size="17" />{{ item }}
        </li>
      </ul>
      <TelegramButton
        :label="plan.cta"
        :variant="plan.featured ? 'primary' : 'secondary'"
      />
    </article>
  </div>
  <p class="pricing-note">
    Актуальные цены, доступность бесплатного подключения, лимиты и состав
    тарифов уточняйте в боте перед активацией.
  </p>
</template>
