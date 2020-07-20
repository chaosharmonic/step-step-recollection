import { Router } from 'express'

import * as releaseController from '../controllers/release'

const releaseRouter = Router()

releaseRouter.get('/', (req, res, next) => releaseController.getAllReleases(req, res, next))
releaseRouter.get('/entry/:id', (req, res, next) => releaseController.getReleaseById(req, res, next))
releaseRouter.post('/add', (req, res, next) => releaseController.addRelease(req, res, next))
releaseRouter.put('/update/:id', (req, res, next) => releaseController.updateRelease(req, res, next))
releaseRouter.delete('/delete/:id', (req, res, next) => releaseController.deleteRelease(req, res, next))

export default releaseRouter
