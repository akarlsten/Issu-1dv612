import mongoose from 'mongoose'

const sessionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  expires: { type: Date },
  refreshToken: { type: String },
  accessToken: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
})

sessionSchema.statics.findByToken = async function (token) {
  return this.findOne({ accessToken: token })
}

const Session = mongoose.model('Session', sessionSchema)

export default Session
