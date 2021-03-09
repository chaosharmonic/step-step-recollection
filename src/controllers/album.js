import Album from '../models/album'
import Song from '../models/song'

// TODO: search route

export const getAllAlbums = async (req, res, next) => {
  try {
    // TODO: pagination
    const { pageNo = 1, pageSize = 30 } = req.query
    // const query = { pageNo, pageSize }
    const { filters } = req.body

    const albums = await Album.find({ ...filters })
      .sort({ releaseDate: 1 })
      .limit(pageSize)

    res.json(albums)
  } catch (err) {
    console.error(err)
  }
}

export const getAlbumById = async (req, res, next) => {
  try {
    const { id } = req.params
    const album = await Album.findOne({ _id: id })

    const songs = await Song.find({ album: { _id: id } })

    const response = { album, songs }
    res.json(response)
  } catch (err) {
    console.error(err)
  }
}

export const addAlbum = async (req, res, next) => {
  try {
    const { payload } = req.body
    const existing = await Album.findOne({ title: payload.title })
    if (existing) {
      const message = 'Album already exists!'
      res.json(message)
      return null
    }

    const newAlbum = await Album.create({ ...payload })

    res.json(newAlbum)
  } catch (err) {
    console.error(err)
  }
}

export const updateAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body
    let updatedAlbum = await Album.findOneAndUpdate({ _id: id }, { ...payload })

    updatedAlbum = await Album.findOne({ _id: id })

    res.json(updatedAlbum)
  } catch (err) {
    console.error(err)
  }
}

export const deleteAlbum = async (req, res, next) => {
  try {
    const { id } = req.params
    const isDeleted = await Album.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
