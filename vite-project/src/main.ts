// src/main.ts
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/';

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// Import Font Awesome CSS
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import custom CSS
import './assets/css/responsive.css';
import './assets/css/style.css';

// Import Bootstrap JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);

app.use(router); // Użycie routera w aplikacji
app.mount('#app');
