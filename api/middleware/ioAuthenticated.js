import Session from '../models/session.js'

// variation of auth middleware for socketio
const authenticated = async (socket, next) => {
  try {
    const token = socket?.handshake?.auth?.token

    if (!token) {
      next(new Error('No auth token found!'))
    }

    try {
      const session = await Session.findByToken(token)

      if (!session) {
        next(new Error('Invalid credentials!'))
      }
      next()
    } catch (e) {
      next(new Error('You need to be logged in to do this.'))
    }
  } catch (e) {
    next(new Error('You need to be logged in to do this.'))
  }
}

export default authenticated
