import { model, Schema } from 'mongoose'

const albumSchema = new Schema({
  title: { type: String, required: true },
  scale: String, // DDR (classic), DDR X, ITG
  numPanels: { type: Number, required: true }, // chart type -- DDR, Pump, StepmaniaX, etc.
  releaseDate: Date,
  albumType: { type: String } // first or third party TODO: enums: ['arcade', 'console', 'custom']
})

const Album = model('Album', albumSchema)

export default Album
