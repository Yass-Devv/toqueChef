import { defineStore } from 'pinia'
import { recipes as initialRecipes } from '@/data/recipes'

// Seul endroit où la liste des recettes est lue et modifiée.
export const useRecipeStore = defineStore('recipes', {
  state: () => ({
    recipes: [...initialRecipes],
  }),

  getters: {
    // Appareils sans doublon, triés par ordre alphabétique
    appliances: (state) =>
      [...new Set(state.recipes.map((r) => r.appliance).filter(Boolean))].sort(),

    getById: (state) => (id) => state.recipes.find((r) => r.id === Number(id)),
  },

  actions: {
    addRecipe(recipe) {
      this.recipes.push(recipe)
    },
  },
})
