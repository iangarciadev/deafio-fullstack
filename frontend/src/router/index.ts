import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientsView from '../views/ClientsView.vue'
import TasksView from '../views/TasksView.vue'

// Define as rotas da aplicação:
// / → página de login (pública)
// /clients → listagem e cadastro de clientes (requer autenticação)
// /tasks → listagem e gerenciamento de tarefas (requer autenticação)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/clients',
      component: ClientsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/tasks',
      component: TasksView,
      meta: { requiresAuth: true }
    }
  ]
})

// Redireciona para o login se a rota exigir autenticação e o token não existir.
// Redireciona para /clients se o usuário já autenticado tentar acessar o login.
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return '/'
  }

  if (to.path === '/' && token) {
    return '/clients'
  }
})

export default router