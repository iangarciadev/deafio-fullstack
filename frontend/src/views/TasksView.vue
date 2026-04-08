<template>
  <div>
    <div class="page-header">
      <h1>Tarefas</h1>
      <span class="count">{{ tasks.length }} tarefa{{ tasks.length !== 1 ? 's' : '' }}</span>
    </div>

    <div class="card form-card">
      <h2>Nova tarefa</h2>
      <form @submit.prevent="handleCreate" class="form-grid">
        <div class="form-field">
          <label for="title">Título</label>
          <input id="title" v-model="title" class="input" placeholder="Ex: Criar proposta" required />
        </div>
        <div class="form-field">
          <label for="description">Descrição</label>
          <input id="description" v-model="description" class="input" placeholder="Opcional" />
        </div>
        <div class="form-field">
          <label for="client">Cliente</label>
          <select id="client" v-model="clientId" class="input" required>
            <option value="" disabled>Selecione um cliente</option>
            <option v-for="client in clients" :key="client.id" :value="client.id">
              {{ client.name }}
            </option>
          </select>
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Adicionar</button>
        </div>
      </form>
    </div>

    <div class="card">
      <div class="list-header">
        <h2>Lista de tarefas</h2>
        <select v-model="statusFilter" class="input filter-select" @change="fetchTasks">
          <option value="">Todos os status</option>
          <option value="PENDING">Pendente</option>
          <option value="IN_PROGRESS">Em andamento</option>
          <option value="DONE">Concluído</option>
        </select>
      </div>

      <div v-if="tasks.length === 0" class="empty-state">
        Nenhuma tarefa encontrada.
      </div>
      <ul v-else class="task-list">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <div class="task-main">
            <span class="task-title">{{ task.title }}</span>
            <span class="task-client">{{ task.client.name }}</span>
          </div>
          <div class="task-side">
            <span :class="statusBadgeClass(task.status)" class="badge">{{ statusLabel(task.status) }}</span>
            <select v-model="task.status" class="input status-select" @change="handleUpdateStatus(task)">
              <option value="PENDING">Pendente</option>
              <option value="IN_PROGRESS">Em andamento</option>
              <option value="DONE">Concluído</option>
            </select>
          </div>
        </li>
      </ul>
    </div>
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

function statusLabel(status: string) {
  const map: Record<string, string> = {
    PENDING: 'Pendente',
    IN_PROGRESS: 'Em andamento',
    DONE: 'Concluído'
  }
  return map[status] ?? status
}

function statusBadgeClass(status: string) {
  return {
    'badge-pending': status === 'PENDING',
    'badge-in-progress': status === 'IN_PROGRESS',
    'badge-done': status === 'DONE'
  }
}

async function fetchTasks() {
  const params: Record<string, string> = {}
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

async function handleUpdateStatus(task: { id: number; status: string }) {
  await api.put(`/tasks/${task.id}`, { status: task.status })
  fetchTasks()
}

onMounted(() => {
  fetchTasks()
  fetchClients()
})
</script>

<style scoped>
.page-header {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.count {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.form-card {
  margin-bottom: 1.5rem;
}

.form-card h2 {
  margin-bottom: 1rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 1rem;
  align-items: flex-end;
}

.form-actions {
  display: flex;
  align-items: flex-end;
}

.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.filter-select {
  width: auto;
  min-width: 160px;
}

.empty-state {
  text-align: center;
  color: var(--color-text-muted);
  padding: 2rem 0;
  font-size: 0.9rem;
}

.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--color-border);
  gap: 1rem;
}

.task-item:last-child {
  border-bottom: none;
}

.task-main {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.task-title {
  font-weight: 600;
  font-size: 0.95rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-client {
  font-size: 0.82rem;
  color: var(--color-text-muted);
}

.task-side {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
}

.status-select {
  width: auto;
  font-size: 0.85rem;
  padding: 0.35rem 0.6rem;
}
</style>
