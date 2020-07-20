import { model, Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const playerSchema = new Schema({
  username: String,
  email: String,
  password: String, // TODO: update type (when I implement auth)
  settings: { // player-level defaults
    judge: Number, // timing windows
    life: Number, // impact on steps to life meter
    meterType: String,
    scrollType: String,
    scrollSpeed: Number
    // modifiers TODO: after test API
  },
  notes: [
    { type: ObjectId, ref: 'Note' }
  ]
})

const Player = model('Player', playerSchema)

export default Player
