<script setup lang="ts">
useSeoMeta(
  usePageSeo(
    "/",
    "VPN для белых списков — свобода быть онлайн",
    "ZAGL VPN: подключение в сетях с белыми списками, российские IP, CIDR и SNI-маскировка. 50+ локаций. Тарифы и подключение в Telegram.",
  ),
);
const config = useRuntimeConfig();
useSchemaOrg([
  {
    "@type": "Product",
    name: "ZAGL VPN",
    description:
      "VPN-сервис с профилями для сетей с белыми списками, CIDR и SNI-маскировкой.",
    image: `${config.public.siteUrl}/images/og-cover.jpg`,
    brand: { "@type": "Brand", name: "ZAGL" },
    category: "VPN service",
  },
]);
</script>
<template>
  <div>
    <section class="hero container">
      <div class="hero-art" aria-hidden="true">
        <picture
          ><source
            type="image/webp"
            srcset="/images/hero-768.webp 768w, /images/hero-1536.webp 1536w"
            sizes="(max-width: 700px) 100vw, 75vw" />
          <img
            src="/images/hero-1536.webp"
            alt=""
            width="1536"
            height="1024"
            fetchpriority="high"
            loading="eager"
        /></picture>
      </div>
      <div class="hero-side-label" aria-hidden="true">
        СВОБОДА / СКОРОСТЬ / ZAGL
      </div>
      <div class="hero-copy">
        <p class="status-badge"><span />Работает в белых списках</p>
        <h1>
          ИНТЕРНЕТ.<br />БЕЗ ЛИШНИХ<br /><span class="pink">ГРАНИЦ.</span>
        </h1>
        <p class="hero-description">
          Ваш маршрут в открытый интернет.<br />VPN с российскими IP, CIDR и
          SNI-маскировкой — для сетей, где обычного подключения мало.
        </p>
        <div class="hero-actions">
          <TelegramButton label="Перейти в Telegram" /><NuxtLink
            to="/features"
            class="button button-quiet"
            >Как это работает <AppIcon :size="18"
          /></NuxtLink>
        </div>
        <div class="hero-platforms">
          <AppIcon name="monitor" :size="17" /><span
            >iOS · Android · Windows · macOS · Linux</span
          >
        </div>
      </div>
      <div class="floating-card float-tech">
        <AppIcon name="shield" :size="25" />
        <div>
          <strong>CIDR + SNI</strong><span>Технологии подключения</span>
        </div>
      </div>
      <div class="floating-card float-locations">
        <AppIcon name="globe" :size="25" />
        <div><strong>50+</strong><span>локаций по данным сервиса</span></div>
      </div>
      <div class="hero-bottom">
        <a href="#freedom" class="scroll-link"><span>↓</span> ЛИСТАЙТЕ ВНИЗ</a
        ><span>СВОЙ ПУТЬ. СВОЙ ИНТЕРНЕТ.</span>
      </div>
    </section>
    <div class="container">
      <div class="benefit-strip">
        <div>
          <AppIcon name="shield" /><span
            >Белые списки<small>Специальные профили</small></span
          >
        </div>
        <div>
          <AppIcon name="bolt" /><span
            >Быстрый маршрут<small>Для ваших задач</small></span
          >
        </div>
        <div>
          <AppIcon name="globe" /><span
            >50+ локаций<small>Свобода выбора</small></span
          >
        </div>
        <div>
          <AppIcon name="telegram" /><span
            >Старт в Telegram<small>Всё в одном боте</small></span
          >
        </div>
      </div>
    </div>
    <section id="freedom" class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span />СВЯЗЬ БЕЗ ЛИШНИХ ПРЕГРАД</p>
          <h2>
            Не ограничивайте<br /><span class="muted">свой интернет.</span>
          </h2>
        </div>
        <p>
          Когда привычные маршруты недоступны,<br />ZAGL помогает найти другой
          путь.<br />Для работы, общения и всего важного.
        </p>
      </div>
      <FeatureGrid />
    </section>
    <section class="how-section">
      <div class="container how-grid">
        <div>
          <p class="eyebrow"><span />ПРОСТО ПОДКЛЮЧИТЬ</p>
          <h2>Три шага.<br /><span class="pink">И вы на связи.</span></h2>
          <p>Без кабинетов, лишних форм<br />и потерянных паролей.</p>
          <TelegramButton label="Начать подключение" />
        </div>
        <ol class="steps">
          <li>
            <span>01</span>
            <div>
              <h3>Откройте бота</h3>
              <p>Перейдите в Telegram и нажмите «Запустить».</p>
            </div>
            <AppIcon name="telegram" />
          </li>
          <li>
            <span>02</span>
            <div>
              <h3>Выберите подключение</h3>
              <p>
                Посмотрите тарифы и получите инструкцию для своего устройства.
              </p>
            </div>
            <AppIcon name="route" />
          </li>
          <li>
            <span>03</span>
            <div>
              <h3>Проверьте свою сеть</h3>
              <p>Добавьте профиль в совместимый клиент и подключитесь.</p>
            </div>
            <AppIcon name="shield" />
          </li>
        </ol>
      </div>
    </section>
    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span />ВАШ РИТМ. ВАШ ТАРИФ.</p>
          <h2>
            Начните с малого.<br /><span class="muted">Выберите своё.</span>
          </h2>
        </div>
        <NuxtLink to="/pricing" class="text-link"
          >Все тарифы <AppIcon
        /></NuxtLink>
      </div>
      <PricingCards />
    </section>
    <section class="network-section container">
      <div class="network-visual" aria-hidden="true">
        <div class="orbit orbit-one" />
        <div class="orbit orbit-two" />
        <div class="orbit orbit-three" />
        <div class="network-core"><AppIcon name="globe" :size="100" /></div>
        <span class="network-node node-one">EUROPE</span
        ><span class="network-node node-two">ASIA</span
        ><span class="network-node node-three">AMERICA</span>
      </div>
      <div>
        <p class="eyebrow"><span />БЛИЖЕ К НУЖНОМУ</p>
        <h2>Один сервис.<br /><span class="pink">Много направлений.</span></h2>
        <p>
          Выбирайте локацию под задачу. Сравнивайте задержку, переключайте
          маршрут и находите комфортное соединение.
        </p>
        <NuxtLink to="/servers" class="button button-secondary"
          >Посмотреть локации <AppIcon name="external" :size="19"
        /></NuxtLink>
        <p class="fineprint">Актуальный каталог и доступность — в боте.</p>
      </div>
    </section>
    <FaqSection />
    <section class="section container">
      <div class="section-heading">
        <div>
          <p class="eyebrow"><span />ZAGL JOURNAL</p>
          <h2>Разбираемся <span class="muted">вместе.</span></h2>
        </div>
        <NuxtLink to="/blog" class="text-link">Весь блог <AppIcon /></NuxtLink>
      </div>
      <ArticleCards />
    </section>
    <section class="container seo-section">
      <h2>ZAGL — VPN для мобильного интернета и сетей с белыми списками</h2>
      <p>
        Белые списки меняют привычный доступ к сети: часть адресов остаётся
        доступной, а другие соединения блокируются. ZAGL использует российские
        IP, работу с диапазонами CIDR и SNI-маскировку в специальных профилях
        подключения. Вы можете подобрать VPN-локацию для работы, видеосвязи и
        повседневных задач.
      </p>
      <p>
        Доступность VPN зависит от оператора, региона и текущих ограничений. При
        полном отключении мобильной передачи данных VPN не восстановит связь.
        Проверьте подключение в своей сети; актуальные условия и инструкции
        доступны в Telegram-боте.
      </p>
    </section>
    <JoinBanner />
  </div>
</template>
