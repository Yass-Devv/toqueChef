<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ApplianceFilter from '@/components/ApplianceFilter.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import { recipes as allRecipes } from '@/data/recipes'

// La recherche ne se déclenche qu'à partir de 3 caractères.
const MIN_SEARCH_LENGTH = 3

const route = useRoute()
const router = useRouter()

// Ignore la casse et les accents : « crème » trouve aussi « creme ».
function normalize(text) {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
}

// État local des champs, initialisé depuis l'URL pour survivre à un rechargement.
const search = ref(route.query.search ? String(route.query.search) : '')
const selectedAppliance = ref(route.query.appareil ? String(route.query.appareil) : '')

// Les champs pilotent l'URL, qui reste la source de vérité pour le filtrage
// (la synchronisation fine clavier/historique est affinée en US-07).
watch(search, (value) => {
  router.replace({ query: { ...route.query, search: value || undefined } })
})

watch(selectedAppliance, (value) => {
  router.replace({ query: { ...route.query, appareil: value || undefined } })
})

const query = computed(() => normalize(String(route.query.search || '').trim()))
const isSearching = computed(() => query.value.length >= MIN_SEARCH_LENGTH)
const appareil = computed(() => route.query.appareil || '')
const isFiltering = computed(() => isSearching.value || appareil.value !== '')

const filteredRecipes = computed(() => {
  return allRecipes.filter((recipe) => {
    const matchesAppliance = !appareil.value || recipe.appliance === appareil.value

    const matchesSearch =
      !isSearching.value ||
      [recipe.name, recipe.description, ...recipe.ingredients.map((item) => item.ingredient)]
        .some((text) => normalize(text).includes(query.value))

    return matchesAppliance && matchesSearch
  })
})
</script>

<template>
  <div>
    <header>
      <h1>Catalogue de recettes</h1>
      <SearchBar v-model="search" />
      <ApplianceFilter
        :recipes="allRecipes"
        @filter-change="selectedAppliance = $event"
      />
    </header>

    <p v-if="isFiltering" class="results-count">
      {{ filteredRecipes.length }} recette{{ filteredRecipes.length > 1 ? 's' : '' }} trouvée{{ filteredRecipes.length > 1 ? 's' : '' }}
    </p>

    <section v-if="filteredRecipes.length > 0" class="recipes-grid">
      <RecipeCard
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"
      />
    </section>

    <div v-else class="empty-state">
      <p v-if="isSearching">Aucune recette ne correspond à « {{ search.trim() }} ».</p>
      <p v-else>Aucune recette ne correspond à cet appareil.</p>
    </div>
  </div>
</template>

<style scoped>
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
