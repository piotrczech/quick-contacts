<script setup>
import AppNavigation from './components/app/AppNavigation.vue'
import axios from '@axios'

axios.get('test')
</script>
<template>
  <v-app id="app">
    <v-app-bar>
      <v-app-bar-title>QuickContacts</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <RouterView />
    </v-main>

    <app-navigation />
  </v-app>
</template>
