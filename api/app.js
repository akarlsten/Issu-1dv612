import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import passport from 'passport'
import GitLabStrategy from 'passport-gitlab2'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import authenticated from './middleware/authenticated.js'

import Account from './models/account.js'

import connectToDB from './db/mongoose.js'

const app = express()
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

app.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})

export { app }
