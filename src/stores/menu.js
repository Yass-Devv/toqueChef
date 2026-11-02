import { defineStore } from 'pinia'

// Store du menu : contient les recettes choisies par l'utilisateur.
export const useMenuStore = defineStore('menu', {
  state: () => ({
    recipes: [],
  }),

  getters: {
    count: (state) => state.recipes.length,
    isInMenu: (state) => (id) => state.recipes.some((r) => r.id === id),
  },

  actions: {
    // Une recette déjà présente n'est pas ajoutée une seconde fois.
    add(recipe) {
      if (this.isInMenu(recipe.id)) return
      this.recipes.push(recipe)
    },
    remove(id) {
      this.recipes = this.recipes.filter((r) => r.id !== id)
    },
  },
})
