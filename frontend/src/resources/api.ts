import axios from 'axios'

axios.defaults.withCredentials = true
const host = 'http://localhost:3001/'

export const api = axios.create({
    baseURL: host,
})
