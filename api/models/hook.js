import mongoose from 'mongoose'

const hookSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  group: { type: String },
  url: { type: String },
  token: { type: String },
  pushEvents: { type: Boolean, default: false },
  issuesEvents: { type: Boolean, default: false },
  mergeEvents: { type: Boolean, default: false },
  noteEvents: { type: Boolean, default: false },
  jobEvents: { type: Boolean, default: false },
  deploymentEvents: { type: Boolean, default: false },
  releaseEvents: { type: Boolean, default: false },
  subgroupEvents: { type: Boolean, default: false },
  hookId: { type: String }
})

const Hook = mongoose.model('Hook', hookSchema)

export default Hook
