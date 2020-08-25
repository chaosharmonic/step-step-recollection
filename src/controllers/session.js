import Session from '../models/session'
import Song from '../models/song'
import Player from '../models/player'

export const getSessionsByPlayer = (req, res, next) => {
  console.log('route: getSessionsByPlayer')
}

export const getAllSessions = async (req, res, next) => {
  try {
    // TODO: pagination
    const { pageNo = 1, pageSize = 50 } = req.query
    // const query = { pageNo, pageSize }
    const { filters } = req.body

    const response = await Session.find({ ...filters })
      .sort({ sessionDate: -1 })
      .limit(pageSize)
      .lean()

    for (const session of response) {
      const { songs } = session
      const { player: playerId } = session
      const { username } = await Player.findOne({ _id: playerId })

      for (const song of songs) {
        const songId = song.song
        const { title } = await Song.findOne({ _id: songId })
        song.title = title
      }
      session.player = { id: playerId, username }
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

    const { songs, player: playerId } = session

    const { username } = await Player.findOne({ _id: playerId })
    session.player = { id: playerId, username }

    for (const song of songs) {
      const songId = song.song
      const { charts, title } = await Song.findOne({ _id: songId })
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
