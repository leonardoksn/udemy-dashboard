import dotenv from 'dotenv'
dotenv.config({ path: './.env.production.local' })
import { app } from './src/App'

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`🚀App running on port: ${port}`))
