import { Router } from 'express'

import users from './users'
import widgets from './widgets'

const router = Router()

router.use(users)
router.use(widgets)

export default router
