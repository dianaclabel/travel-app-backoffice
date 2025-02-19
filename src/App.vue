<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useColorMode } from '@vueuse/core'

const mode = useColorMode()

const items = ref([
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
  [
    {
      slot: 'color-mode',
    },
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank',
    },
  ],
])
</script>

<template>
  <UApp>
    <UNavigationMenu color="neutral" :items="items" class="w-full">
      <template #color-mode>
        <UButton
          :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'"
          color="neutral"
          variant="ghost"
          @click="mode = mode === 'dark' ? 'light' : 'dark'"
        />
      </template>
    </UNavigationMenu>

    <UContainer>
      <RouterView />
    </UContainer>
  </UApp>
</template>
