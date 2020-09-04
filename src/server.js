import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import authRouter from './routes/auth'
import songRouter from './routes/song'
import releaseRouter from './routes/release'
import sessionRouter from './routes/session'
import playerRouter from './routes/player'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRouter)
app.use('/api/song', songRouter)
app.use('/api/release', releaseRouter)
app.use('/api/session', sessionRouter)
app.use('/api/player', playerRouter)

const expressPort = process.env.EXPRESS_PORT
const mongoURL = process.env.MONGODB_URL

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Mongoose connected.'))

app.listen(expressPort, () => console.log(`server listening on port ${expressPort}`))
