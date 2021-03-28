import { v4 as uuid } from 'uuid'

import axios from '../axios/axios.js'

import Hook from '../models/hook.js'

const gitlabController = {}

gitlabController.groupList = async (req, res) => {
  try {
    let page = 1
    let perPage = 20
    let minAccessLevel = 30

    if (req.query.page) {
      page = req.query.page
    }
    if (req.query.per_page) {
      perPage = req.query.per_page
    }
    if (req.query.min_access_level) {
      minAccessLevel = req.query.min_access_level
    }

    const response = await axios.get(`/groups?page=${page}&per_page=${perPage}&min_access_level=${minAccessLevel}`)

    const groups = response.data
    res.json(groups)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.projectList = async (req, res) => {
  try {
    const id = req.params.id
    let page = 1
    let perPage = 20

    if (req.query.page) {
      page = req.query.page
    }
    if (req.query.per_page) {
      perPage = req.query.per_page
    }

    const response = await axios.get(`/groups/${id}/projects?page=${page}&per_page=${perPage}`)

    const projects = response.data
    res.json(projects)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.getHooks = async (req, res) => {
  try {
    const id = req.params.id

    const response = await axios.get(`/groups/${id}/hooks`)

    const hooks = response.data.filter(hook => {
      const splitUrl = hook.url.split('/')
      const hookUserId = splitUrl[splitUrl.length - 1]

      return req.user._id === hookUserId
    })

    res.json(hooks)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.createHook = async (req, res) => {
  try {
    const groupId = req.params.id
    const userId = req.user._id
    const hookSecret = uuid()
    const hookURL = `${process.env.APP_BASE_URL}/hooks/${groupId}/${userId}`

    const hook = {
      owner: userId,
      group: groupId,
      url: hookURL,
      hookSecret: hookSecret,
      pushEvents: req?.body?.pushEvents,
      issuesEvents: req?.body?.issuesEvents,
      mergeEvents: req?.body?.mergeEvents,
      noteEvents: req?.body?.noteEvents,
      jobEvents: req?.body?.jobEvents,
      deploymentEvents: req?.body?.deploymentEvents,
      releaseEvents: req?.body?.releaseEvents,
      subgroupEvents: req?.body?.subgroupEvents
    }

    await Hook.findOneAndUpdate(
      { owner: userId, group: groupId },
      hook,
      { upsert: true })

    await axios.post(`/groups/${groupId}/hooks`, {
      url: hookURL,
      push_events: req?.body?.pushEvents || false,
      issues_events: req?.body?.issuesEvents || false,
      merge_events: req?.body?.mergeEvents || false,
      note_events: req?.body?.noteEvents || false,
      job_events: req?.body?.jobEvents || false,
      deployment_events: req?.body?.deploymentEvents || false,
      release_events: req?.body?.releaseEvents || false,
      subgroup_events: req?.body?.subgroupEvents || false,
      token: hookSecret
    })
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.receiveHook = async (req, res) => {
  try {
    const groupId = req.params.groupId
    const userId = req.params.userId
    const token = req.header('X-Gitlab-Token') || null

    // retrieve this projects stored hook token
    const { hookSecret } = await Hook.findOne({ owner: userId, group: groupId })

    if (token === hookSecret) {
      console.log(req.body)
      const io = res.locals.io.to(`/${userId}`)

      const issueData = {
        creator: req.body.user,
        info: req.body.object_attributes
      }

      if (req.body.object_attributes.action === 'open') {
        // emit the issue info to clients connected to the right path
        io.emit('newIssue', issueData)
      } else if (req.body.object_attributes.action === 'close') {
        io.emit('closedIssue', issueData)
      } else if (req.body.object_attributes.action === 'reopen') {
        io.emit('reopenIssue', issueData)
      } else if (req.body.event_type === 'note') {
        io.emit('newNote', { ...issueData, issue: req.body.issue })
      } else {
        io.emit('changedIssue', issueData)
      }

      return res.status(200).send()
    }
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

export default gitlabController
