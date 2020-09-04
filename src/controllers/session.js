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

    const playerId = newSession.player
    const { username } = await Player.findOne({ _id: playerId })

    newSession.player = { username, id: playerId }

    res.json(newSession)
  } catch (err) {
    console.error(err)
  }
}

export const updateSession = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id: player, isAdmin } = req.user
    const session = await Session.findOne({ _id: id })

    const canUpdate = session.player === player || isAdmin

    if (!canUpdate) return res.status(401).send('Invalid permissions!')

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
    const { id: sessionId } = req.params
    const { _id: playerId, isAdmin } = req.user
    const session = await Session.findOne({ _id: sessionId })

    console.log(session.player)
    console.log(playerId)

    const canDelete = String(session.player) === String(playerId) || isAdmin
    console.log(canDelete)

    if (!canDelete) throw new Error('Invalid permissions!')

    const isDeleted = await Session.deleteOne({ _id: sessionId })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: sessionId
    })
  } catch (err) {
    console.error(err)
  }
}
