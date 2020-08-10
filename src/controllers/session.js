import Session from '../models/session'
import Song from '../models/song'

export const getSessionsByPlayer = (req, res, next) => {
  console.log('route: getSessionsByPlayer')
}

export const getAllSessions = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { pageNo, pageSize } = req.query
    // const query = { pageNo, pageSize }
    const { filters } = req.body

    const response = await Session.find({ ...filters }).lean()

    for (const session of response) {
      const { songs } = session

      for (const song of songs) {
        const id = song.song
        const { title } = await Song.findOne({ _id: id })
        song.title = title
      }
    }
    res.json(response)
  } catch (err) {
    console.error(err)
  }
}

export const getSessionById = async (req, res, next) => {
  try {
    const { id } = req.params
    const session = await Session.findOne({ _id: id }).lean()

    const { songs } = session

    for (const song of songs) {
      const songId = song.song
      const { charts, title } = await Song.findOne({ _id: songId })
      console.log(songId)
      song.charts = charts
      song.title = title
    }

    res.json(session)
  } catch (err) {
    console.error(err)
  }
}

export const addSession = async (req, res, next) => {
  try {
    const { payload } = req.body

    const newSession = await Session.create({ ...payload })

    res.json(newSession)
  } catch (err) {
    console.error(err)
  }
}

export const updateSession = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body

    let updatedSession = await Session.findOneAndUpdate({ _id: id }, { ...payload })

    updatedSession = await Session.findOne({ _id: id }).lean()
    const { songs } = updatedSession

    for (const song of songs) {
      const songId = song.song
      const { charts, title } = await Song.findOne({ _id: songId })
      song.charts = charts
      song.title = title
    }

    res.json(updatedSession)
  } catch (err) {
    console.error(err)
  }
}

export const deleteSession = async (req, res, next) => {
  try {
    const { id } = req.params
    const isDeleted = await Session.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
