<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isLoginPage = computed(() => route.path === '/')

function logout() {
  localStorage.removeItem('token')
  router.push('/')
}
</script>

<template>
  <nav v-if="!isLoginPage" class="navbar">
    <span class="navbar-brand">Desafio FullStack</span>
    <div class="navbar-links">
      <RouterLink to="/clients">Clientes</RouterLink>
      <RouterLink to="/tasks">Tarefas</RouterLink>
      <button class="btn-logout" @click="logout">Sair</button>
    </div>
  </nav>
  <main :class="{ 'main-content': !isLoginPage }">
    <RouterView />
  </main>
</template>

<style scoped>
.navbar {
  background: #fff;
  border-bottom: 1px solid var(--color-border);
  padding: 0 2rem;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow);
  position: sticky;
  top: 0;
  z-index: 10;
}

.navbar-brand {
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-primary);
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.navbar-links a {
  text-decoration: none;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.15s;
}

.navbar-links a:hover,
.navbar-links a.router-link-active {
  color: var(--color-primary);
}

.btn-logout {
  background: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 0.3rem 0.8rem;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.btn-logout:hover {
  border-color: var(--color-danger);
  color: var(--color-danger);
}

.main-content {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}
</style>
