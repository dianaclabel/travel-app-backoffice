<script setup lang="ts">
import { authClient } from '@/lib/auth-client'

const session = authClient.useSession()
</script>

<template>
  <main>
    <h1>Home</h1>
    <UAlert
      title="Heads up!"
      icon="lucide:package"
      :avatar="{
        src: 'https://github.com/nuxt.png',
      }"
      color="neutral"
    />
    <div v-if="session.data">
      <pre>{{ session.data.user.name }}</pre>
      <UButton @click="authClient.signOut()">Sign out</UButton>
    </div>
  </main>
</template>
