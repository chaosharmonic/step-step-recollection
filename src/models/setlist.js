import { model, Schema } from 'mongoose'
import songEnum from '../enums/song'

const { ObjectId } = Schema.Types

const setlistSchema = new Schema({
  player: { type: ObjectId, ref: 'Player', required: true },
  setlistDate: { type: Date, required: true },
  songs: [
    {
      song: { type: ObjectId, ref: 'Song', required: true },
      difficulty: { type: String, enum: songEnum.difficulty, required: true },
      settings: { // optional
        // overrides Player defaults
        judge: Number,
        life: Number,
        meterType: String, // TODO: add enums
        scrollType: String,
        scrollSpeed: Number
        // TODO: modifiers
      },
      record: { // any of the below -- all optional, but must include at least one:
        passed: Boolean,
        score: Number,
        percent: Number,
        grade: String, // AAA, AA, etc
        judgments: {
          marvelous: Number,
          perfect: Number,
          great: Number,
          good: Number,
          almost: Number,
          miss: Number,
          ok: Number,
          ng: Number
        },
        max_combo: Number
        // other notes: FC, SDG, etc
      }
    }
  ]
})

const Setlist = model('Setlist', setlistSchema)

export default Setlist
