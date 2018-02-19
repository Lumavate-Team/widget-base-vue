import { Router } from 'express'

const router = Router()

router.get('/discover/health', function (req, res, next) {
  res.json('OK')
})

export default router
