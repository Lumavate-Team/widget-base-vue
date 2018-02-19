export default function(req, res, next) {
  console.log('Auth Middleware')
  console.log(req.cookies)

  next()
}
