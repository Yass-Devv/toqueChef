<script setup>
defineProps({
    recipe: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <article class="recipe-card">
        <img :src="`/images/${recipe.image}`" :alt="recipe.name" class="recipe-image" />
        <div class="recipe-content">
            <h2 class="recipe-title">{{ recipe.name }}</h2>
            <p class="recipe-time">⏱ {{ recipe.time }} min</p>
        </div>
    </article>
</template>

<style scoped>
.recipe-card {
    border-radius: 12px;
    overflow: hidden;
    background-color: #ffffff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
}

.recipe-image {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.recipe-content {
    padding: 16px;
}

.recipe-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0 0 8px 0;
}

.recipe-time {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
}
</style>