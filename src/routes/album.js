import { Router } from 'express'
import { validateToken } from '../middleware/auth'

import * as albumController from '../controllers/album'

const albumRouter = Router()

albumRouter.get('/', (req, res, next) => albumController.getAllAlbums(req, res, next))
albumRouter.get('/entry/:id', (req, res, next) => albumController.getAlbumById(req, res, next))
albumRouter.post('/add', validateToken, (req, res, next) => albumController.addAlbum(req, res, next))
albumRouter.put('/update/:id', validateToken, (req, res, next) => albumController.updateAlbum(req, res, next))
albumRouter.delete('/delete/:id', validateToken, (req, res, next) => albumController.deleteAlbum(req, res, next))

export default albumRouter
