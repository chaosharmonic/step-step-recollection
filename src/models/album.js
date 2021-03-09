import { model, Schema } from 'mongoose'

const releaseSchema = new Schema({
  title: { type: String, required: true },
  scale: String, // DDR (classic), DDR X, ITG
  numPanels: { type: Number, required: true }, // chart type -- DDR, Pump, StepmaniaX, etc.
  releaseDate: Date,
  releaseType: { type: String } // first or third party TODO: enums: ['arcade', 'console', 'custom']
})

const Release = model('Release', releaseSchema)

export default Release
