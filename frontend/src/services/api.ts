import axios from 'axios'

// Instância do axios configurada com a URL base da API.
const api = axios.create({
  baseURL: 'http://localhost:3000'
})

// Interceptor que injeta o token JWT no header Authorization de todas as requisições.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api