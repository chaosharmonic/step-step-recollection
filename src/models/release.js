import { model, Schema } from 'mongoose'

const releaseSchema = new Schema({
  title: String,
  scale: String, // DDR (classic), DDR X, ITG
  numPanels: Number, // chart type -- DDR, Pump, StepmaniaX, etc.
  releaseYear: Number,
  releaseType: { type: String } // first or third party TODO: Create enums for this
})

const Release = model('Release', releaseSchema)

export default Release
