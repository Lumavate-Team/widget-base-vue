import { Router } from 'express'

import auth from '../middleware/auth';

const router = Router()

// Mock Users
const users = [{
  name: 'Alexandre'
  },
  {
    name: 'Pooya'
  },
  {
    name: 'Sébastien'
  }
]

router.use('/users', auth)

/* GET users listing. */
router.get('/users', function (req, res, next) {
  res.json(users)
})

/* GET user by ID. */
router.get('/users/:id', function (req, res, next) {
  const id = parseInt(req.params.id)
  if (id >= 0 && id < users.length) {
    res.json(users[id])
  } else {
    res.sendStatus(404)
  }
})

export default router
