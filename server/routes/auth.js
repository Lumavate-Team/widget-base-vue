import { Router } from 'express'
import { validateToken } from '../auth/token'

const router = Router()

router.get('/token', async function (req, res, next) {
  const bearerToken = req.get('Authorization')
  if (!bearerToken) {
    return res.status(401).end()
  }

  try {
    const token = bearerToken.split(' ')[1]
    const tokenData = await validateToken(token)

    res.json(tokenData)
  } catch (e) {
    if (e.response && e.response.status === 401) {
      res.status(401).end()
    }

    next(e)
  }
})

export default router
