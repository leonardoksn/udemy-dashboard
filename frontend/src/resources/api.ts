import axios from 'axios'

axios.defaults.withCredentials = true
const host = 'http://192.168.0.101:3001/'

export const api = axios.create({
    baseURL: host,
})
