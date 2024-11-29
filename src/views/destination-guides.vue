<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl text-center mb-8">
      Destination Guides
    </h2>

    <div v-if="isLoading" class="text-center">
      <p class="text-gray-500">Loading destinations...</p>
    </div>

    <div v-else-if="error" class="text-center text-red-500">
      <p>{{ error }}</p>  <!-- Display the error message -->
    </div>


    <div v-else-if="destinations.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      <div v-for="destination in destinations" :key="destination.id" class="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-300 ease-in-out">
        <img :src="destination.image_url" :alt="destination.name" class="w-full h-48 object-cover">
        <div class="p-6">
          <h3 class="text-xl font-semibold text-gray-900">{{ destination.name }}</h3>
          <p class="mt-2 text-gray-600 truncate">{{ destination.description }}</p>
          <button @click="addDestinationToPlanner(destination)" class="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
            Add to Planner
          </button>
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <p class="text-gray-500">No destinations found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase.config';
import { useRouter } from 'vue-router';

const router = useRouter();
const destinations = ref([]);
const isLoading = ref(true);
const error = ref(null); // Use ref for error

async function fetchDestinations() {
  isLoading.value = true;
  error.value = null; // Clear any previous errors

  try {
    const { data, error: supabaseError } = await supabase
      .from('destinations')
      .select('*');

    if (supabaseError) {
      error.value = supabaseError.message;
      console.error('Error fetching destinations:', supabaseError);
    } else {
      destinations.value = data;
    }
  } catch (err) {
    error.value = 'An unexpected error occurred.';
    console.error('Unexpected error fetching destinations:', err);
  } finally {
    isLoading.value = false;
  }
}

function addDestinationToPlanner(destination) {
  // Store the entire destination object, and handle null.
  localStorage.setItem('selectedDestination', JSON.stringify(destination)); 
  router.push({ name: 'planner-page' }); // Use correct route name
}


onMounted(fetchDestinations);


</script>