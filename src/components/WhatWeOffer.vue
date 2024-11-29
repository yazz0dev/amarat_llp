<!-- WhatWeOffer.vue -->
<template>
  <section class="what-we-offer py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">What We Offer</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div v-for="offer in offers" :key="offer.title" class="offer-card bg-gray-100 p-8 rounded-lg flex flex-col items-center">
          <i :class="offer.iconClass + ' text-4xl text-green-500 mb-4'"></i>  <!-- Heroicons classes here -->
          <h3 class="text-xl font-bold mb-2">{{ offer.title }}</h3>
          <p class="text-gray-600 mb-4">{{ offer.description }}</p>
          <router-link :to="offer.link" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            {{ offer.buttonText }} →
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  offers: {
    type: Array,
    required: true
  }
});
</script>


