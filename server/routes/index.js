import { Router } from 'express'

import token from './auth'
import widgets from './widgets'

const router = Router()

router.use(token)
router.use(widgets)

export default router
