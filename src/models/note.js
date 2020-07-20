import { model, Schema } from 'mongoose'

const { ObjectId } = Schema.Types

const noteSchema = new Schema({
  song: { type: ObjectId, ref: 'Song' },
  difficulty: { type: String, enum: songEnum.difficulty },
  numPads: Number,
  numPanels: Number, // optional
  session: { type: ObjectId, ref: 'Session' }, // optional
  content: String
})

const Note = model('Note', noteSchema)

export default Note
