import { createApp } from 'vue';
import App from './App.vue';
import router from './router.js';
import { createPinia } from 'pinia';
import './style.css';
import { supabase } from './supabase.config.js'; // Import the configured supabase client

// Initialize Pinia
const pinia = createPinia();

// Create Vue app instance
const app = createApp(App);

// Use plugins
app.use(router);
app.use(pinia);

// Provide Supabase client to the app
app.provide('supabase', supabase);

// Mount the app
app.mount('#app');