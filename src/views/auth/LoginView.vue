<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { reactive } from 'vue'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'vue-router'

const router = useRouter()

const schema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'Debe tener al menos 8 caracteres'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  await authClient.signIn.email(
    {
      email: event.data.email,
      password: event.data.password,
    },
    {
      onRequest: (ctx) => {
        // loading.value = true
      },
      onSuccess: (ctx) => {
        // loading.value = false

        router.push('/paquetes')
      },
      onError: (ctx) => {
        // loading.value = false
        toast.add({
          title: 'Error',
          description: 'An error occurred while submitting the form.',
          color: 'error',
        })
      },
    },
  )
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Correo electrónico" name="email">
      <UInput v-model="state.email" />
    </UFormField>

    <UFormField label="Contraseña" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit"> Iniciar Sesión </UButton>
  </UForm>
</template>
