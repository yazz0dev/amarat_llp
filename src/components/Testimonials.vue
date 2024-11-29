<!-- Testimonials.vue -->
<template>
  <section class="testimonials py-16 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center mb-8">What Our Travelers Say</h2>
      <div class="testimonial-slider flex snap-x overflow-x-auto">
          <div v-for="(review, index) in reviews" :key="index" class="testimonial-slide snap-start shrink-0 w-full sm:w-1/2 md:w-1/3 px-4"> <!---shrink-0 to prevent shrinking on overflow -->
             <div class="bg-white p-8 rounded-lg shadow-lg">   <!---Card wrapper for each testimonial -->
              <p class="text-lg italic mb-4">"{{ review.text }}"</p>
              <p class="font-bold">- {{ review.author }}</p>
             </div>
          </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
    reviews: {
        type: Array,
        required: true,
      },
});

</script>

