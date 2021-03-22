import passport from 'passport'
import express from 'express'

const router = express.Router()

router.get('/login', passport.authenticate('gitlab', {
  scope: ['api']
}))

router.get('/login/return',
  passport.authenticate('gitlab', {
    failureRedirect: '/'
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log('it worked?')
    res.redirect('/')
  })

export default router
