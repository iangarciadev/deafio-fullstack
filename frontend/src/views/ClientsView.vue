<template>
  <div class="container">
    <h1>Clientes</h1>

    <form @submit.prevent="handleCreate">
      <input v-model="name" placeholder="Nome" required />
      <input v-model="email" type="email" placeholder="Email" required />
      <button type="submit">Adicionar</button>
    </form>

    <ul>
      <li v-for="client in clients" :key="client.id">
        {{ client.name }} — {{ client.email }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '../services/api'

const clients = ref([])
const name = ref('')
const email = ref('')

async function fetchClients() {
  const response = await api.get('/clients')
  clients.value = response.data
}

async function handleCreate() {
  await api.post('/clients', { name: name.value, email: email.value })
  name.value = ''
  email.value = ''
  fetchClients()
}

onMounted(fetchClients)
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

input {
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
  padding: 8px 0;
  border-bottom: 1px solid #ccc;
}
</style>