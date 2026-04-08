<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Senha" required />
      <button type="submit">Entrar</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleLogin() {
  try {
    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    router.push('/clients')
  } catch {
    error.value = 'Email ou senha inválidos'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
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
</style>