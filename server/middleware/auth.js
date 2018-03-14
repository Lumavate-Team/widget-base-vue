import axios from 'axios'
import { signUrl } from '@lumavate/request-signer'
import { validateToken } from '../auth/token'

export default async function(req, res, next) {
  console.log('Server Auth Middleware')

  const bearerToken = req.get('Authorization')
  if (!bearerToken) {
    res.status(401).end()

    return
  }

  const token = bearerToken.split(' ')[1]

  try {
    const tokenRes = validateToken(token)
    res.locals.authHeader = { 'Authorization': bearerToken }

    next()

  } catch (err) {
    res.status(401).end()
  }
}
