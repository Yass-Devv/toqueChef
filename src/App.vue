<script setup>
import { ref } from 'vue'
import SearchBar from './components/SearchBar.vue'

const search = ref('')
</script>

<template>
  <header class="header">
    <h1>Catalogue de recettes</h1>
    <SearchBar v-model="search" />
  </header>

  <main class="content">
      <p v-if="search">Recherche : « {{ search }} »</p>
  </main>

</template>

<style scoped></style>