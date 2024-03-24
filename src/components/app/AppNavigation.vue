<template>
  <v-bottom-navigation grow>
    <v-btn value="home" :to="{ name: 'contact-info/list' }">
      <v-icon>mdi-book-account</v-icon>
      <span>Contacts</span>
    </v-btn>

    <v-btn value="add" :to="{ name: 'contact-info/add' }">
      <v-icon>mdi-phone-plus</v-icon>
      <span>Add</span>
    </v-btn>
  </v-bottom-navigation>
</template>
