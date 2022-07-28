import { Router } from 'express'
import gains from '../controller/gains'
import expenses from '../controller/expenses'

const routes = Router()

routes.get('/', (req, res) => res.send('BACKEND DASHBOARD'))
routes.get('/gains', gains)
routes.get('/expenses', expenses)

export default routes
