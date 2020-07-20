import Note from '../models/note'

export const getAllNotes = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { page, limit } = req.params
    // const { filters } = req.body

    const notes = await Note.find()

    res.json(notes)
  } catch (err) {
    console.error(err)
  }
}
export const getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params
    const note = await Note.findOne({ _id: id })

    res.json(note)
  } catch (err) {
    console.error(err)
  }
}
export const getNoteByPlayer = async (req, res, next) => {
  // TODO:
  //  figure out where this route should go
  //  update fn accordingly
  try {
    const { id } = req.params
    const note = await Note.findOne({ _id: id })

    res.json(note)
  } catch (err) {
    console.error(err)
  }
}
export const addNote = async (req, res, next) => {
  try {
    const { payload } = req.body
    const existing = Note.findOne({ email: payload.email })

    if (existing) return null

    const newNote = await Note.create({ ...payload })

    res.json(newNote)
  } catch (err) {
    console.error(err)
  }
}
export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body

    const updatedNote = await findOneAndUpdate({ _id: id }, { ...payload })

    res.json(updatedNote)
  } catch (err) {
    console.error(err)
  }
}
export const deleteNote = async (req, res, next) => {
  try {
    console.log('route: deleteNote')
  } catch (err) {
    console.error(err)
  }
}
