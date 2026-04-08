import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClientsView from '../views/ClientsView.vue'
import TasksView from '../views/TasksView.vue'

// Define as rotas da aplicação:
// / → página de login
// /clients → listagem e cadastro de clientes
// /tasks → listagem e gerenciamento de tarefas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView
    },
    {
      path: '/clients',
      component: ClientsView
    },
    {
      path: '/tasks',
      component: TasksView
    }
  ]
})

export default router