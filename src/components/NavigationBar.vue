<template>
  <nav class="bg-white shadow-md">  <!-- Added basic styling -->
    <div class="container mx-auto px-4 flex items-center justify-between py-4">
      <router-link to="/" class="text-xl font-bold text-gray-800">AMARAT_LLP</router-link> 
      <ul class="flex space-x-6">  <!-- Adjusted spacing -->
        <NavigationBarItem to="/" label="Home" />
        <NavigationBarItem to="/about-us" label="About Us" />  <!-- Corrected route -->
        <NavigationBarItem to="/packages" label="Packages" />  <!-- Added Packages link -->
        <NavigationBarItem to="/destinations" label="Destinations" /> <!-- Added Destinations link -->
        <NavigationBarItem to="/blog" label="Blog" /> <!-- Added Blog link -->
        <!-- Conditionally render Login/Signup or Profile based on authentication status -->
        <NavigationBarItem v-if="!isAuthenticated" to="/login" label="Login" />
        <NavigationBarItem v-if="!isAuthenticated" to="/signup" label="Sign Up" />
        <NavigationBarItem v-if="isAuthenticated" to="/profile" label="Profile" />
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import NavigationBarItem from './NavigationBarItem.vue';
import { useAuthStore } from '@/store/modules/auth'


const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated); // Access isAuthenticated from the store


</script>