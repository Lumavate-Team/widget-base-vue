import axios from 'axios'

export default function(req, res, next) {
  console.log('Auth Middleware')

  const authHeader = req.get('Authorization')
  if (!authHeader) {
    res.status(401).end()

    return
  }

  axios.get(`${process.env.BASE_URL}/pwa/v1/token`, {
    headers: { 'Authorization': authHeader }
  })
  .then(response => {
    res.locals.authHeader = { 'Authorization': authHeader }

    next()
  })
  .catch(err => {
    res.status(401).end()
  })
}
