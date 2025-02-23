<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiFetch } from '@/lib/api-client'

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

const state = reactive<Partial<Schema>>({
  name: '',
  description: '',
  photo: '',
  categories: [],
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)

  try {
    await apiFetch('/tourism-packages', {
      method: 'POST',
      body: event.data,
    })
    toast.add({ title: 'Success', description: 'The package has been created.', color: 'success' })
    router.push('/paquetes')
  } catch (error) {
    toast.add({
      title: 'Error',
      description: 'An error occurred while submitting the form.',
      color: 'error',
    })
  }
}
</script>

<template>
  <UContainer>
    <UCard variant="outline">
      <template #header>
        <h1>Nuevo paquete</h1>
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
