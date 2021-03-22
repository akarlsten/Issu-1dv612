import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import passport from 'passport'
import GitLabStrategy from 'passport-gitlab2'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'

import User from './models/user.js'

import connectToDB from './db/mongoose.js'
import authRouter from './router/authRouter.js'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

connectToDB().catch(error => {
  console.error(error)
  process.exit(1)
})

const sessionOptions = {
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_ATLAS, secret: process.env.SESSION_SECRET })
}
const sessionMiddleware = session(sessionOptions)
app.use(sessionMiddleware)

// Passport.js setup
const gitlabStrategy = new GitLabStrategy({
  clientID: process.env.GITLAB_APP_ID,
  clientSecret: process.env.GITLAB_APP_SECRET,
  callbackURL: 'http://192.168.10.117:5000/login/return',
  baseURL: 'https://gitlab.lnu.se/',
  passReqToCallback: true
}, function (req, accessToken, refreshToken, profile, cb) {
  req.session.accessToken = accessToken
  req.session.refreshToken = refreshToken
  User.findOneAndUpdate({ gitlabId: profile.id }, { gitlabId: profile.id, ...profile._json },
    { upsert: true },
    (err, user) => {
      return cb(err, user)
    })
})

passport.use(gitlabStrategy)
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRouter)

app.listen(port, () => {
  console.log(`Server started on port ${port}!`)
})

export { app }
