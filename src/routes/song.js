import { Router } from 'express'

import * as songController from '../controllers/song'

const songRouter = Router()

songRouter.get('/', (req, res, next) => songController.getAllSongs(req, res, next))
songRouter.get('/entry/:id', (req, res, next) => songController.getSongById(req, res, next))
songRouter.post('/add', (req, res, next) => songController.addSong(req, res, next))
songRouter.put('/update/:id', (req, res, next) => songController.updateSong(req, res, next))
songRouter.delete('/delete/:id', (req, res, next) => songController.deleteSong(req, res, next))

export default songRouter
