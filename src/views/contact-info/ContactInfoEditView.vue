<script setup>
import ContactInfoDataForm from '@/components/contact-info/ContactInfoDataForm.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const contactInfoId = computed(() => route.params.id)
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        {{ contactInfoId }}
        <contact-info-data-form />
      </v-col>
    </v-row>
  </v-container>
</template>
