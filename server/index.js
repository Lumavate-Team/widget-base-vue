import express from 'express'
import 'express-async-errors'

import { Nuxt, Builder } from 'nuxt'
import cookieParser from 'cookie-parser';

import routes from './routes'

const app = express()
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

// enable this setting to use the X-Forwarded-Proto header to accuratly get HTTPS protocol
// otherwise when using req.protocol its always HTTP
app.enable('trust proxy')

app.use(cookieParser())
app.use(express.json())

// Import API Routes
app.use('/:ic/:urlRef', routes)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

// Init Nuxt.js
const nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)

  builder.build()
}

// Catch any attempt for a known api call we couldn't find in previous middleware
// and return 404 to prevent nuxt from rendering our index.vue
app.use(function(req, res, next) {
  if (/discover|instances/.test(req.originalUrl)) {
    res.status(404).end()

    return
  }

  next()
})

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
app.listen(port, host)
console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
