import { Router } from 'express'

import * as noteController from '../controllers/note'

const noteRouter = Router()

noteRouter.get('/', (req, res, next) => noteController.getAllNotes(req, res, next))
noteRouter.get('/entry/:id', (req, res, next) => noteController.getNoteById(req, res, next))
noteRouter.get('/player/:id', (req, res, next) => noteController.getNoteById(req, res, next))
noteRouter.post('/add', (req, res, next) => noteController.addNote(req, res, next))
noteRouter.put('/update/:id', (req, res, next) => noteController.updateNote(req, res, next))
noteRouter.delete('/delete/:id', (req, res, next) => noteController.deleteNote(req, res, next))

export default noteRouter
