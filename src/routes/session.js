import { Router } from 'express'
import * as sessionController from '../controllers/session.js'

const sessionRouter = Router()

sessionRouter.get('/', (req, res, next) => sessionController.getAllSessions())
sessionRouter.get('/entry/:id', (req, res, next) => sessionController.getSessionById(id))
sessionRouter.get('/player/:id', (req, res, next) => sessionController.getSessionsByPlayer(id))
sessionRouter.post('/add', (req, res, next) => sessionController.addSession())
sessionRouter.put('/update/:id', (req, res, next) => sessionController.updateSession())
sessionRouter.delete('/delete/:id', (req, res, next) => sessionController.deleteSession())

export default sessionRouter
