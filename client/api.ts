import Axios from 'axios'
import { config } from './config'

export const axios = Axios.create({
  baseURL: config.isDev ? 'http://localhost:3000' : ''
})

export const api = {
  async getFiles(dir: string) {
    const r = await axios.get('/api/query', { params: { dir } })

    return r.data
  }
}
