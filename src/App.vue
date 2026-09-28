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
    <!-- Vérification temporaire que la saisie est bien capturée -->
    <p v-if="search">Recherche : « {{ search }} »</p>
  </main>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px 16px;
}

.header h1 {
  margin: 0;
}

.content {
  padding: 0 16px;
  text-align: center;
}
</style>