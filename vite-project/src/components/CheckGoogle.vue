<template>
  <div>
    <p>Ładowanie, proszę czekać...</p>
  </div>
</template>

<script>
import apiClient from "@/services/api.js";

export default {
  created() {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem("auth_token", token);
      this.$router.push({ name: "WeddingLandingPage" });
    } else {
      this.$router.push({ name: "Login" });
    }
  },
};
</script>
