import axios from 'axios'

const fetcher = axios.create({
  baseURL: process.env.GITLAB_BASE_URL,
  timeout: 1000
})

export default fetcher
