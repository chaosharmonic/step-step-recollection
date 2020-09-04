import jwt from 'jsonwebtoken'

export const validateToken = (req, res, next) => {
  const token = req.header('x-access-token')
  if (!token) return res.status(401).send('No access token found!')
  try {
    const validatedUser = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = validatedUser
    next()
  } catch (err) {
    console.log(err)
    res.status(400).send('Invalid access token!')
  }
}
