<template>
  <div class="home-page">
    <HeroSection />
    <FeaturedDestinations />
    <WhatWeOffer :offers="offers" />
    <Testimonials :reviews="reviews" />
    <CallToAction />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import HeroSection from '@/components/HeroSection.vue';
import FeaturedDestinations from '@/components/FeaturedDestinations.vue';
import WhatWeOffer from '@/components/WhatWeOffer.vue';
import Testimonials from '@/components/Testimonials.vue';
import CallToAction from '@/components/CallToAction.vue';

const offers = ref([
  {
    title: 'Customizable Trip Planning',
    description: 'We help you create your ideal vacation.',
    link: '/planner',
    buttonText: 'Plan Your Trip',
    iconClass: 'fas fa-map-marked-alt', // You'll likely replace this with heroicons
  },
  {
    title: 'Best Tour Packages',
    description: 'Explore our amazing deals for you!',
    link: '/packages',
    buttonText: 'Explore Packages',
    iconClass: 'fas fa-suitcase', // Replace with heroicons
  },
]);

const reviews = ref([
  {
    text: 'I had an amazing experience! AMARAT_LLP made my holiday so easy to plan and was so helpful.',
    author: 'John Doe',
  },
]);
</script>

<style lang="scss" scoped>

</style>