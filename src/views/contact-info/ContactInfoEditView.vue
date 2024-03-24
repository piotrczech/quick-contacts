<script setup>
import ContactInfoDataForm from '@/components/contact-info/ContactInfoDataForm.vue'
import { useContactInfoStore } from '@/stores/contact-info'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const contactInfoStore = useContactInfoStore()
const route = useRoute()

const selectedContantInfo = computed(() => contactInfoStore.getContactInfoById(route.params.id))
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <contact-info-data-form :default-values="selectedContantInfo" />
      </v-col>
    </v-row>
  </v-container>
</template>
