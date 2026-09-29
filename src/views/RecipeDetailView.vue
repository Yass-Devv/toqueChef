<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { recipes } from '@/data/recipes'

// Placeholder en attendant l'implémentation complète de l'US-06 (Étudiant B).
const route = useRoute()

const recipe = computed(() => recipes.find((r) => r.id === Number(route.params.id)))
</script>

<template>
  <div class="recipe-detail-placeholder">
    <RouterLink to="/">&larr; Retour aux recettes</RouterLink>

    <h1 v-if="recipe">{{ recipe.name }}</h1>
    <p v-else>Recette introuvable.</p>

    <p class="note">Page de détail complète à venir (US-06).</p>
  </div>
</template>

<style scoped>
.recipe-detail-placeholder {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 0;
  font-family: sans-serif;
}

.note {
  color: #999;
  font-style: italic;
}
</style>
