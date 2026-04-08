<template>
  <div class="container">
    <h1>Tarefas</h1>

    <form @submit.prevent="handleCreate">
      <input v-model="title" placeholder="Título" required />
      <input v-model="description" placeholder="Descrição" />
      <select v-model="clientId" required>
        <option value="" disabled>Selecione um cliente</option>
        <option v-for="client in clients" :key="client.id" :value="client.id">
          {{ client.name }}
        </option>
      </select>
      <button type="submit">Adicionar</button>
    </form>

    <div class="filters">
      <select v-model="statusFilter" @change="fetchTasks">
        <option value="">Todos os status</option>
        <option value="PENDING">Pendente</option>
        <option value="IN_PROGRESS">Em andamento</option>
        <option value="DONE">Concluído</option>
      </select>
    </div>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <div>
          <strong>{{ task.title }}</strong> — {{ task.status }}
          <br />
          <small>Cliente: {{ task.client.name }}</small>
        </div>
        <select v-model="task.status" @change="handleUpdateStatus(task)">
          <option value="PENDING">Pendente</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="DONE">Concluído</option>
        </select>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'

const tasks = ref<{ id: number; title: string; status: string; client: { name: string } }[]>([])
const clients = ref<{ id: number; name: string }[]>([])
const title = ref('')
const description = ref('')
const clientId = ref('')
const statusFilter = ref('')

async function fetchTasks() {
  const params: any = {}
  if (statusFilter.value) params.status = statusFilter.value
  const response = await api.get('/tasks', { params })
  tasks.value = response.data
}

async function fetchClients() {
  const response = await api.get('/clients')
  clients.value = response.data
}

async function handleCreate() {
  await api.post('/tasks', {
    title: title.value,
    description: description.value,
    clientId: clientId.value
  })
  title.value = ''
  description.value = ''
  clientId.value = ''
  fetchTasks()
}

async function handleUpdateStatus(task: any) {
  await api.put(`/tasks/${task.id}`, { status: task.status })
  fetchTasks()
}

onMounted(() => {
  fetchTasks()
  fetchClients()
})
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input, select {
  padding: 8px;
  font-size: 16px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>