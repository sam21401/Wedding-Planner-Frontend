import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: () => import('../views/Home.vue') },
  { path: '/o-nas', name: 'About', component: () => import('../views/About.vue') },
  { path: '/faq', name: 'FAQ', component: () => import('../views/FAQ.vue') },
  { path: '/kontakt', name: 'Contact', component: () => import('../views/Contact.vue') },
  { path: '/o-aplikacji/lista-gosci', name: 'GuestList', component: () => import('../views/GuestList.vue') },
  { path: '/o-aplikacji/planer-stolow', name: 'TablePlanner', component: () => import('../views/TablePlanner.vue') },
  { path: '/o-aplikacji/planer-noclegow', name: 'AccommodationPlanner', component: () => import('../views/AccommodationPlanner.vue') },
  { path: '/o-aplikacji/organizer-zadan', name: 'TaskOrganizer', component: () => import('../views/TaskOrganizer.vue') },
  { path: '/o-aplikacji/statystyki', name: 'Statistics', component: () => import('../views/Statistics.vue') },
  { path: '/wedding-landing-page', name: 'WeddingLandingPage', component: () => import('../views/WeddingLandingPage.vue') },
  { path: '/wedding-page-view', name: 'WeddingPageView', component: () => import('../views/WeddingPageView.vue') }, // Poprawiona ścieżka
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') } // Strona 404
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
