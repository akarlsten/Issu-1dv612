import express from 'express'

import gitlabController from '../controllers/gitlab.js'
import authenticated from '../middleware/authenticated.js'

const router = express.Router()

router.get('/groups', authenticated, gitlabController.groupList)

export default router
