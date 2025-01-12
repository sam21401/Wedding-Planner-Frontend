<template>
    <header class="header_section">
      <div class="container d-flex justify-content-between align-items-center">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <i class="fas fa-ring" style="color: #6b1c92; font-size: 2rem; margin-right: 10px;"></i>
          <span style="font-size: 1.5rem; font-weight: bold; color: #6b1c92;">Planer Wesela</span>
        </router-link>
  
        <!-- Nawigacja -->
        <nav class="navbar navbar-expand-lg custom_nav-container flex-grow-1">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: isActive('/') }" to="/">Start</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: isActive('/o-nas') }" to="/o-nas">O nas</router-link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Aplikacja <span class="caret"></span>
                </a>
                <ul class="dropdown-menu">
                  <li><router-link class="dropdown-item" to="/o-aplikacji/lista-gosci">Lista gości</router-link></li>
                  <li><router-link class="dropdown-item" to="/o-aplikacji/planer-stolow">Planer stołów</router-link></li>
                  <li><router-link class="dropdown-item" to="/o-aplikacji/planer-noclegow">Planer noclegów</router-link></li>
                  <li><router-link class="dropdown-item" to="/o-aplikacji/organizer-zadan">Organizer zadań</router-link></li>
                  <li><router-link class="dropdown-item" to="/o-aplikacji/statystyki">Statystyki</router-link></li>
                </ul>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: isActive('/faq') }" to="/faq">FAQ</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" :class="{ active: isActive('/kontakt') }" to="/kontakt">Kontakt</router-link>
              </li>
            </ul>
          </div>
        </nav>
  
        <!-- Zaloguj z rozwijanym menu -->
        <div class="dropdown custom-login-wrapper">
          <a href="#" class="custom-login-link dropdown-toggle" id="loginDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-user"></i> Zaloguj
          </a>
          <ul class="dropdown-menu" aria-labelledby="loginDropdown">
            <li><a class="dropdown-item" href="/login"><i class="fas fa-envelope me-2"></i>Zaloguj przez Email</a></li>
            <li><a class="dropdown-item" href="http://localhost/api/auth/google/"><i class="fab fa-google me-2"></i>Zaloguj przez Google</a></li>
            <li><a class="dropdown-item" href="http://localhost/api/auth/facebook/"><i class="fab fa-facebook-f me-2"></i>Zaloguj przez Facebook</a></li>
          </ul>
        </div>
      </div>
    </header>
  </template>
  
  <script lang="ts">
  import { useRoute } from "vue-router";
  
  export default {
    name: "Header",
    setup() {
      const route = useRoute();
  
      const isActive = (path: string) => route.path === path;
  
      return {
        isActive,
      };
    },
  };
  </script>
  
  <style scoped>
  .nav-item .active {
    font-weight: bold;
    color: #6b1c92;
  }
  </style>
  