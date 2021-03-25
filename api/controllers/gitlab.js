import axios from '../axios/axios.js'

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

export default gitlabController
