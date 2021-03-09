import { Router } from 'express'
import { validateToken } from '../middleware/auth.js'
import * as setlistController from '../controllers/setlist.js'

const setlistRouter = Router()

setlistRouter.get('/', (req, res, next) => setlistController.getAllSetlists(req, res, next))
setlistRouter.get('/entry/:id', (req, res, next) => setlistController.getSetlistById(req, res, next))
setlistRouter.get('/player/:id', (req, res, next) => setlistController.getSetlistsByPlayer(req, res, next))
setlistRouter.post('/add', validateToken, (req, res, next) => setlistController.addSetlist(req, res, next))
setlistRouter.put('/update/:id', validateToken, (req, res, next) => setlistController.updateSetlist(req, res, next))
setlistRouter.delete('/delete/:id', validateToken, (req, res, next) => setlistController.deleteSetlist(req, res, next))

export default setlistRouter
