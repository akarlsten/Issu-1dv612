import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  group: { type: String },
  seen: { type: Boolean, default: false },
  data: { type: Object }
}, { timestamps: true })

const Event = mongoose.model('Event', eventSchema)

export default Event
