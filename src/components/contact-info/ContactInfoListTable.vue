<script setup>
import contactInfoListTableHeaders from '@/const/tables/contactInfoListTableHeaders'
import { useContactInfoStore } from '@/stores/contact-info'

const contactInfoStore = useContactInfoStore()
</script>

<template>
  <v-data-table-virtual
    :headers="contactInfoListTableHeaders"
    :items="contactInfoStore.contactInfoList"
    item-value="contactInfo"
    no-data-text="Brak danych"
    :sortable="false"
    data-testid="contact-info-list-table"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn :to="{ name: 'contact-info/edit', params: { id: item.id } }" text> Edytuj </v-btn>
    </template>
  </v-data-table-virtual>
</template>
