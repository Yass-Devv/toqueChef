<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  placeholder: { type: String, default: 'Rechercher une recette…' },
})

const route = useRoute()
const router = useRouter()

// La recherche est lue depuis l'URL (?search=...) pour survivre à un rechargement
const search = computed(() => route.query.search || '')

// replace et non push : pas d'entrée d'historique à chaque lettre.
// Une valeur undefined retire la clé de l'URL.
function updateSearch(value) {
  router.replace({
    query: { ...route.query, search: value || undefined },
  })
}

const onInput = (e) => updateSearch(e.target.value)

const inputRef = ref(null)

function clear() {
  updateSearch('')
  inputRef.value?.focus()
}
</script>

<template>
  <div class="search" role="search">
    <label for="recipe-search" class="visually-hidden">Rechercher une recette</label>

    <svg class="search__icon" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>

    <input
      id="recipe-search"
      ref="inputRef"
      :value="search"
      type="search"
      class="search__input"
      :placeholder="placeholder"
      autocomplete="off"
      @input="onInput"
      @keydown.esc="clear"
    />

    <button
      v-if="search"
      type="button"
      class="search__clear"
      aria-label="Effacer la recherche"
      @click="clear"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
/* Couleurs de la charte : à ajuster ici */
.search {
  --color-primary: #e85d2a;
  --color-text: #2b2b2b;
  --color-placeholder: #9a9a9a;
  --color-border: #dcdcdc;
  --color-bg: #ffffff;
  --radius: 999px;

  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 560px;
}

.search__icon {
  position: absolute;
  left: 16px;
  width: 20px;
  height: 20px;
  fill: none;
  stroke: var(--color-placeholder);
  stroke-width: 2;
  stroke-linecap: round;
  pointer-events: none;
  transition: stroke 0.2s;
}

.search__input {
  width: 100%;
  padding: 12px 48px 12px 48px;
  font: inherit;
  font-size: 1rem;
  color: var(--color-text);
  background: var(--color-bg);
  border: 2px solid var(--color-border);
  border-radius: var(--radius);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.search__input::placeholder {
  color: var(--color-placeholder);
}

.search__input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.search:focus-within .search__icon {
  stroke: var(--color-primary);
}

/* Masque la croix native des navigateurs (on a la nôtre) */
.search__input::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
}

.search__clear {
  position: absolute;
  right: 10px;
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s;
}

.search__clear svg {
  width: 16px;
  height: 16px;
  stroke: var(--color-text);
  stroke-width: 2.5;
  stroke-linecap: round;
}

.search__clear:hover,
.search__clear:focus-visible {
  background: color-mix(in srgb, var(--color-primary) 15%, transparent);
  outline: none;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>