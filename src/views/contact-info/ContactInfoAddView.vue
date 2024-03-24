<script setup>
import ContactInfoDataForm from '@/components/contact-info/ContactInfoDataForm.vue'
import { useContactInfoStore } from '@/stores/contact-info'

const contactInfoStore = useContactInfoStore()

const addNewContact = (inputsValues) => {
  contactInfoStore.addContactInfo(inputsValues)
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <contact-info-data-form @handle-submit="addNewContact" />
      </v-col>
    </v-row>
  </v-container>
</template>
