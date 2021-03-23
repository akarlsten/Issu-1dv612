import mongoose from 'mongoose'

const accountSchema = new mongoose.Schema({
  compoundId: { type: String, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId },
  providerType: { type: String },
  providerId: { type: String },
  providerAccountId: { type: mongoose.Schema.Types.Mixed },
  refreshToken: { type: String },
  accessToken: { type: String },
  accessTokenExpires: { type: String },
  createdAt: { type: Date },
  updatedAt: { type: Date }
})

accountSchema.statics.findByUser = async function (userId) {
  return this.findOne({ userId: userId })
}

const Account = mongoose.model('Account', accountSchema)

export default Account
