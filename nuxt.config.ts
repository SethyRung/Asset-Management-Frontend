export default defineNuxtConfig({
  devtools: { enabled: false },

  css: ["~/assets/css/main.css"],

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/google-fonts",
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

  googleFonts: {
    download: true,
    families: {
      "IBM Plex Sans": [100, 200, 300, 400, 500, 600, 700],
    },
  },

  compatibilityDate: "2025-03-04",
});
