<script setup lang="ts">
import { articles } from "~~/shared/content";
const route = useRoute();
const article = articles.find((item) => item.slug === route.params.slug);
if (!article)
  throw createError({ statusCode: 404, statusMessage: "Статья не найдена" });
useSeoMeta({
  ...usePageSeo(
    `/blog/${article.slug}`,
    article.title,
    article.description,
    "article",
  ),
  articlePublishedTime: `${article.date}T09:00:00+03:00`,
  articleModifiedTime: `${article.date}T09:00:00+03:00`,
});
useSchemaOrg([
  defineArticle({
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: { "@type": "Organization", name: "Редакция ZAGL" },
  }),
]);
</script>
<template>
  <article v-if="article" class="article-page container">
    <nav class="breadcrumbs" aria-label="Хлебные крошки">
      <NuxtLink to="/">Главная</NuxtLink><span>/</span
      ><NuxtLink to="/blog">Блог</NuxtLink><span>/</span><span>Статья</span>
    </nav>
    <p class="eyebrow"><span />{{ article.category }}</p>
    <h1>{{ article.title }}</h1>
    <p class="article-lead">{{ article.description }}</p>
    <div class="article-meta">
      <span>Редакция ZAGL</span
      ><time :datetime="article.date">12 октября 2026</time
      ><span>{{ article.minutes }} мин чтения</span>
    </div>
    <div class="article-content-layout">
      <aside>
        <p class="micro">В ЭТОЙ СТАТЬЕ</p>
        <a
          v-for="(section, index) in article.sections"
          :key="section.title"
          :href="`#part-${index}`"
          >{{ section.title }}</a
        >
      </aside>
      <div class="article-prose">
        <section
          v-for="(section, index) in article.sections"
          :id="`part-${index}`"
          :key="section.title"
        >
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">
            {{ paragraph }}
          </p>
        </section>
        <div class="article-cta">
          <h2>Проверьте подключение ZAGL</h2>
          <p>Актуальные профили, условия и помощь — в Telegram-боте.</p>
          <TelegramButton />
        </div>
        <NuxtLink to="/blog" class="text-link">← Все статьи</NuxtLink>
      </div>
    </div>
  </article>
</template>
