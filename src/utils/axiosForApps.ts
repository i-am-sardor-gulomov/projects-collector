import axios from 'axios'

const http = axios.create({
  baseURL: '',
  headers: {
    // 'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

http.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token')
  if (!config.headers)
    config.headers = {}
  if (token)
    config.headers.Authorization = `Bearer ${token}`
  return config
})

http.interceptors.response.use(conf => conf,
  (e) => {
    if (e.response.status === 401) {
      localStorage.removeItem('token')
      location.reload()
    }
    return Promise.reject(e)
  },
)

export default http
