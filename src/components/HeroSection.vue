<!-- HeroSection.vue -->
<template>
  <section class="hero-section h-screen bg-cover bg-center bg-no-repeat text-white relative" :style="{ 'background-image': `url(${heroImageUrl})` }">
      <div class="hero-overlay absolute inset-0 bg-black opacity-50"></div>  <!-- Overlay for better text contrast -->
    <div class="hero-content container mx-auto px-4 py-24 text-center relative z-10"> <!-- z-10 for content above overlay -->
      <h1 class="text-4xl md:text-6xl font-bold mb-4">Amrat Holidays LLP</h1>
      <h2 class="text-2xl md:text-3xl mb-8">Your Gateway to Unforgettable Travel Experiences</h2>
      <div class="hero-buttons space-x-4">
        <router-link to="/packages" class="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Browse Packages</router-link>
        <router-link to="/planner" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300">Start Planning</router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import heroImageUrl from '@/assets/hero-image.jpg'; // Make sure this path is correct
</script>

<style scoped lang="scss">
.hero-section {
  min-height: calc(100vh - 70px); /* Adjust as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}



/* Responsive adjustments with Tailwind */
@media (min-width: 768px) { /* Example breakpoint */

}
</style>