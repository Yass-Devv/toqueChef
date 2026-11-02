<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { recipes } from '@/data/recipes'

const router = useRouter()

const form = ref({
  name: '',
  time: 0,
  servings: 1,
  appliance: '',
  image: '',
  description: '',
})

// Appareils existants, sans doublons
const appliances = computed(() => [...new Set(recipes.map((r) => r.appliance))].sort())

// Aucune validation pour l'instant (US ultérieure)
const submit = () => {
  const newRecipe = {
    ...form.value,
    id: Date.now(),
    ingredients: [],
    ustensils: [],
  }
  recipes.push(newRecipe)
  router.push({ name: 'recipe-detail', params: { id: newRecipe.id } })
}
</script>

<template>
  <div class="recipe-form">
    <RouterLink to="/">&larr; Retour aux recettes</RouterLink>

    <h1>Ajouter une recette</h1>

    <form @submit.prevent="submit">
      <label>
        Nom
        <input v-model="form.name" type="text" />
      </label>

      <label>
        Temps (minutes)
        <input v-model.number="form.time" type="number" min="0" />
      </label>

      <label>
        Portions
        <input v-model.number="form.servings" type="number" min="1" />
      </label>

      <label>
        Appareil
        <select v-model="form.appliance">
          <option value="">-- Choisir --</option>
          <option v-for="a in appliances" :key="a" :value="a">{{ a }}</option>
        </select>
      </label>

      <label>
        Nom du fichier image
        <input v-model="form.image" type="text" placeholder="Recette01.jpg" />
      </label>

      <label>
        Description
        <textarea v-model="form.description" rows="5"></textarea>
      </label>

      <button type="submit">Ajouter la recette</button>
    </form>
  </div>
</template>

<style scoped>
.recipe-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px 0;
  font-family: sans-serif;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-weight: bold;
}

input,
select,
textarea {
  padding: 10px;
  font: inherit;
  font-weight: normal;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
}

button {
  align-self: flex-start;
  padding: 10px 20px;
  font: inherit;
  color: #fff;
  background: #e85d2a;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>
