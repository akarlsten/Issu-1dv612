import Session from '../models/session.js'
import Account from '../models/account.js'
import User from '../models/user.js'

import axios from '../axios/axios.js'

const authenticated = async (req, res, next) => {
  try {
    const token = req.header('Authorization')

    if (!token) {
      throw new Error('No token found!')
    }

    const trimmedToken = token.replace('Bearer ', '') // dirty

    try {
      const session = await Session.findByToken(trimmedToken)

      if (!session) {
        throw new Error('Invalid credentials!')
      }

      const { accessToken } = await Account.findByUser(session.userId)
      const user = await User.findOne({ _id: session.userId })
      req.user = user

      if (req.user && accessToken) {
        // if logged in intercepts all axios requests and adds the authorization header with our access token
        axios.interceptors.request.use(request => {
          request.headers.Authorization = `Bearer ${accessToken}`
          return request
        })
        return next()
      }
      next()
    } catch (e) {
      res.status(401).send({ message: 'You need to be logged in to do this.' })
    }
  } catch (e) {
    res.status(401).send({ message: 'You need to be logged in to do this.' })
  }
}

export default authenticated
