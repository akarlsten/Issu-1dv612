import express from 'express'

import gitlabController from '../controllers/gitlab.js'
import authenticated from '../middleware/authenticated.js'

const router = express.Router()

router.get('/groups', authenticated, gitlabController.groupList)
router.get('/groups/:id/projects', authenticated, gitlabController.projectList)
router.get('/groups/:id/hooks', authenticated, gitlabController.getHooks)
router.post('/groups/:id/hooks', authenticated, gitlabController.createHook)
router.post('/hooks/:groupId/:userId', gitlabController.receiveHook)

export default router
