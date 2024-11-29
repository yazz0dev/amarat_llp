<!-- Footer.vue -->
<template>
    <footer class="bg-gray-800 text-white py-8 mt-16">
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <!-- Left Section: Copyright and Social Links (Placeholder) -->
        <div class="mb-4 md:mb-0">
          <p class="text-sm">© 2024 AMARAT_LLP. All rights reserved.</p>
        </div>
  
        <!-- Right Section: Navigation Links (Example) -->
        <div class="flex space-x-6">
          <router-link to="/about-us" class="hover:text-gray-300 transition duration-300 flex items-center">
            <InformationCircleIcon class="h-5 w-5 mr-1" /> About Us
          </router-link>
          <router-link to="/faq-page" class="hover:text-gray-300 transition duration-300 flex items-center">
            <QuestionMarkCircleIcon class="h-5 w-5 mr-1" /> FAQ
          </router-link>
           <router-link to="/contact-page" class="hover:text-gray-300 transition duration-300 flex items-center">
            <EnvelopeIcon class="h-5 w-5 mr-1" /> Contact
          </router-link>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import {
    InformationCircleIcon,
    QuestionMarkCircleIcon,
    EnvelopeIcon
  } from '@heroicons/vue/24/outline';
  </script>