<script setup>
import contactInfoListTableHeaders from '@/const/tables/contactInfoListTableHeaders'
</script>

<template>
  <v-data-table-virtual
    :headers="contactInfoListTableHeaders"
    :items="[
      {
        id: 2,
        firstName: 'Katarzyna',
        lastName: 'Tomaszkiewicz',
        phoneNumber: '000000000',
        email: 'kasia@skrzynka.pl'
      }
    ]"
    item-value="contactInfo"
    no-data-text="Brak danych"
    :sortable="false"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn @click="editContact(item)" text> Edytuj </v-btn>
    </template>
  </v-data-table-virtual>
</template>
