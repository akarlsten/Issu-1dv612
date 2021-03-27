import User from '../models/user'
import mongoose from 'mongoose'

const userController = {}

userController.setNumber = async (req, res) => {
  try {
    const userId = req.params.id
    const { phoneNumber } = req?.body

    if (!mongoose.Schema.Types.ObjectId.isValid(userId)) {
      return res.status(400).send({
        errormessage: 'Invalid ID'
      })
    }

    const user = User.findOneAndUpdate({
      _id: userId
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
    res.status(400).send(e.errors)
  }
}

export default userController
