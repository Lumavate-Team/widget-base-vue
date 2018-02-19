import { Router } from 'express'

const router = Router()

router.get('/discover/properties', function (req, res, next) {
  res.json([{
    name: 'title',
    classification: 'General',
    section: 'General Settings',
    label: 'Title',
    type: 'text'
  }])
})

export default router
