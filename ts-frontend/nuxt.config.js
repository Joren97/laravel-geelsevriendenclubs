const axiosObject =
  process.env.NODE_ENV === 'production'
    ? {
        axios: {
          baseURL: 'https://budgetbase.ddns.net/geelsevriendenclubs_api/api/',
          progress: false,
        },
      }
    : {
        axios: {
          baseURL: 'http://localhost/laravel-geelsevriendenclubs-api/public',
          progress: false,
        },
      };

const routerObject =
  process.env.NODE_ENV === 'production'
    ? {
        router: {
          base: '/geelsevriendenclubs_app',
        },
      }
    : {};

export default {
  ...routerObject,
  ...axiosObject,
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=PT+Sans&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['@/assets/css/main.scss', '@/assets/css/spacing.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/filter.js',
    '@/plugins/globals.js',
    '@plugins/axios-accessor',
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/moment', '@nuxt/typescript-build'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'cookie-universal-nuxt',
    '@nuxtjs/svg',
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend() {},
  },
};
