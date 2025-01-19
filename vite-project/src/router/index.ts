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
  { path: '/wedding-landing-page', name: 'WeddingLandingPage', component: () => import('../views/WeddingLandingPage.vue') },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('../views/NotFound.vue') }, // Strona 404
  { path: '/goscie', name: 'Guests', component: () => import('../views/Guests.vue'),meta: { requiresAuth: true }},
  { path: '/rejestracja' , name: 'Register', component: () => import('../components/Register.vue')},
  { path: '/logowanie', name: 'Login', component: () => import('../components/Login.vue')},
  { path: '/logowanie/google', name: 'Google', component: () => import('../components/LoginGoogle.vue')},
  { path: '/logowanie/facebook', name: 'Facebook', component: () => import('../components/LoginGoogle.vue')},
  { path: '/sprawdzenie/google', name: 'GoogleCheck', component: () => import ('../components/CheckGoogle.vue')},
];


const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
