module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [{
      charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/main.css'],
  /*
   ** Add axios globally
   */
  build: {
    vendor: [
      'axios',
      'lumavate-toolbar'
    ],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  router: {
    base: '/ic/vue/',
    middleware: 'auth'
  },
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  plugins: [
    '~/plugins/app-initialize',
    { ssr: false, src: '~/plugins/custom-elements' }
  ]
}
