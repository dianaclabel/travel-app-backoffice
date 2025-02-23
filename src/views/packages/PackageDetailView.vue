<script setup lang="ts">
import { apiFetch } from '@/lib/api-client'
import type { TourismPackage } from '@/interfaces/tourism-package'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const record = ref<TourismPackage>()

async function fetchData() {
  record.value = await apiFetch('/tourism-packages/' + route.params.id)
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

    <div v-if="record" class="grid grid-cols-1 gap-4">
      <div>
        <div class="font-semibold text-primary-500">Nombre</div>
        <div>{{ record.name }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Descripción</div>
        <div>{{ record.description }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Foto</div>
        <div>{{ record.photo }}</div>
      </div>

      <div>
        <div class="font-semibold text-primary-500">Categorías</div>
        <div>{{ record.categories.join(', ') }}</div>
      </div>
    </div>
  </UCard>
</template>
