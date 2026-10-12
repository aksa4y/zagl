<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/features",
    "Возможности VPN: белые списки, CIDR и SNI",
    "Как работает ZAGL VPN: российские IP, профили для белых списков, CIDR, SNI-маскировка и выбор из 50+ локаций.",
  ),
);
</script>
<template>
  <div>
    <PageIntro
      eyebrow="ВОЗМОЖНОСТИ / ZAGL"
      title="Сложные технологии."
      accent="Простое подключение."
      description="Продуманный маршрут к привычному интернету. Разбираем, что стоит за подключением ZAGL и что влияет на его работу."
    />
    <section class="container section compact"><FeatureGrid /></section>
    <section class="container protocol-section">
      <div>
        <p class="eyebrow"><span />ЧТО ПРОИСХОДИТ ВНУТРИ</p>
        <h2>
          От вашего устройства<br />до нужного
          <span class="pink">сервиса.</span>
        </h2>
      </div>
      <div class="protocol-flow">
        <div>
          <AppIcon name="monitor" /><strong>Ваше устройство</strong
          ><span>Совместимый VPN-клиент</span>
        </div>
        <AppIcon />
        <div>
          <AppIcon name="shield" /><strong>Входной маршрут</strong
          ><span>Российский IP · CIDR · SNI</span>
        </div>
        <AppIcon />
        <div>
          <AppIcon name="globe" /><strong>Выбранная локация</strong
          ><span>Доступ к внешней сети</span>
        </div>
      </div>
      <p class="fineprint">
        Упрощённая схема. Параметры конкретного профиля определяются
        конфигурацией сервиса.
      </p>
    </section>
    <section class="section container prose-block">
      <h2>Скорость — это не только мегабиты</h2>
      <p>
        Для звонков важны задержка и стабильность, для загрузок — пропускная
        способность. Выбирайте доступную локацию, сравнивайте результат в своей
        сети и держите запасной маршрут. ZAGL предоставляет направления
        подключения; фактическая скорость зависит также от вашего оператора и
        устройства.
      </p>
      <h2>Что дают российские IP и SNI-маскировка</h2>
      <p>
        Российский IP в разрешённом диапазоне может оставаться доступным в сети
        с белыми списками. Параметры SNI помогают адаптировать соединение к
        фильтрации по имени хоста. Дополнительные проверки оператора могут
        повлиять на результат, поэтому профиль стоит проверять на месте.
      </p>
    </section>
    <FaqSection /><JoinBanner />
  </div>
</template>
