<template>
  <div class="package-details-container max-w-3xl mx-auto p-4 mt-8">
    <div v-if="isLoading" class="flex flex-col items-center justify-center space-y-2">
      <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <p>Loading package details...</p>
    </div>

    <div v-else-if="travelPackage" class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-3xl font-semibold text-gray-800 text-center mb-4">{{ travelPackage.name }}</h2>
      <img :src="travelPackage.image_urls ? travelPackage.image_urls[0] : ''" :alt="travelPackage.name" class="w-full h-64 object-cover rounded-lg mb-4 shadow-md">
      <p class="text-gray-600 mb-4">{{ travelPackage.description }}</p>

      <h3 class="text-2xl font-medium text-gray-800 mt-6 mb-2">Itinerary</h3>
      <div v-if="travelPackage.itinerary && Object.keys(travelPackage.itinerary).length > 0" class="itinerary">
        <div v-for="(day, index) in travelPackage.itinerary" :key="index" class="border-l-4 border-blue-500 pl-4 mb-4">
          <h4 class="text-xl font-medium text-gray-800">Day {{ index + 1 }}</h4>
          <p class="text-gray-600">{{ day.description }}</p>
        </div>
      </div>
      <div v-else class="text-gray-500 italic mb-4">Itinerary details coming soon...</div>

      <h3 class="text-2xl font-medium text-gray-800 mt-6 mb-2">What's Included</h3>
      <p v-if="travelPackage.what_is_included" class="text-gray-600 mb-4">{{ travelPackage.what_is_included }}</p>
         <div v-else class="text-gray-500 italic mb-4">Included details coming soon...</div>

      <h3 class="text-2xl font-medium text-gray-800 mt-6 mb-2">What's Not Included</h3>
      <p v-if="travelPackage.what_is_not_included" class="text-gray-600 mb-4">{{ travelPackage.what_is_not_included }}</p>
         <div v-else class="text-gray-500 italic mb-4">Not Included details coming soon...</div>



      <div class="text-center mt-8">
        <h3 class="text-2xl font-medium text-gray-800 inline-block mr-2">Price: ${{ travelPackage.price }}</h3>
        <router-link :to="{ name: 'Booking', params: { id: travelPackage.id } }">
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Book Now
          </button>
        </router-link>
      </div>
    </div>

    <div v-else class="text-center text-gray-600 mt-8">Package not found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { supabase } from '../supabase.config';

const route = useRoute();
const router = useRouter();
const travelPackage = ref(null);
const isLoading = ref(true);



async function fetchPackageDetails() {
  const packageId = route.params.id;
  isLoading.value = true;

  try {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('id', packageId)
      .single();

    if (error) {
      console.error('Error fetching package details:', error);
      // Optionally redirect to a 404 page or display an error message
      router.push('/NotFound');
    } else {
      travelPackage.value = data;
    }
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchPackageDetails);
</script>