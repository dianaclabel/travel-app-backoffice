<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { TourismPackage } from '@/interfaces/tourism-package'

const data = ref([])
const loading = ref(false)

const columns: TableColumn<TourismPackage>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
  },
  {
    accessorKey: 'description',
    header: 'Descripción',
  },
  {
    accessorKey: 'photo',
    header: 'Foto',
  },
  {
    accessorKey: 'createdAt',
    header: 'Fecha de creación',
    cell: ({ row }) => {
      return new Date(row.getValue('createdAt')).toLocaleString('es-PE', {
        timeStyle: 'short',
        dateStyle: 'short',
      })
    },
  },
  {
    accessorKey: 'categories',
    header: 'categorias',
  },
]

onMounted(async () => {
  loading.value = true
  const response = await fetch(import.meta.env.VITE_API_URL + '/tourism-packages')
  data.value = await response.json()
  loading.value = false
})
</script>

<template>
  <div>
    <div class="justify-between flex">
      <h1 class="text-xl font-bold">Paquetes</h1>
      <UButton to="/paquetes/nuevo">Nuevo paquete</UButton>
    </div>

    <UTable :data="data" :columns="columns" class="flex-1" :loading="loading" />
  </div>
</template>
