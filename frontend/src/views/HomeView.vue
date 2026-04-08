<template>
  <div class="login-wrapper">
    <div class="card login-card">
      <div class="login-header">
        <h1>Desafio FullStack</h1>
        <p class="subtitle">Entre com sua conta para continuar</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-field">
          <label for="email">Email</label>
          <input id="email" v-model="email" class="input" type="email" placeholder="seu@email.com" required />
        </div>

        <div class="form-field">
          <label for="password">Senha</label>
          <input id="password" v-model="password" class="input" type="password" placeholder="••••••••" required />
        </div>

        <p v-if="error" class="error-msg">{{ error }}</p>

        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    const response = await api.post('/users/login', {
      email: email.value,
      password: password.value
    })
    localStorage.setItem('token', response.data.token)
    router.push('/clients')
  } catch {
    error.value = 'Email ou senha inválidos'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg);
  padding: 1rem;
}

.login-card {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h1 {
  color: var(--color-primary);
  margin-bottom: 0.4rem;
}

.subtitle {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn-full {
  width: 100%;
  padding: 0.7rem;
  margin-top: 0.5rem;
}

.btn-full:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
