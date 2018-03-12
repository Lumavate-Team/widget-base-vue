import { Router } from 'express'

import widgets from './widgets'

const router = Router()

router.use(widgets)

export default router
