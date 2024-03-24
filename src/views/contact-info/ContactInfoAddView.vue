<script setup>
import ContactInfoDataForm from '@/components/contact-info/ContactInfoDataForm.vue'

const addNewContact = (inputValues) => {
  console.log(inputValues)
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
