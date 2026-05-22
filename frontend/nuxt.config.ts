// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3000,
    host: '0.0.0.0',
  },
  runtimeConfig: {
    public: {
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
      strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337'
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/google-fonts',
    'vue3-carousel-nuxt',
    'nuxt-icons'
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  colorMode: {
    // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storage: 'localStorage', // or 'sessionStorage' or 'cookie'
    storageKey: 'nuxt-color-mode'
  },
  googleFonts: {
    display: 'swap',
    families: {
      'Dancing Script': [400, 700],
      Poppins: [300, 400, 600, 700],
      Pacifico:[400],
      'Alex+Brush':[400],
      'Playfair+Display': [400, 700],
      Lora: [400, 700]
    }
  },
  image: {
    domains: ['localhost', 'localhost:1337']
  },
  carousel: {
    prefix: 'MyPrefix'
  },
  icon: {
    componentName:'NuxtIcon',
    customCollections: [
      {
        prefix: 'my-icon',
        dir: './assets/my-icons'
      },
    ],
  },
})
