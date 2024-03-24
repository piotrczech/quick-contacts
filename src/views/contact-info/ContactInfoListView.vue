<script setup>
import ContactInfoListTable from '@/components/contact-info/ContactInfoListTable.vue'
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <contact-info-list-table class="max-w-md w-full" />
      </v-col>
    </v-row>
  </v-container>
</template>
