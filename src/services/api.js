import axios from 'axios'

const api = axios.create({
  baseURL: 'http://3.27.244.2/admin/rest', // change this /admin/rest
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default api
