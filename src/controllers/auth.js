import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Player from '../models/player'

export const login = async (req, res, next) => {
  const { payload: { username, password } } = req.body

  const user = await Player.findOne({ username })

  if (!user) return res.status(403).json({ message: 'Player does not exist!' })

  const passwordMatches = await bcrypt.compare(password, user.password)
  if (!passwordMatches) return res.status(403).json({ message: 'Invalid password!' })

  const isAdmin = username === process.env.ADMIN_USER

  const expTime = process.env.JWT_EXP_TIME
  const expUnit = process.env.JWT_EXP_UNIT

  const expiresIn = `${expTime}${expUnit[0]}`

  const token = jwt.sign({ _id: user._id, username, isAdmin }, process.env.TOKEN_SECRET, { expiresIn })
  res.status(200).json({ token })
}

// TODO: token invalidation on logout
