export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | undefined;
  function observe() {
    observer?.disconnect();
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
      },
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer?.observe(el));
  }
  nuxtApp.hook("page:finish", observe);
  nuxtApp.hook("app:mounted", observe);
});
