<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { recipes } from '@/data/recipes'

const route = useRoute()
const router = useRouter()

// route.params.id est une chaîne ("3") : on la convertit pour comparer avec l'id numérique.
const recipe = computed(() => recipes.find((r) => r.id === Number(route.params.id)))

// Une recette des données utilise la clé "unite" au lieu de "unit".
const unitOf = (item) => item.unit || item.unite

// Sans page précédente (lien ouvert directement), on renvoie vers l'accueil.
function goBack() {
  if (window.history.state?.back) {
    router.back()
  } else {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <div class="recipe-detail">
    <button type="button" class="back-button" @click="goBack">&larr; Retour</button>

    <div v-if="!recipe" class="not-found">
      <h1>Recette introuvable</h1>
      <p>Aucune recette ne correspond à cet identifiant.</p>
      <RouterLink :to="{ name: 'home' }">Revenir à l'accueil</RouterLink>
    </div>

    <article v-else>
      <img :src="`/images/${recipe.image}`" :alt="recipe.name" class="recipe-image" />

      <h1>{{ recipe.name }}</h1>

      <ul class="recipe-meta">
        <li>⏱ {{ recipe.time }} min</li>
        <li>🍽 {{ recipe.servings }} portion{{ recipe.servings > 1 ? 's' : '' }}</li>
        <li>🔌 {{ recipe.appliance }}</li>
      </ul>

      <div class="recipe-columns">
        <section>
          <h2>Ingrédients</h2>
          <ul>
            <li v-for="item in recipe.ingredients" :key="item.ingredient">
              <strong>{{ item.ingredient }}</strong>
              <span v-if="item.quantity"> : {{ item.quantity }}</span>
              <span v-if="item.quantity && unitOf(item)"> {{ unitOf(item) }}</span>
            </li>
          </ul>
        </section>

        <section>
          <h2>Ustensiles</h2>
          <ul>
            <li v-for="ustensil in recipe.ustensils" :key="ustensil">{{ ustensil }}</li>
          </ul>
        </section>
      </div>

      <section>
        <h2>Préparation</h2>
        <p class="recipe-description">{{ recipe.description }}</p>
      </section>
    </article>
  </div>
</template>

<style scoped>
.recipe-detail {
  max-width: 800px;
  margin: 0 auto;
}

.back-button {
  margin-bottom: 24px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 999px;
  background-color: #fff;
  font: inherit;
  cursor: pointer;
}

.back-button:hover {
  border-color: #e85d2a;
  color: #e85d2a;
}

.recipe-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 12px;
}

.recipe-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 0;
  list-style: none;
  color: #666;
}

.recipe-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
}

.recipe-description {
  line-height: 1.6;
}

.not-found {
  padding: 48px;
  border-radius: 8px;
  background-color: #f9f9f9;
  text-align: center;
}

.not-found a {
  color: #e85d2a;
  font-weight: 600;
}
</style>
