<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/pricing",
    "Тарифы VPN: Бесплатный, Про и Бизнес",
    "Выберите формат подключения ZAGL VPN: Бесплатный, Про или Бизнес. Актуальные цены, лимиты и условия доступны в Telegram-боте.",
  ),
);
</script>
<template>
  <div>
    <PageIntro
      eyebrow="ТАРИФЫ / ZAGL"
      title="Ваш интернет."
      accent="Ваши условия."
      description="Попробовать, подключить для себя или обсудить решение для команды. Выберите формат — актуальные условия откроются в боте."
    />
    <section class="container section compact"><PricingCards /></section>
    <section class="container pricing-explainer">
      <AppIcon name="shield" :size="35" />
      <div>
        <h2>Сначала проверьте подключение</h2>
        <p>
          В сетях с белыми списками доступ зависит от оператора и региона.
          Уточните в боте возможность теста и убедитесь, что выбранный профиль
          работает у вас. Период подписки, количество устройств, способы оплаты
          и возврата проверяйте до покупки.
        </p>
      </div>
    </section>
    <FaqSection /><JoinBanner />
  </div>
</template>
