<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
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

  <UContainer>
    <RouterView />
  </UContainer>
</template>
