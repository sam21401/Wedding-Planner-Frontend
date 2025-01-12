<template>
    <div class="guest-list">
      <h1>Lista Gości</h1>
      
      <!-- Przykładowa tabela gości -->
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Imię i nazwisko</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <!-- Prosty przykład - docelowo możesz to generować w pętli -->
          <tr>
            <td>Jan Kowalski</td>
            <td>Potwierdzony</td>
          </tr>
          <tr>
            <td>Anna Nowak</td>
            <td>Niezdecydowany</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup lang="ts">
  // Jeśli potrzebujesz reaktywności (np. wczytywanie gości z API), 
  // możesz użyć Composition API tutaj (onMounted, ref, itp.).
  </script>
  
  <style scoped>
  .guest-list {
    margin: 2rem auto;
    max-width: 600px;
  }
  </style>
  