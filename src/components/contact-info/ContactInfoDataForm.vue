<script setup>
import { useField, useForm } from 'vee-validate'
import validationSchema from '@/const/forms/contactInfoFormValidationSchema'

const { handleSubmit, handleReset } = useForm({ validationSchema })

const firstName = useField('firstName')
const lastName = useField('lastName')
const email = useField('email')
const phoneNumber = useField('phoneNumber')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>
<template>
  <form @submit.prevent="submit" class="w-50">
    <v-text-field
      v-model="firstName.value.value"
      :error-messages="firstName.errorMessage.value"
      class="mt-3 mb-5"
      label="Imię"
    ></v-text-field>

    <v-text-field
      v-model="lastName.value.value"
      :error-messages="lastName.errorMessage.value"
      class="mt-3 mb-5"
      label="Nazwisko"
    ></v-text-field>

    <v-text-field
      v-model="phoneNumber.value.value"
      :counter="9"
      :error-messages="phoneNumber.errorMessage.value"
      class="mt-3 mb-5"
      label="Numer telefonu"
    ></v-text-field>

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      class="mt-3 mb-5"
      label="E-mail"
    ></v-text-field>

    <v-btn class="me-4" type="submit"> Zapisz </v-btn>

    <v-btn @click="handleReset"> Wyczyść </v-btn>
  </form>
</template>
