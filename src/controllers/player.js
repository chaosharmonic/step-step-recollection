import bcrypt from 'bcrypt'
import Player from '../models/player'

export const getAllPlayers = async (req, res, next) => {
  try {
    // TODO: pagination
    // const { page, limit } = req.params
    // const { filters } = req.body

    const players = await Player.find({})
    console.log(players)

    res.json(players)
  } catch (err) {
    console.error(err)
  }
}

export const getPlayerById = async (req, res, next) => {
  try {
    const { id } = req.params
    const player = await Player.findOne({ _id: id })

    res.json(player)
  } catch (err) {
    console.error(err)
  }
}

export const addPlayer = async (req, res, next) => {
  try {
    const { payload } = req.body
    const { email, password } = payload
    const existing = await Player.findOne({ email: email })

    if (existing) {
      const message = 'Player already exists!'
      return res.status(400).send(message)
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const newPlayer = await Player.create({ ...payload, password: passwordHash })

    res.status(200).json(newPlayer)
  } catch (err) {
    console.error(err)
  }
}

export const updatePlayer = async (req, res, next) => {
  try {
    const { id } = req.params
    const { payload } = req.body
    let { password } = payload
    if (password) {
      const salt = await bcrypt.genSalt(10)
      const passwordHash = await bcrypt.hash(password, salt)
      password = passwordHash
    }
    const { isAdmin } = req.user

    if (!isAdmin) return res.status(401).send('Invalid permisssions!')

    let updatedPlayer = await Player.findOneAndUpdate({ _id: id }, { ...payload, password })

    updatedPlayer = await Player.findOne({ _id: id })

    res.json(updatedPlayer)
  } catch (err) {
    console.error(err)
  }
}

export const deletePlayer = async (req, res, next) => {
  try {
    const { id } = req.params
    const { isAdmin } = req.user

    if (!isAdmin) return res.status(401).send('Invalid permisssions!')

    const isDeleted = await Player.deleteOne({ _id: id })

    if (!isDeleted) throw new Error('Could not delete this id!')

    res.json({
      _id: id
    })
  } catch (err) {
    console.error(err)
  }
}
