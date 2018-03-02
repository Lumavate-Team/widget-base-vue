import axios from 'axios'
import { signUrl } from '@lumavate/request-signer'

export default function(req, res, next) {
  console.log('Auth Middleware')

  const authHeader = req.get('Authorization')
  if (!authHeader) {
    res.status(401).end()

    return
  }

  signUrl({
    method: 'GET',
    path: `/pwa/v1/token`
  })
    .then(signedPath =>
      axios.get(`${process.env.BASE_URL}${signedPath}`, {
        headers: { 'Authorization': authHeader }
      })
      .then(response => {
        res.locals.authHeader = { 'Authorization': authHeader }

        next()
      })
      .catch(err => {
        res.status(401).end()
      })
    )
    .catch(err => res.status(500).end())
}
