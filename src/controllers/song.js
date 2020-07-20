import Song from '../models/song'

export const getAllSongs = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { pageNo, pageSize } = req.query
    // const { filters } = req.body

    const songs = await Song.find()

    res.json(songs)
  } catch (err) {
    console.error(err)
  }
}

export const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params
    const song = await Song.findOne({ _id: id })

    res.json(song)
  } catch (err) {
    console.error(err)
  }
}

export const addSong = async (req, res, next) => {
  try {
    const { payload } = req.body
    console.log(payload)
    const existing = await Song.findOne({ title: payload.title, release: payload.release })
    if (existing) {
      const message = 'Song already exists!'
      res.json(message)
      return null
    }

    const newSong = await Song.create({ ...payload })

    res.json(newSong)
  } catch (err) {
    console.error(err)
  }
}

export const updateSong = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body
    let updatedSong = await Song.findOneAndUpdate({ _id: id }, { ...payload })

    updatedSong = await Song.findOne({ _id: id })

    res.json(updatedSong)
  } catch (err) {
    console.error(err)
  }
}

export const deleteSong = async (req, res, next) => {
  try {
    const { id } = req.params
    const isDeleted = await Song.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
