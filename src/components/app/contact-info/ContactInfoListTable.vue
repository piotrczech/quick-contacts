<script setup>
import contactInfoListTableHeaders from '@/const/tables/contactInfoListTableHeaders'
import { useContactInfoStore } from '@/stores/contact-info'
import { onMounted } from 'vue'

const contactInfoStore = useContactInfoStore()

onMounted(() => {
  contactInfoStore.fetchContactInfoList()
})
</script>

<template>
  <v-data-table-virtual
    :headers="contactInfoListTableHeaders"
    :items="contactInfoStore.contactInfoList"
    item-value="contactInfo"
    no-data-text="Brak danych"
    :sortable="false"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn @click="editContact(item)" text> Edytuj </v-btn>
    </template>
  </v-data-table-virtual>
</template>
