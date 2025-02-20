<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { TourismPackage } from '@/interfaces/tourism-package'

const toast = useToast()

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
    header: 'Categorias',
    cell: ({ row }) => {
      return (row.getValue('categories') as string[])?.join(', ')
    },
  },
  {
    id: 'action',
    header: 'Acciones',
  },
]

onMounted(async () => {
  await fetchPackages()
})

async function fetchPackages() {
  loading.value = true
  const response = await fetch(import.meta.env.VITE_API_URL + '/tourism-packages')
  data.value = await response.json()
  loading.value = false
}

async function deletePackage(id: string) {
  const response = await fetch(import.meta.env.VITE_API_URL + '/tourism-packages/' + id, {
    method: 'DELETE',
  })

  if (!response.ok) {
    toast.add({
      title: 'Error',
      description: 'Ocurrió un error al eliminar el paquete.',
      color: 'error',
    })
    return
  }

  toast.add({
    title: 'Éxito',
    description: 'El paquete ha sido eliminado.',
    color: 'success',
  })

  await fetchPackages()
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="justify-between flex">
        <h1 class="text-xl font-bold">Paquetes</h1>
        <UButton to="/paquetes/nuevo">Nuevo paquete</UButton>
      </div>
    </template>

    <UTable :data="data" :columns="columns" class="flex-1" :loading="loading">
      <template #action-cell="{ row }">
        <UButton
          icon="i-lucide-eye"
          color="info"
          variant="ghost"
          :to="`/paquetes/${row.original._id}`"
        />
        <UButton
          icon="i-lucide-pen"
          color="warning"
          variant="ghost"
          :to="`/paquetes/${row.original._id}/editar`"
        />
        <UButton
          icon="i-lucide-trash-2"
          color="error"
          variant="ghost"
          @click="deletePackage(row.original._id)"
        />
      </template>
    </UTable>
  </UCard>
</template>
