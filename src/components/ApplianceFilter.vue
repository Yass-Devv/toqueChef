<template>
  <div class="filter-container">
    <label for="appliance-select" class="filter-label">Appareil :</label>
    <select 
      id="appliance-select" 
      v-model="selectedAppliance" 
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
import { ref, computed } from 'vue';

// 1. Reçoit soit la liste des recettes, soit directement une liste d'appareils
const props = defineProps({
  recipes: {
    type: Array,
    default: () => []
  }
});

// 2. Déclare l'événement pour transmettre la valeur choisie au parent
const emit = defineEmits(['filter-change']);

// 3. Option par défaut sélectionnée au départ ("Tous les appareils")
const selectedAppliance = ref('');

// 4. Génération dynamique sans doublons (Set) et triée par ordre alphabétique
const applianceList = computed(() => {
  if (!props.recipes || props.recipes.length === 0) return [];
  
  const appliances = props.recipes
    .map(recipe => recipe.appliance) // adapte la clé si elle s'appelle différemment (ex: appareil)
    .filter(Boolean); // retire les valeurs nulles ou indéfinies

  return [...new Set(appliances)].sort();
});

// 5. Envoi de l'événement lors de la sélection
const onApplianceChange = () => {
  emit('filter-change', selectedAppliance.value);
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