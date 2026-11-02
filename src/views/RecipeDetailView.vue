<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/recipeStore'
import { useMenuStore } from '@/stores/menuStore'

// Placeholder en attendant l'implémentation complète de l'US-06 (Étudiant B).
const route = useRoute()
const recipeStore = useRecipeStore()
const menuStore = useMenuStore()

const recipe = computed(() => recipeStore.getById(route.params.id))
const inMenu = computed(() => menuStore.isInMenu(route.params.id))

const toggleMenu = () => {
  if (inMenu.value) menuStore.removeRecipe(recipe.value.id)
  else menuStore.addRecipe(recipe.value.id)
}
</script>

<template>
  <div class="recipe-detail-placeholder">
    <RouterLink to="/">&larr; Retour aux recettes</RouterLink>

    <h1 v-if="recipe">{{ recipe.name }}</h1>
    <p v-else>Recette introuvable.</p>

    <button v-if="recipe" type="button" class="menu-button" @click="toggleMenu">
      {{ inMenu ? 'Retirer du menu' : 'Ajouter au menu' }}
    </button>

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

.menu-button {
  padding: 10px 20px;
  font: inherit;
  color: #fff;
  background: #e85d2a;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.note {
  color: #999;
  font-style: italic;
}
</style>
