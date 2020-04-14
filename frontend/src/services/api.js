import axios from 'axios'

const api = axios.create({baseURL: 'http://192a4415.ngrok.io'})

export default api