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
    {
<<<<<<< HEAD
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/MenuView.vue'),
    },
    {
      path: '/courses',
      name: 'shopping-list',
      component: () => import('@/views/ShoppingListView.vue'),
=======
      // Toute URL inconnue : doit rester la dernière route.
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
>>>>>>> origin/main
    },
  ],
})

export default router
