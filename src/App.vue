<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ApplianceFilter from '@/components/ApplianceFilter.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import { recipes as allRecipes } from '@/data/recipes'

// La recherche ne se déclenche qu'à partir de 3 caractères.
const MIN_SEARCH_LENGTH = 3

// La recherche et l'appareil viennent de l'URL (?search=...&appareil=...),
// mise à jour par SearchBar et ApplianceFilter (US-07).
const route = useRoute()
const search = computed(() => route.query.search || '')
const selectedAppliance = computed(() => route.query.appareil || '')

// Ignore la casse et les accents : « crème » trouve aussi « creme ».
function normalize(text) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

const query = computed(() => normalize(search.value.trim()))
const isSearching = computed(() => query.value.length >= MIN_SEARCH_LENGTH)
const isFiltering = computed(() => isSearching.value || selectedAppliance.value !== '')

const recipes = computed(() => {
  return allRecipes.filter((recipe) => {
    const matchesAppliance =
      !selectedAppliance.value || recipe.appliance === selectedAppliance.value

    const matchesSearch =
      !isSearching.value ||
      [recipe.name, recipe.description, ...recipe.ingredients.map((item) => item.ingredient)]
        .some((text) => normalize(text).includes(query.value))

    return matchesAppliance && matchesSearch
  })
})
</script>

<template>
  <main class="container">
    <header>
      <h1>Catalogue de recettes</h1>
      <SearchBar />
      <ApplianceFilter :recipes="allRecipes" />
    </header>

    <p v-if="isFiltering" class="results-count">
      {{ recipes.length }} recette{{ recipes.length > 1 ? 's' : '' }} trouvée{{ recipes.length > 1 ? 's' : '' }}
    </p>

    <section v-if="recipes.length > 0" class="recipes-grid">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </section>

    <div v-else class="empty-state">
      <p v-if="isSearching">Aucune recette ne correspond à « {{ search.trim() }} ».</p>
      <p v-else>Aucune recette ne correspond à cet appareil.</p>
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

header h1 {
  margin: 0 0 16px;
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
  padding: 48px;
  border-radius: 8px;
  background-color: #f9f9f9;
  color: #777;
  font-size: 1.2rem;
  text-align: center;
}
</style>
