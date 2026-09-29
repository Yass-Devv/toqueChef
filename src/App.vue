<script setup>
import { ref, computed } from 'vue'
import SearchBar from './components/SearchBar.vue'
import { recipes as allRecipes } from '@/data/recipes'
import RecipeCard from '@/components/RecipeCard.vue'

// La recherche ne se déclenche qu'à partir de 3 caractères
const MIN_SEARCH_LENGTH = 3

const search = ref('')

// Minuscules + suppression des accents : « Crème » trouve « creme »
function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

const query = computed(() => normalize(search.value.trim()))
const isSearching = computed(() => query.value.length >= MIN_SEARCH_LENGTH)

// On garde les recettes dont le nom, la description ou un ingrédient contient la recherche
const recipes = computed(() => {
  if (!isSearching.value) return allRecipes

  return allRecipes.filter((recipe) =>
    [recipe.name, recipe.description, ...recipe.ingredients.map((item) => item.ingredient)]
      .some((text) => normalize(text).includes(query.value))
  )
})
</script>

<template>
  <main class="container">
    <header>
      <h1>Catalogue de recettes</h1>
      <SearchBar v-model="search" />
    </header>

    <p v-if="isSearching" class="results-count">
      {{ recipes.length }} recette{{ recipes.length > 1 ? 's' : '' }} pour « {{ search.trim() }} »
    </p>

    <!-- CAS 1 : Si la liste contient des recettes -->
    <section v-if="recipes.length > 0" class="recipes-grid">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </section>

    <!-- CAS 2 : Si la liste est vide -->
    <div v-else class="empty-state">
      <p v-if="isSearching">Aucune recette ne correspond à « {{ search.trim() }} ».</p>
      <p v-else>Aucune recette disponible pour le moment.</p>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: sans-serif;
}

header {
  margin-bottom: 24px;
}

.results-count {
  margin: 0 0 16px;
  color: #666;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.empty-state {
  text-align: center;
  padding: 48px;
  color: #777;
  font-size: 1.2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>
