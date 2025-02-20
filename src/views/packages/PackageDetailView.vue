<script setup lang="ts">
import type { TourismPackage } from '@/interfaces/tourism-package'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const data = ref<TourismPackage>()

async function fetchData() {
  const response = await fetch(
    import.meta.env.VITE_API_URL + '/tourism-packages/' + route.params.id,
  )
  data.value = await response.json()
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <UCard>
    <template #header>
      <h1 class="font-bold">Detalle del paquete</h1>
    </template>

    <div v-if="data" class="grid grid-cols-1 gap-4">
      <div>
        <div class="font-semibold text-primary-500">Nombre</div>
        <div>{{ data.name }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Descripción</div>
        <div>{{ data.description }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Foto</div>
        <div>{{ data.photo }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Categorías</div>
        <div>{{ data.categories.join(', ') }}</div>
      </div>
    </div>
  </UCard>
</template>
