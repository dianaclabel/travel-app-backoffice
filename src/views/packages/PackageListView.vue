<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TableColumn } from '@nuxt/ui'
import type { TourismPackage } from '@/interfaces/tourism-package'
import { apiFetch } from '@/lib/api-client'

const toast = useToast()

const data = ref<TourismPackage[]>([])
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
  data.value = await apiFetch('/tourism-packages')
  loading.value = false
}

async function deletePackage(id: string) {
  try {
    await apiFetch('/tourism-packages/' + id, {
      method: 'DELETE',
    })

    toast.add({
      title: 'Éxito',
      description: 'El paquete ha sido eliminado.',
      color: 'success',
    })

    await fetchPackages()
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Ocurrió un error al eliminar el paquete.',
      color: 'error',
    })
  }
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

    <UTable
      id="table"
      :data="data"
      :columns="columns"
      class="flex-1 custom-table"
      :loading="loading"
    >
      <template #action-cell="{ row }">
        <UButton
          class="link"
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

<style scoped>
.custom-table :deep(tbody tr:hover) {
  background-color: rgba(53, 53, 53, 0.027);
}
</style>
