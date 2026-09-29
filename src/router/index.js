import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // Contenu complet réalisé par l'US-06 (Étudiant B).
      path: '/recipe/:id',
      name: 'recipe-detail',
      component: () => import('@/views/RecipeDetailView.vue'),
    },
    {
      // Contenu complet réalisé par l'US-08 (Étudiant D).
      path: '/ajouter',
      name: 'recipe-new',
      component: () => import('@/views/RecipeFormView.vue'),
    },
  ],
})

export default router
