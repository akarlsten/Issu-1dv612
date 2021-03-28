import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config.js'

import authenticated from './middleware/authenticated.js'
import ioAuthenticated from './middleware/ioAuthenticated.js'

import Account from './models/account.js'
import Session from './models/session.js'

import gitlabRouter from './router/gitlabRouter.js'
import userRouter from './router/userRouter.js'

import connectToDB from './db/mongoose.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

connectToDB().catch(error => {
  console.error(error)
  process.exit(1)
})

io.use(ioAuthenticated)

app.use((req, res, next) => {
  res.locals.io = io
  next()
})

app.set('trust proxy', true)

app.get('/', authenticated, async (req, res) => {
  const { accessToken } = await Account.findOne({ userId: req.user })
  res.json({ hello: `${accessToken}` })
})

app.use('/gitlab', gitlabRouter)
app.use('/', userRouter)

io.on('connection', async (socket) => {
  const session = await Session.findByToken(socket?.handshake?.auth?.token)
  socket.join(`/${session.userId}`)
})

server.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})

export { app }
