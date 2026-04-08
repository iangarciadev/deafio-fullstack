import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Store de exemplo gerada pelo Vite. Mantida como referência de uso do Pinia.
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  // Retorna o dobro do valor atual do contador.
  const doubleCount = computed(() => count.value * 2)

  // Incrementa o contador em 1.
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
