import express from 'express'

import gitlabController from '../controllers/gitlab.js'

const router = express.Router()

router.get('/groups', gitlabController.groupList)

export default router
