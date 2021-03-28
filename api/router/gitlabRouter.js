import express from 'express'

import gitlabController from '../controllers/gitlab.js'
import authenticated from '../middleware/authenticated.js'

const router = express.Router()

router.get('/groups', authenticated, gitlabController.groupList)
router.get('/groups/:id/projects', authenticated, gitlabController.projectList)
router.get('/groups/:id/hooks', authenticated, gitlabController.getHook)
router.post('/groups/:id/hooks', authenticated, gitlabController.createHook)
router.delete('/groups/:id/hooks', authenticated, gitlabController.removeHook)
router.post('/hooks/:groupId/:userId', gitlabController.receiveHook)
router.get('/events', authenticated, gitlabController.getEvents)

export default router
