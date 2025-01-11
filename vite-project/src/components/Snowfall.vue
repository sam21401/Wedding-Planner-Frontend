<template>
    <div class="snow-container"></div>
  </template>
  
  <script>
  export default {
    mounted() {
      const snowContainer = document.querySelector(".snow-container");
      const snowflakeCount = 50;
  
      for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement("div");
        snowflake.innerHTML = "❄";
        snowflake.classList.add("snowflake");
        snowflake.style.left = Math.random() * 100 + "%";
        snowflake.style.fontSize = Math.random() * 1 + 0.8 + "em";
        snowflake.style.animationDelay = Math.random() + "s";
        snowflake.style.opacity = Math.random();
        snowContainer.appendChild(snowflake);
      }
    },
  };
  </script>
  
  <style scoped>
  .snowflake {
    position: fixed;
    top: -10%;
    z-index: 9999;
    pointer-events: none;
    color: #fff;
    animation-name: snowflakes-fall, snowflakes-shake;
    animation-duration: 10s, 3s;
    animation-timing-function: linear, ease-in-out;
    animation-iteration-count: infinite, infinite;
  }
  
  @keyframes snowflakes-fall {
    0% {
      top: -10%;
    }
    100% {
      top: 100%;
    }
  }
  
  @keyframes snowflakes-shake {
    0%,
    100% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(80px);
    }
  }
  </style>
  