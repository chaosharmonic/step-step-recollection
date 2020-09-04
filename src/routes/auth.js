import { Router } from 'express'
import * as authController from '../controllers/auth'

const authRouter = Router()

authRouter.post('/login', (req, res, next) => authController.login(req, res, next))

export default authRouter
