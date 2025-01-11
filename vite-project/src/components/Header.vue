<template>
    <header>
      <h1>Witaj w mojej aplikacji</h1>
      <nav>
        <ul>
          <li><a href="#">Strona główna</a></li>
          <li><a href="#">Kontakt</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
  <style scoped>
  header {
    background: #2c3e50;
    color: white;
    padding: 10px;
    text-align: center;
  }
  </style>
  