import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // La page est affichée par App.vue : cette route sert seulement à ce que « / »
    // soit reconnue quand la recherche et le filtre modifient l'URL (US-07).
    { path: '/', name: 'home', component: { render: () => null } },
  ],
})

export default router
