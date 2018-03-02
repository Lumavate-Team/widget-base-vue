import { Router } from 'express'
import axios from 'axios'
import { signUrl } from '@lumavate/request-signer'

import auth from '../middleware/auth';

const router = Router()

router.get('/discover/health', function (req, res, next) {
  res.json('OK')
})

router.get('/discover/properties', function (req, res, next) {
  res.json([{
    name: 'title',
    classification: 'General',
    section: 'General Settings',
    label: 'Title',
    type: 'text',
    options: {}
  }])
})

router.use('/instances', auth)

router.get('/instances/:id/data', async function (req, res, next) {
  const signedPath = await signUrl({
    method: 'GET',
    path: `/pwa/v1/widget-instances/${req.params.id}`
  })

  const axRes = await axios.get(`${process.env.BASE_URL}${signedPath}`, {
    headers: res.locals.authHeader
  })

  res.json(axRes.data.payload.data)
})

export default router
