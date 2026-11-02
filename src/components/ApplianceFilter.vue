<template>
  <div class="filter-container">
    <label for="appliance-select" class="filter-label">Appareil :</label>
    <select 
      id="appliance-select" 
      :value="selectedAppliance"
      @change="onApplianceChange"
      class="filter-select"
    >
      <option value="">Tous les appareils</option>
      <option 
        v-for="appliance in applianceList" 
        :key="appliance" 
        :value="appliance"
      >
        {{ appliance }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useRecipeStore } from '@/stores/recipeStore';

const recipeStore = useRecipeStore();

const route = useRoute();
const router = useRouter();

// 2. L'appareil choisi est lu depuis l'URL (?appareil=...), "" = "Tous les appareils"
const selectedAppliance = computed(() => route.query.appareil || '');

// 3. Appareils sans doublon, fournis par le store
const applianceList = computed(() => recipeStore.appliances);

// 5. Mise à jour de l'URL lors de la sélection (replace : pas d'entrée d'historique).
// "Tous les appareils" donne undefined, ce qui retire la clé de l'URL.
const onApplianceChange = (e) => {
  router.replace({
    query: { ...route.query, appareil: e.target.value || undefined }
  });
};
</script>

<style scoped>
.filter-container {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
}

.filter-label {
  font-weight: 600;
  font-size: 0.95rem;
}

.filter-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background-color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s;
}

.filter-select:focus {
  border-color: #42b883; /* Vert Vue */
}
</style>