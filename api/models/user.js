import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  gitlabId: {
    type: Number,
    unique: true
  },
  name: {
    type: String
  },
  username: {
    type: String,
    unique: true
  },
  avatar_url: {
    type: String
  },
  web_url: {
    type: String
  },
  email: {
    type: String
  }
})

const User = mongoose.model('User', userSchema)

export default User
