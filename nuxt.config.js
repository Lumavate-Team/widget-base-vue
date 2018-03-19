const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Vue Base Widget',
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
        content: 'Vue Base Widget'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }, {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
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
    plugins: [
      new CopyWebpackPlugin([
        { from: './node_modules/lumavate-toolbar/dist/lumavate-toolbar/lumavate-toolbar.v28iu0po.js', to: 'lumavate-toolbar/lumavate-toolbar.v28iu0po.js' },
        { from: './node_modules/lumavate-toolbar/dist/lumavate-toolbar/xokbryfm.js', to: 'lumavate-toolbar/xokbryfm.js' }
      ])
    ],
    vendor: [
      'axios',
      'lumavate-toolbar'
    ],
    /*
     ** Run ESLINT on save
     */
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.output.publicPath = '_nuxt/'
      }

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
  env: {
    widgetBaseUrl: process.env.WIDGET_URL_PREFIX
  },
  router: {
    base: process.env.WIDGET_URL_PREFIX,
    middleware: 'auth'
  },
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt'
  ],
  plugins: [
    '~/plugins/app-initialize'
  ]
}
