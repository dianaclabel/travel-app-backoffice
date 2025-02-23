<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { authClient } from '@/lib/auth-client'

const mode = useColorMode()
const session = authClient.useSession()
const router = useRouter()

watch(session, (session) => {
  const isAuthenticated = session.data
  if (!isAuthenticated) {
    router.push({ name: 'login' })
  }
})

const topbar = computed(() => [
  [
    {
      label: 'Travel App',
      icon: 'i-lucide-tickets-plane',
      to: '/',
    },
  ],
  [
    {
      label: session.value.data?.user.name,
    },
    {
      slot: 'color-mode',
    },
  ],
])

const sidebar = ref([
  [
    {
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/',
    },
    {
      label: 'About',
      icon: 'i-lucide-info',
      to: { name: 'about' },
    },
    {
      label: 'Paquetes',
      icon: 'i-lucide-package',
      to: '/paquetes',
    },
  ],
])
</script>

<template>
  <UNavigationMenu :items="topbar" class="w-full px-4 shadow">
    <template #color-mode>
      <UButton
        :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        @click="mode = mode === 'dark' ? 'light' : 'dark'"
      />
    </template>
  </UNavigationMenu>

  <div class="grid grid-cols-[1fr_8fr] mt-8">
    <div class="px-4">
      <UNavigationMenu color="neutral" :items="sidebar" class="w-full" orientation="vertical" />
    </div>
    <div>
      <UContainer>
        <RouterView />
      </UContainer>
    </div>
  </div>
</template>
