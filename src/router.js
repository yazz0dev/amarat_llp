import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from './store/modules/auth';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: () => import('./views/home-page.vue') },
  { path: '/login', name: 'LoginPage', component: () => import('./views/log-in.vue') },
  { path: '/signup', name: 'SignupPage', component: () => import('./views/sign-up.vue') },
  { path: '/contact', component: () => import('./views/contact-page.vue') },
  { path: '/planner', name: 'Planner', component: () => import('./views/planner-page.vue') },
  { path: '/about-us', component: () => import('./views/about-us.vue') },
  { path: '/faq', component: () => import('./views/faq-page.vue') },
  { path: '/blog', component: () => import('./views/blog-page.vue') },
  { path: '/destinations', component: () => import('./views/destination-guides.vue') },
  { path: '/destinations/:id',  name: 'DestinationDetails', component: () => import('./views/destination-guides.vue') },
  { path: '/blog/:id', name: 'BlogPost', component: () => import('./views/blog-post.vue') },
  { path: '/packages', name: 'Packages', component: () => import('./views/packages-page.vue'), props: true },
  { path: '/packages/:id', name: 'PackagesDetail', component: () => import('./views/packages-detail.vue') },
  { path: '/booking/:id', name: 'Booking', component: () => import('./views/booking-page.vue') },
  { path: '/profile', name: 'Profile', component: () => import('./views/profile-page.vue'), meta: { requiresAuth: true } },
  { path: '/:catchAll(.*)', name: 'NotFound', component: () => import('./views/NotFound.vue') },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore(); // Access the store inside the beforeEach function
      
    //Call it to initialize and set user if they exist
    await authStore.fetchUser()
  
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
    if (requiresAuth && !authStore.isAuthenticated) {
      next('/login'); 
    } else {
      next();
    }
  });
  
  
  export default router;