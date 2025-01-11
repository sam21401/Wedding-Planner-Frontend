<template>
    <footer>
      <p>© {{ new Date().getFullYear() }} Paweł Żebrowski</p>
    </footer>
  </template>
  
  <script>
  export default {
    name: "Footer",
  };
  </script>
  
  <style scoped>
  footer {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 10px;
  }
  </style>
  