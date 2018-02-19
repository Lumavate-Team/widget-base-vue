import { Router } from 'express'

import health from './health';
import properties from './properties';
import users from './users'

const router = Router()

router.use(health)
router.use(properties)
router.use(users)

export default router
