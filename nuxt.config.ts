export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "dayjs-nuxt",
    "@nuxtjs/google-fonts",
  ],
  runtimeConfig: {
    apiBaseUrl: "",
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
});
