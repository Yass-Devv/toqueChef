<script setup>
</script>

<template>
  <div class="app">
    <nav class="main-nav">
      <RouterLink to="/" class="main-nav__link">Recettes</RouterLink>
      <RouterLink to="/ajouter" class="main-nav__link">Ajouter une recette</RouterLink>
    </nav>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-nav {
  display: flex;
  gap: 24px;
  padding: 16px 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #eee;
  font-family: sans-serif;
}

.main-nav__link {
  color: #2b2b2b;
  text-decoration: none;
  font-weight: 600;
}

.main-nav__link:hover,
.main-nav__link.router-link-active {
  color: #e85d2a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  font-family: sans-serif;
}
</style>
