import express, { Express, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import cors from 'cors'
import routes from './routes'

const app: Express = express()

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: 'GET, POST, PUT,DELETE',
    }),
)

app.use(express.json({ limit: '20mb' }))

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
        return response.status(500).json({
            status: 'Error',
            message: 'Internal error',
        })
    },
)

app.use(routes)

export { app }
