import Setlist from '../models/setlist'
import Song from '../models/song'
import Player from '../models/player'

export const getSetlistsByPlayer = (req, res, next) => {
  console.log('route: getSetlistsByPlayer')
}

export const getAllSetlists = async (req, res, next) => {
  try {
    const { pageNo = 1, pageSize = 50 } = req.query
    const { filters } = req.body

    const response = await Setlist.find({ ...filters })
      .sort({ setlistDate: -1 })
      .limit(pageSize)
      .lean()
      .skip(pageSize * (pageNo - 1))

    for (const setlist of response) {
      const { songs } = setlist
      const { player: playerId } = setlist
      const { username } = await Player.findOne({ _id: playerId })

      for (const song of songs) {
        const songId = song.song
        const { title } = await Song.findOne({ _id: songId })
        song.title = title
      }
      setlist.player = { id: playerId, username }
    }
    res.json(response)
  } catch (err) {
    console.error(err)
  }
}

export const getSetlistById = async (req, res, next) => {
  try {
    const { id } = req.params
    const setlist = await Setlist.findOne({ _id: id }).lean()

    const { songs, player: playerId } = setlist

    const { username } = await Player.findOne({ _id: playerId })
    setlist.player = { id: playerId, username }

    for (const song of songs) {
      const songId = song.song
      const { charts, title } = await Song.findOne({ _id: songId })
      song.charts = charts
      song.title = title
    }

    res.json(setlist)
  } catch (err) {
    console.error(err)
  }
}

export const addSetlist = async (req, res, next) => {
  try {
    const { payload } = req.body

    const newSetlist = await Setlist.create({ ...payload })

    const playerId = newSetlist.player
    const { username } = await Player.findOne({ _id: playerId })

    const setlistResponse = {
      ...newSetlist._doc,
      player: { username, id: playerId }
    }

    res.json(setlistResponse)
  } catch (err) {
    console.error(err)
  }
}

export const updateSetlist = async (req, res, next) => {
  try {
    const { id } = req.params
    const { _id: playerId, isAdmin } = req.user
    const { payload } = req.body
    const setlist = await Setlist.findOne({ _id: id })

    const canUpdate = String(setlist.player) === String(playerId) || isAdmin
    if (!canUpdate) throw new Error('Invalid permissions!')

    let updatedSetlist = await Setlist.findOneAndUpdate({ _id: id }, { ...payload })

    updatedSetlist = await Setlist.findOne({ _id: id }).lean()
    const { songs } = updatedSetlist

    const { username } = await Player.findOne({ _id: playerId })
    updatedSetlist.player = { id: playerId, username }

    for (const song of songs) {
      const songId = song.song
      const { charts, title } = await Song.findOne({ _id: songId })
      song.charts = charts
      song.title = title
    }

    res.json(updatedSetlist)
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: err })
  }
}

export const deleteSetlist = async (req, res, next) => {
  try {
    const { id: setlistId } = req.params
    const { _id: playerId, isAdmin } = req.user
    const setlist = await Setlist.findOne({ _id: setlistId })

    const canDelete = String(setlist.player) === String(playerId) || isAdmin

    if (!canDelete) throw new Error('Invalid permissions!')

    const isDeleted = await Setlist.deleteOne({ _id: setlistId })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: setlistId
    })
  } catch (err) {
    console.error(err)
    res.status(401).json({ message: err })
  }
}
