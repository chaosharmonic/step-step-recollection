import { model, Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const playerSchema = new Schema({
  username: { type: String, required: true, min: 6 },
  email: { type: String, required: true, min: 6 },
  password: { type: String, required: true, min: 6 },
  settings: { // player-level defaults
    judge: Number, // timing windows
    life: Number, // impact on steps to life meter
    meterType: String,
    scrollType: String,
    scrollSpeed: Number
    // modifiers TODO: sometime after this is playtest-ready
  },
  notes: [
    { type: ObjectId, ref: 'Note' }
  ]
})

const Player = model('Player', playerSchema)

export default Player
