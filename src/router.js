import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/home-page.vue';
import LoginPage from './components/log-in.vue';
import SignupPage from './components/sign-up.vue';
import ContactPage from './components/contact-page.vue';
import PlannerPage from './components/planner-page.vue';
import PackagesPage from './components/packages-page.vue';
import AboutUsPage from './components/about-us.vue';
import FAQPage from './components/faq-page.vue';
import BlogPage from './components/blog-page.vue';
import DestinationGuidesPage from './components/destination-guides.vue';
import BlogPost from './components/blog-post.vue'; // Import BlogPost component
import DestinationDetail from './components/destination-detail.vue';
import PackagesDetail from './components/packages-detail.vue';
import BookingPage from './components/booking-page.vue';
import ProfilePage from './components/profile-page.vue';


const routes = [
  { path: '/', redirect: '/home' }, // Redirect to /home
  { path: '/home', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignupPage },
  { path: '/contact', component: ContactPage },
  { path: '/planner', component: PlannerPage },
  { path: '/packages', component: PackagesPage },
  { path: '/about-us', component: AboutUsPage },
  { path: '/faq', component: FAQPage },
  { path: '/blog', component: BlogPage },
  { path: '/destinations', component: DestinationGuidesPage },
  { path: '/blog/:id', name: 'BlogPost', component: BlogPost },
  { path: '/destination/:id', name: 'DestinationDetail', component: DestinationDetail },
  { path: '/package/:id', name: 'PackagesDetail', component: PackagesDetail },
  { path: '/booking/:id', name: 'Booking', component: BookingPage },
  { path: '/profile', name: 'Profile', component: ProfilePage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    const token = localStorage.getItem('token');
    if (!token) {
      next({ name: 'Log-in' }); // Redirect to login if no token
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;