import { model, Schema } from 'mongoose'
import songEnum from '../enums/song'

const { ObjectId } = Schema.Types

const songSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  titletranslit: String,
  artisttranslit: String,
  release: { type: ObjectId, ref: 'Release', required: true }, // first appearance
  length: { type: Number, required: true }, // measured in seconds
  bpm: {
    display: String,
    values: [
      {
        value: Number,
        timestamp: Number
      }
    ]
  },
  stops: [
    {
      length: Number,
      timestamp: Number
    }
  ],
  // timeSignature: String,
  charts: [ // TODO: flatten difficulties and related data?
    {
      numPads: { type: Number, required: true }, // single, double, etc.
      numPanels: Number, // optional
      // alternate pad schemes (Solo mode, etc)
      // overrides Release defaults
      difficulty: { type: String, enum: songEnum.difficulty, required: true },
      level: { type: Number, required: true },
      // stats (notecounts, jumps, etc). TODO: after initial test build
      alternateScale: { // optional
        // alternate scaling for difficulty ratings
        // (X-scaling for older songs, for instance)
        // overrides Release defaults
        scale: String,
        level: Number
      }
    }
  ]
})

const Song = model('Song', songSchema)

export default Song
