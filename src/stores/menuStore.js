import { defineStore } from 'pinia'

// Menu de l'utilisateur : liste d'ids de recettes, sans doublon.
export const useMenuStore = defineStore('menu', {
  state: () => ({
    recipeIds: [],
  }),

  getters: {
    count: (state) => state.recipeIds.length,

    isInMenu: (state) => (id) => state.recipeIds.includes(Number(id)),
  },

  actions: {
    addRecipe(id) {
      const recipeId = Number(id)
      if (!this.recipeIds.includes(recipeId)) {
        this.recipeIds.push(recipeId)
      }
    },

    removeRecipe(id) {
      this.recipeIds = this.recipeIds.filter((recipeId) => recipeId !== Number(id))
    },
  },
})
