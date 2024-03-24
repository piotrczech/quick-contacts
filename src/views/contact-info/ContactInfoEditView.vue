<script setup>
import ContactInfoDataForm from '@/components/contact-info/ContactInfoDataForm.vue'
import { useContactInfoStore } from '@/stores/contact-info'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const contactInfoStore = useContactInfoStore()
const router = useRouter()
const route = useRoute()

const selectedContantInfo = computed(() => contactInfoStore.getContactInfoById(route.params.id))

onMounted(() => {
  contactInfoStore.fetchContactInfo(route.params.id)
})

const editContact = (inputsValues) => {
  contactInfoStore.editContactInfo(route.params.id, inputsValues)
  router.push({ name: 'contact-info/list' })
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <contact-info-data-form
          @handle-submit="editContact"
          :default-values="selectedContantInfo"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
