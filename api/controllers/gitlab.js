import { v4 as uuid } from 'uuid'
import sub from 'date-fns/sub/index.js'

import axios from '../axios/axios.js'

import Hook from '../models/hook.js'
import Event from '../models/event.js'
import User from '../models/user.js'

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

gitlabController.getHook = async (req, res) => {
  try {
    const groupId = req.params.id
    const userId = req.user._id

    const hook = await Hook.findOne({ owner: userId, group: groupId })

    res.json(hook)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.createHook = async (req, res) => {
  try {
    const groupId = req.params.id
    const userId = req.user._id
    const hookSecret = uuid()
    const hookURL = `${process.env.APP_BASE_URL}/gitlab/hooks/${groupId}/${userId}`

    // remove any existing hooks by this user first
    const response = await axios.get(`/groups/${groupId}/hooks`)

    const hooks = response.data.filter(item => {
      const splitUrl = item.url.split('/')
      const hookUserId = splitUrl[splitUrl.length - 1]

      return `${req.user._id}` === `${hookUserId}`
    })

    if (hooks[0]) {
      await axios.delete(`/groups/${groupId}/hooks/${hooks[0].id}`)
      await Hook.findOneAndDelete({ owner: userId, group: groupId })
    }

    const hook = {
      owner: userId,
      group: groupId,
      url: hookURL,
      token: hookSecret,
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
      merge_requests_events: req?.body?.mergeEvents || false,
      note_events: req?.body?.noteEvents || false,
      job_events: req?.body?.jobEvents || false,
      deployment_events: req?.body?.deploymentEvents || false,
      releases_events: req?.body?.releaseEvents || false,
      subgroup_events: req?.body?.subgroupEvents || false,
      token: hookSecret,
      enable_ssl_verification: false
    })

    return res.status(200).send()
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

gitlabController.removeHook = async (req, res) => {
  try {
    const groupId = req.params.id
    const userId = req.user._id

    // remove any existing hooks by this user first
    const response = await axios.get(`/groups/${groupId}/hooks`)

    const hooks = response.data.filter(item => {
      const splitUrl = item.url.split('/')
      const hookUserId = splitUrl[splitUrl.length - 1]

      return `${req.user._id}` === `${hookUserId}`
    })

    if (hooks[0]) {
      await axios.delete(`/groups/${groupId}/hooks/${hooks[0].id}`)
      await Hook.findOneAndDelete({ owner: userId, group: groupId })
    }

    return res.status(200).send()
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
    const { token: hookSecret } = await Hook.findOne({ owner: userId, group: groupId })

    if (token === hookSecret) {
      const event = await Event.create(
        { owner: userId, group: groupId, data: req.body }
      )

      const io = res.locals.io.to(`/${userId}`)

      io.emit('newEvent', event)

      return res.status(200).send()
    }
  } catch (e) {
    console.log(e)
    res.status(400).send(e.errors)
  }
}

gitlabController.getEvents = async (req, res) => {
  try {
    const userId = req.user._id
    let page = 1
    let perPage = 10

    if (req.query.page) {
      page = req.query.page
    }
    if (req.query.per_page) {
      perPage = req.query.per_page
    }

    const now = Date.now()

    const events = await Event.find({
      owner: userId,
      createdAt: { $gte: sub(now, { weeks: 1 }) }
    })
      .skip((page - 1) * perPage)
      .limit(+perPage)
      .sort({ createdAt: -1 })

    await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      $set: {
        lastVisited: now
      }
    })

    return res.json(events)
  } catch (e) {
    console.log(e)
    res.status(400).send(e.errors)
  }
}

export default gitlabController
