# ZAGL VPN

Готовый сайт на **Nuxt 4 + Vue 3 + TypeScript + Tailwind CSS 4**, SSR/Nitro, статическая предгенерация публичных страниц и SEO-файлов. Тёмный адаптивный дизайн, малиновый неон, авторская hero-иллюстрация, локальные шрифты.

## Запуск

Нужен Node.js **24 LTS** (также поддерживается современный Node 22).

```bash
git clone https://github.com/aksa4y/zagl.git
cd zagl
cp .env.example .env
npm ci
npm run dev
```

Открыть `http://localhost:3000`. В PowerShell для копирования: `Copy-Item .env.example .env`.

## Проверка production

```bash
npm run typecheck
npm run build
npm run test:smoke
npm start
```

Smoke-тест сам запускает production-сервер на порту 3187, проверяет 9 страниц, HTML без исполнения JS, уникальные title, description, OG/Twitter, canonical, JSON-LD, Telegram referral, robots/sitemap/llms, внутренние ссылки, изображения и настоящие 404. После проверки завершает сервер. Основной сайт запускается `npm start` на 3000.

```bash
curl -fsS http://localhost:3000/robots.txt
curl -fsS http://localhost:3000/sitemap.xml
curl -fsS http://localhost:3000/llms.txt
curl -fsS http://localhost:3000/llms-full.txt
```

Все 4 файла создаются модулями во время сборки и доступны в `.output/public`. HTML страниц предгенерируется, Nitro SSR остаётся включён и обрабатывает остальные запросы и ошибки. Это SSR-capable hybrid, не SPA.

## Страницы

| URL | Назначение |
| --- | --- |
| `/` | Главная, преимущества, подключение, тарифы, FAQ и статьи |
| `/features` | CIDR, SNI, скорость, схема подключения |
| `/pricing` | Бесплатный, Про, Бизнес |
| `/servers` | Примеры направлений, фильтр регионов и поиск |
| `/blog` | Статьи |
| `/blog/vpn-white-lists` | Белые списки |
| `/blog/cidr-and-sni` | CIDR и SNI |
| `/blog/choose-vpn-location` | Выбор VPN-локации |
| `/contacts` | Связь через Telegram |

Все CTA подключения ведут на **https://t.me/VPNbyDPrincebot?start=refwCM5G6oz**.

## Настройка домена и SEO

Перед production-сборкой задайте **реальный домен** в `NUXT_SITE_URL`, например `https://vpn.example.com`. `https://zagl.vercel.app` — только исходное допущение, не подтверждённый домен. Пересоберите сайт после смены адреса: canonical, sitemap и AI-файлы создаются при билде. Смена переменной только у уже работающего Node-процесса не обновит предгенерированный HTML.

В `.env`:

```dotenv
NUXT_SITE_URL=https://vpn.example.com
NUXT_SITE_INDEXABLE=true
```

Для preview/staging: `NUXT_SITE_INDEXABLE=false` при сборке. Не публикуйте preview с production-индексацией. Production позволяет обход GPTBot, ClaudeBot, PerplexityBot и поисковым роботам. Разрешение обхода и техническая SEO-настройка не гарантируют индексацию или позиции.

`@nuxtjs/seo` подключает `@nuxtjs/sitemap`, `@nuxtjs/robots`, schema-org и SEO-utils. Они также явно зафиксированы в зависимостях; повторной регистрации нет. `nuxt-ai-ready` автоматически получает содержимое всех предгенерированных страниц, формирует `/llms.txt` и `/llms-full.txt`. Список динамических статей добавляется из `shared/content.ts`. OG-изображение общее, JPEG 1200×630; title, description, URL и тип Open Graph индивидуальны для каждой страницы. Генератор OG на сервере отключён, так как картинка уже подготовлена.

Schema.org: Organization, WebSite, Product на главной и Article на страницах статей. Неподтверждённых отзывов, рейтингов и коммерческих Offer в разметке нет.

## Автодеплой через GitHub Actions → Vercel

GitHub Pages не исполняет SSR-сервер, поэтому основной target — **Vercel**. `.github/workflows/ci.yml` запускает `npm ci`, typecheck, production build и smoke для каждого PR и push в main. Деплой идёт только после успешных проверок.

Однократная настройка владельцем:

1. Создать/импортировать проект `aksa4y/zagl` в Vercel, framework **Nuxt**, Node **24**.
2. Задать в Vercel production environment переменные `NUXT_SITE_URL` с реальным доменом и `NUXT_SITE_INDEXABLE=true`.
3. В GitHub → Settings → Secrets and variables → Actions добавить secrets `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Значения org/project видны в настройках Vercel либо `.vercel/project.json` после `vercel link`. Токены не коммитить.
4. Там же добавить repository variable `NUXT_SITE_URL` с тем же production-доменом.
5. Запустить Actions → **Check and deploy** → **Run workflow** либо сделать push в main.

Пока secrets/домен не заданы, CI выполняет проверки, а шаг деплоя пишет явное сообщение «Deployment not configured» в job summary. Он не заявляет об успешной публикации. `vercel.json` отключает отдельные Git-triggered Vercel deploy, чтобы публикация шла один раз и после проверок Actions. Для использования только встроенной Vercel Git Integration удалите `git.deploymentEnabled: false` и отключите deploy job в Actions.

Ручной Vercel deploy после настройки:

```bash
npx vercel@63.1.2 link
npx vercel@63.1.2 env pull .env.local
npx vercel@63.1.2 --prod
```

## VPS / PM2

```bash
npm ci
npm run build
PORT=3000 HOST=127.0.0.1 node .output/server/index.mjs
# или
pm2 start .output/server/index.mjs --name zagl
pm2 save
```

Передайте домен на build через `.env`, настройте reverse proxy и TLS на сервере. При обновлении: `git pull --ff-only`, `npm ci`, `npm run build`, `pm2 restart zagl --update-env`.

## Редактирование

- `shared/content.ts`: Telegram URL, меню, преимущества, тарифы, FAQ и статьи.
- `app/pages/servers.vue`: демонстрационные направления. Без API сервиса они не являются живым списком.
- `app/assets/css/main.css`: адаптивные стили и reduced-motion.
- `app/composables/usePageSeo.ts`: общая OG/Twitter-конфигурация; каждая страница вызывает `useSeoMeta()`.
- `nuxt.config.ts`: SSR, SEO, robots, sitemap, AI, prerender и headers.
- `public/images`: оптимизированные hero и OG.

### Что требует данных владельца

Цены платных тарифов, лимиты, реальные страны/города и SLA не были предоставлены. Вместо выдуманных цен сайт направляет в бот; примеры локаций явно обозначены. «50+» взято из задания, не из онлайн-мониторинга. Бесплатный тариф показан как 0 ₽ с обязательным уточнением доступности и лимитов. Нет выдуманного обещания 100% uptime, максимальной скорости, no-logs, круглосуточной поддержки или юридических реквизитов.

Этот репозиторий — публичный сайт сервиса, а не VPN-сервер, платёжная система или Telegram-бот. Подключение и покупка происходят в указанном боте.

## Производительность и доступность

- Eager/high-priority hero в responsive WebP, явные размеры; прочий визуал — CSS/SVG.
- Локальные Cyrillic/Latin variable fonts с `font-display: swap`.
- Предгенерированный HTML, route splitting, отсутствие сторонних виджетов, трекеров и тяжёлой UI-библиотеки.
- Нативный FAQ (`details`), клавиатурная навигация, skip-link, видимые focus, `aria-expanded`, `aria-pressed`, reduced motion.
- Контент виден без JS; hover и scroll effects не скрывают SSR-текст.

Числа Lighthouse/Core Web Vitals не заявлены без замеров на финальном домене. Браузерный QA в среде сборки не выполнен: подходящий браузерный инструмент недоступен. Проверены типы, production-сборка и HTTP/SEO smoke. Перед запуском рекомендуется проверить мобильное меню, фильтр и внешний вид на iOS/Android, а после публикации — PageSpeed Insights и панели вебмастеров.

## Commit / push

```bash
git add .
git commit -m "feat: build ZAGL VPN website with Nuxt 4 and SEO"
git push -u origin main
```

Все исходники и lockfile находятся в этом репозитории; `node_modules`, `.output`, `.nuxt`, `.env` и токены исключены из git.
