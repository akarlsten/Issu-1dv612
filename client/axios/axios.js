import axiosLib from 'axios'

/**
 * Initializes our axios instance with base url.
 */
const axios = axiosLib.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 1000
})

export default axios
