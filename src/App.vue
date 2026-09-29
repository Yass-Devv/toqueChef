<template>
  <main>
    <!-- Ton filtre -->
    <ApplianceFilter 
      :recipes="mockRecipes" 
      @filter-change="handleFilter" 
    />
    
    <p>Appareil sélectionné : {{ currentFilter || 'Tous' }}</p>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import ApplianceFilter from '@/components/ApplianceFilter.vue';

const currentFilter = ref('');

// Fausse liste de test pour valider le dédoublonnage
const mockRecipes = ref([
  { id: 1, name: 'Salade', appliance: 'Saladier' },
  { id: 2, name: 'Tarte', appliance: 'Four' },
  { id: 3, name: 'Gratin', appliance: 'Four' }, // Doublon intentionnel
  { id: 4, name: 'Smoothie', appliance: 'Blender' }
]);

const handleFilter = (selected) => {
  currentFilter.value = selected;
  console.log('Appareil à filtrer :', selected);
};
</script>