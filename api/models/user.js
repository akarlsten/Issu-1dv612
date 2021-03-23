import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  image: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
})

const User = mongoose.model('User', userSchema)

export default User
