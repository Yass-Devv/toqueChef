<script setup>
import { computed } from 'vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useRecipeStore } from '@/stores/recipeStore'
import { useMenuStore } from '@/stores/menuStore'

const recipeStore = useRecipeStore()
const menuStore = useMenuStore()

const menuRecipes = computed(() =>
  menuStore.recipeIds.map((id) => recipeStore.getById(id)).filter(Boolean),
)
</script>

<template>
  <div>
    <h1>Mon menu</h1>

    <p v-if="menuRecipes.length === 0" class="empty-state">
      Votre menu est vide. Ajoutez des recettes depuis leur fiche.
    </p>

    <section v-else class="recipes-grid">
      <div v-for="recipe in menuRecipes" :key="recipe.id" class="menu-item">
        <RecipeCard :recipe="recipe" />
        <button type="button" class="remove-button" @click="menuStore.removeRecipe(recipe.id)">
          Retirer du menu
        </button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
}

.menu-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.remove-button {
  padding: 8px 16px;
  font: inherit;
  color: #e85d2a;
  background: #fff;
  border: 1px solid #e85d2a;
  border-radius: 6px;
  cursor: pointer;
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
