import axios from 'axios'
import router from '../router'

// Instância do axios configurada com a URL base da API definida em VITE_API_URL.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Interceptor que injeta o token JWT no header Authorization de todas as requisições.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor de resposta: se o backend retornar 401, o token está inválido ou
// expirado — remove-o do localStorage e redireciona para o login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      router.push('/')
    }
    return Promise.reject(error)
  }
)

export default api