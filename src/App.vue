<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const topbar = ref([
  [
    {
      label: 'Travel App',
      icon: 'i-lucide-tickets-plane',
      to: '/',
    },
  ],
  [
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
  <UApp>
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
  </UApp>
</template>
