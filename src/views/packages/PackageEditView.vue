<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { apiFetch } from '@/lib/api-client'

const route = useRoute()

const toast = useToast()
const router = useRouter()
const items = ref(['Treking', 'Deportes extremos', 'Gastronomìa', 'Aventura'])

const schema = z.object({
  name: z.string().min(3, 'Debe tener al menos 3 caracteres'),
  description: z.string().min(5, 'Debe tener al menos 100 caracteres'),
  photo: z.string().url('URL inválida'),
  categories: z.array(z.string()).min(1, 'Se requiere al menos una categoría'),
})

type Schema = z.output<typeof schema>

let state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  photo: '',
  categories: [],
})

async function fetchData() {
  const data = await apiFetch('/tourism-packages/' + route.params.id)
  Object.assign(state, data)
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await apiFetch('/tourism-packages/' + route.params.id, {
      method: 'PUT',
      body: event.data,
    })

    toast.add({ title: 'Éxito', description: 'El paquete ha sido actualizado.', color: 'success' })
    router.push('/paquetes')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'Ocurrió un error al enviar el formulario.',
      color: 'error',
    })
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <UContainer>
    <UCard variant="outline">
      <template #header>
        <h1>Editar paquete</h1>
      </template>

      <UForm :schema="schema" :state="state" class="space-y-4 max-w-sm mx-auto" @submit="onSubmit">
        <UFormField label="Nombre" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Descripción" name="description">
          <UInput v-model="state.description" class="w-full" />
        </UFormField>
        <UFormField label="Foto" name="photo">
          <UInput v-model="state.photo" class="w-full" />
        </UFormField>
        <UFormField label="Categorias" name="categories">
          <UInputMenu v-model="state.categories" multiple :items="items" class="w-full" />
        </UFormField>
        <UButton type="submit" class="w-full justify-center"> Submit </UButton>
      </UForm>
    </UCard>
  </UContainer>
</template>
