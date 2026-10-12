<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/contacts",
    "Контакты и помощь с подключением",
    "Связаться с ZAGL через Telegram-бота: помощь с подключением VPN, актуальные тарифы и запрос на подключение команды.",
  ),
);
</script>
<template>
  <div>
    <PageIntro
      eyebrow="КОНТАКТЫ / ZAGL"
      title="На связи."
      accent="В Telegram."
      description="Подключение, тарифы и вопросы о сервисе — в одном месте. Откройте бота и выберите нужный раздел."
    />
    <section class="container contact-grid">
      <div class="contact-primary">
        <div class="telegram-orb"><AppIcon name="telegram" :size="50" /></div>
        <p class="eyebrow">ОСНОВНОЙ КАНАЛ СВЯЗИ</p>
        <h2>Начните с сообщения.</h2>
        <p>
          Запустите бота, чтобы получить инструкцию или найти раздел помощи.
        </p>
        <TelegramButton label="Перейти в Telegram" /><span class="fineprint"
          >@VPNbyDPrincebot</span
        >
      </div>
      <div class="contact-help">
        <article>
          <AppIcon name="route" />
          <h2>Не подключается?</h2>
          <p>
            Укажите устройство, версию клиента, оператора и регион. Добавьте
            текст ошибки. Не отправляйте пароли, приватные ключи или платёжные
            данные.
          </p>
        </article>
        <article>
          <AppIcon name="monitor" />
          <h2>Нужно для команды?</h2>
          <p>
            Опишите количество устройств и задачи. Условия бизнес-подключения
            согласовываются индивидуально через бота.
          </p>
        </article>
      </div>
    </section>
    <section class="section container prose-block">
      <h2>Помощь с ZAGL VPN</h2>
      <p>
        Если VPN не подключается в мобильной сети, проверьте передачу данных,
        актуальность профиля и версию приложения. Для сетей с белыми списками
        может потребоваться отдельная конфигурация. Инструкции и способы
        обращения к поддержке находятся в Telegram-боте.
      </p>
      <p>
        Сайт не принимает оплату и не запрашивает персональные данные через
        формы. Активация и условия использования предоставляются на стороне
        сервиса в Telegram.
      </p>
    </section>
    <FaqSection />
  </div>
</template>
