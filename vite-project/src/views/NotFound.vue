<!-- src/views/NotFound.vue -->
<template>
    <div class="not-found">
      <h1>404 - Strona Nie Znaleziona</h1>
      <p>Przepraszamy, ale strona, której szukasz, nie istnieje.</p>
      <router-link to="/">Wróć do strony głównej</router-link>
    </div>
  </template>
  
  <script lang="ts" setup>
    // Możesz dodać tutaj logikę, jeśli jest potrzebna
  </script>
  
  <style scoped>
  .not-found {
    text-align: center;
    padding: 50px;
  }
  
  .not-found h1 {
    font-size: 3rem;
    color: #6b1c92;
  }
  
  .not-found p {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .not-found a {
    color: #6b1c92;
    text-decoration: none;
    font-weight: bold;
  }
  
  .not-found a:hover {
    text-decoration: underline;
  }
  </style>
  