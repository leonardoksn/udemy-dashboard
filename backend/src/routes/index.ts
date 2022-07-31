import { Router } from 'express'
import gains from '../controller/gains'
import expenses from '../controller/expenses'
import { login } from '../controller/login'
import { checkToken } from '../middleware/checkToken'

const routes = Router()

routes.get('/', (req, res) => res.send('BACKEND DASHBOARD'))
routes.post('/auth/login', login)

routes.get('/gains', checkToken, gains)
routes.get('/expenses', checkToken, expenses)

export default routes
