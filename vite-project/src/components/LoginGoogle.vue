<template>
  <div class="login-container">
    <div v-if="error" class="error-message">
      {{ error }}
    </div>
    <button @click="login('google')" class="login-button google">
      Zaloguj się przez Google
    </button>
    <button @click="login('facebook')" class="login-button facebook">
      Zaloguj się przez Facebook
    </button>
  </div>
</template>

<style scoped>

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 50px auto;
}


.error-message {
  color: #ff4d4d;
  font-weight: bold;
  margin-bottom: 15px;
  text-align: center;
  border: 1px solid #ff4d4d;
  padding: 10px;
  background-color: #ffe6e6;
  border-radius: 4px;
}


.login-button {
  display: inline-block;
  width: 100%;
  padding: 10px 15px;
  margin: 10px 0;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}


.login-button.google {
  background-color: #db4437;
}

.login-button.facebook {
  background-color: #1877f2;
}

.login-button:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}


.login-button:active {
  transform: scale(0.95);
}
</style>


<script>
export default {
  data() {
    return {
      error: null,
    };
  },
  created() {
    const params = new URLSearchParams(window.location.search);
    this.error = params.get("error");
  },
  methods: {
    login(provider) {
      window.location.href = `http://localhost/api/auth/${provider}`;
    },
  },
};
</script>
