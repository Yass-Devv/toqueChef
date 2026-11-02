<script setup>
import { computed } from 'vue'
import { useRecipeStore } from '@/stores/recipeStore'
import { useMenuStore } from '@/stores/menuStore'

const recipeStore = useRecipeStore()
const menuStore = useMenuStore()

const menuRecipes = computed(() =>
  menuStore.recipeIds.map((id) => recipeStore.getById(id)).filter(Boolean),
)

// Regroupe les ingrédients par nom, puis additionne les quantités qui ont la même unité.
const shoppingList = computed(() => {
  const items = new Map()

  for (const recipe of menuRecipes.value) {
    for (const item of recipe.ingredients) {
      const key = item.ingredient.trim().toLowerCase()
      if (!items.has(key)) {
        items.set(key, { name: item.ingredient.trim(), quantities: new Map() })
      }

      // Certaines quantités sont des chaînes ("30") et une recette utilise "unite" au lieu de "unit".
      const quantity = Number(item.quantity)
      if (!item.quantity || Number.isNaN(quantity)) continue

      const unit = item.unit || item.unite || ''
      const quantities = items.get(key).quantities
      quantities.set(unit, (quantities.get(unit) || 0) + quantity)
    }
  }

  return [...items.values()]
    .map(({ name, quantities }) => ({
      name,
      amount: [...quantities]
        .map(([unit, quantity]) => (unit ? `${quantity} ${unit}` : `${quantity}`))
        .join(' + '),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
})
</script>

<template>
  <div>
    <h1>Liste de courses</h1>

    <p v-if="shoppingList.length === 0" class="empty-state">
      Votre menu est vide. Ajoutez des recettes pour obtenir votre liste de courses.
    </p>

    <ul v-else class="shopping-list">
      <li v-for="item in shoppingList" :key="item.name">
        <strong>{{ item.name }}</strong>
        <span v-if="item.amount"> : {{ item.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.shopping-list {
  padding: 0;
  list-style: none;
}

.shopping-list li {
  padding: 12px 0;
  border-bottom: 1px solid #eee;
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
