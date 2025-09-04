export default defineNuxtConfig({
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxt/fonts",
  ],
  runtimeConfig: {
    apiBaseUrl: "",
    public: {
      appVersion: "",
    },
  },
  colorMode: {
    preference: "light",
  },
  compatibilityDate: "2025-03-04",
});
