import Song from '../models/song'

export const getAllSongs = async (req, res, next) => {
  try {
    const { pageNo = 1, pageSize = 20 } = req.query
    const { filters = {} } = req.body

    const allMatchingSongs = await Song.find(filters)

    const pageCount = Math.ceil(allMatchingSongs.length / pageSize)

    const songs = await Song.find(filters)
      .populate({ path: 'album' })
      .sort({ titlesort: 1 })
      .limit(pageSize)
      .skip(pageSize * (pageNo - 1))

    res.json({ docs: songs, pageNo, pageCount })
  } catch (err) {
    console.error(err)
  }
}

export const getSongById = async (req, res, next) => {
  try {
    const { id } = req.params
    const song = await Song.findOne({ _id: id })
      .populate({ path: 'album' })

    res.json(song)
  } catch (err) {
    console.error(err)
  }
}

export const addSong = async (req, res, next) => {
  try {
    const { payload } = req.body
    console.log(payload)
    const existing = await Song.findOne({ title: payload.title, album: payload.album })
    if (existing) {
      const message = 'Song already exists!'
      res.json(message)
      return null
    }

    const { title, titletranslit, artist, artisttranslit } = payload

    const titlesort = titletranslit
      ? titletranslit.toLowerCase()
      : title.toLowerCase()

    const artistsort = artisttranslit
      ? artisttranslit.toLowerCase()
      : artist.toLowerCase()

    const newSong = await Song.create({ ...payload, titlesort, artistsort })

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
