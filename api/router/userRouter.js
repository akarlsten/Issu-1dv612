import express from 'express'

import userController from '../controllers/user.js'
import authenticated from '../middleware/authenticated.js'

const router = express.Router()

router.post('/me', authenticated, userController.setNumber)
router.get('/me', authenticated, userController.getUser)

export default router
