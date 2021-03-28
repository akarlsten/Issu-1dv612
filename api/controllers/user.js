import User from '../models/user.js'
import mongoose from 'mongoose'

const userController = {}

userController.setNumber = async (req, res) => {
  try {
    const { phoneNumber } = req?.body
    console.log(phoneNumber)
    if (!req.user) {
      return res.status(400).send({
        errormessage: 'Invalid ID'
      })
    }

    const user = await User.findOneAndUpdate({
      _id: req.user._id
    }, {
      $set: {
        phoneNumber
      }
    })

    if (!user) {
      return res.status(404).send({
        errormessage: 'No user with that id.'
      })
    }

    res.json(user)
  } catch (e) {
    console.log(e)
    res.status(400).send(e.errors)
  }
}

userController.getUser = async (req, res) => {
  try {
    res.json(req.user)
  } catch (e) {
    res.status(400).send(e.errors)
  }
}

export default userController
