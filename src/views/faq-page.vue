<template>
  <div class="faq-container max-w-4xl mx-auto my-10 p-6">
    <h2 class="page-title text-3xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>

    <div class="faq-accordion">
      <div v-for="(item, index) in faqItems" :key="index" class="faq-item border-b border-gray-200">
        <button class="accordion-button w-full flex justify-between items-center py-4 px-6 text-left cursor-pointer" @click="toggleAccordion(index)">
          <h3 class="question text-lg font-medium text-gray-700">{{ item.question }}</h3>
          <span class="accordion-icon text-xl text-gray-600 transition-transform duration-300" :class="{ 'rotate-45': item.isOpen }">+</span>
        </button>
        <div class="accordion-content px-6 py-4 text-gray-600" v-if="item.isOpen">
          <p class="answer leading-relaxed">{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const faqItems = ref([
  {
    question: "How do I book a travel package?",
    answer: "You can easily book a travel package through our website by selecting your desired package and following the booking instructions. You can also contact our travel advisors for assistance.",
    isOpen: false,
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept major credit cards, debit cards, and online payment platforms.",
    isOpen: false,
  },
  {
    question: "Can I customize a travel package?",
    answer: "Yes, we offer customized travel packages to meet your specific needs and preferences. Contact our travel advisors to discuss your requirements.",
    isOpen: false,
  },
  // Add more FAQ items here
]);

const toggleAccordion = (index) => {
  faqItems.value[index].isOpen = !faqItems.value[index].isOpen;
};

</script>

