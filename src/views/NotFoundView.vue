<template>
  <div class="not-found">
    <h1>Page introuvable</h1>
    <p>La page demandée n'existe pas.</p>
    <RouterLink :to="{ name: 'home' }">Revenir à l'accueil</RouterLink>
  </div>
</template>

<style scoped>
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
