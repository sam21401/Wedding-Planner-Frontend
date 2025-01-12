// src/router/index.ts

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  // Usuń referencję do Home.vue
  // Strona główna będzie obsługiwana przez App.vue
  { path: '/', name: 'Home', component: null },

  // Podstrony
  { path: '/o-nas', name: 'About', component: () => import('../views/About.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('../views/FAQ.vue') },
  { path: '/kontakt', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/o-aplikacji/lista-gosci', name: 'GuestList', component: () => import('../views/GuestList.vue') },
  { path: '/o-aplikacji/planer-stolow', name: 'TablePlanner', component: () => import('../views/TablePlanner.vue') },
  { path: '/o-aplikacji/planer-noclegow', name: 'AccommodationPlanner', component: () => import('../views/AccommodationPlanner.vue') },
  { path: '/o-aplikacji/organizer-zadan', name: 'TaskOrganizer', component: () => import('../views/TaskOrganizer.vue') },
  { path: '/o-aplikacji/statystyki', name: 'Statistics', component: () => import('../views/Statistics.vue') },

  // Trasa 404 (przechwytuje wszystkie nieznane ścieżki)
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
