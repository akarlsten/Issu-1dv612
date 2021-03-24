import axios from '../axios/axios.js'

const gitlabController = {}

gitlabController.groupList = async (req, res) => {
  try {
    let page = 1
    let perPage = 20

    if (req.query.page) {
      page = req.query.page
    }
    if (req.query.per_page) {
      perPage = req.query.per_page
    }

    const response = await axios.get(`/groups?page=${page}&per_page=${perPage}`)

    const groups = response.data
    res.json(groups)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

export default gitlabController
