const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'Vue Base Widget',
		meta: [
      {
        charset: 'utf-8'
      },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        name: 'theme-color',
        content: '#ffffff'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Vue Base Widget'
      },
      {
        name: 'format-detection',
        content: 'telephone=no'
      },
      {
        name: 'apple-mobile-web-app-capable',
        content: 'no'
      },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black'
      },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/iot/favicon-180x180.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/iot/favicon-32x32.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/iot/favicon-16x16.png'
      },
      {
        rel: 'shortcut icon',
        href: '/iot/favicon.ico'
      },
      {
        rel: 'manifest',
        href: '/manifest.json'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Teko:300,400,500'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/icon?family=Material+Icons'
      }
    ],
    noscript: [
      { innerHTML: 'Javascript required for this site to work.', body: true }
    ]
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
