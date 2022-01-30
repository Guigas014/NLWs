import axios from 'axios'
import '@env'


export const api = axios.create({
  baseURL: `http://${process.env.LOCAL_HOST}:4000`
})


