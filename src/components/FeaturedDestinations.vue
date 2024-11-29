<!-- FeaturedDestinations.vue -->
<template>
  <div v-if="destinations"> 
    <DestinationCard v-for="destination in destinations" :key="destination.id" :destination="destination" />
  </div>
  <div v-else>Loading...</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DestinationCard from './DestinationCard.vue';
import { supabase } from '../supabase.config'; // Import Supabase

const destinations = ref(null); // Initialize as null

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from('destinations')
      .select('*');

    if (error) {
      console.error('Error fetching destinations:', error);
    } else {
      destinations.value = data;
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
</script>