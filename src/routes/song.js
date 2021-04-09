import { Router } from 'express'
import { validateToken } from '../middleware/auth'
import * as songController from '../controllers/song'

const songRouter = Router()

songRouter.get('/', (req, res, next) => songController.getAllSongs(req, res, next))
songRouter.get('/entry/:id', (req, res, next) => songController.getSongById(req, res, next))
songRouter.get('/search/title', (req, res, next) => songController.getSongsByTitle(req, res, next))
songRouter.post('/add', validateToken, (req, res, next) => songController.addSong(req, res, next))
songRouter.put('/update/:id', validateToken, (req, res, next) => songController.updateSong(req, res, next))
songRouter.delete('/delete/:id', validateToken, (req, res, next) => songController.deleteSong(req, res, next))

export default songRouter
