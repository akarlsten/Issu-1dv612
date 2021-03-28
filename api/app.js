import http from 'http'
import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors'
import 'dotenv/config.js'

import authenticated from './middleware/authenticated.js'
import ioAuthenticated from './middleware/ioAuthenticated.js'

import Account from './models/account.js'

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

app.get('/', authenticated, async (req, res) => {
  const { accessToken } = await Account.findOne({ userId: req.user })
  res.json({ hello: `${accessToken}` })
})

app.use('/gitlab', gitlabRouter)
app.use('/', userRouter)

io.use(ioAuthenticated)

server.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})

export { app }
