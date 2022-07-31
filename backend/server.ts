import dotenv from 'dotenv';
dotenv.config({ path: './.env' })
import mongoose from 'mongoose';

import { app } from './src/App'

const port = process.env.PORT || 10010

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
    .connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.uziolnl.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(port, () => console.log(`🚀App running on port: ${port}`))
    })
    .catch(err => console.log(err))
