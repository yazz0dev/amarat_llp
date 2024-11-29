<template>
  <div class="packages-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h2 class="text-3xl font-bold mb-6 text-gray-900">{{ destinationName || "Our Packages" }}</h2>

    <div v-if="isLoading" class="flex justify-center items-center">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Loading...</p>
    </div>

    <div v-else-if="selectedPackage" class="package-details bg-white rounded-lg shadow p-6">
      <h3 class="text-2xl font-semibold mb-4 text-gray-900">{{ selectedPackage.name }}</h3>
      <img :src="selectedPackage.image_urls[0]" :alt="selectedPackage.name" class="w-full h-64 object-cover rounded-lg mb-4">
      <p class="text-gray-700 mb-4">{{ selectedPackage.description }}</p>
      <p class="font-semibold text-gray-900">Price: ${{ selectedPackage.price }}</p>
      <div class="mt-4">
          <h4 class="text-lg font-medium text-gray-900">Itinerary</h4>
            <pre class="text-sm text-gray-600 whitespace-pre-wrap">{{ selectedPackage.itinerary }}</pre>
        </div>

         <p v-if="selectedPackage.what_is_included" class="text-lg mt-4 font-medium text-gray-900">Included</p>
      <p v-if="selectedPackage.what_is_included" class="text-gray-700 mb-4">{{ selectedPackage.what_is_included }}</p>
           <p v-if="selectedPackage.what_is_not_included" class="text-lg mt-4 font-medium text-gray-900">Not Included</p>
      <p v-if="selectedPackage.what_is_not_included" class="text-gray-700 mb-4">{{ selectedPackage.what_is_not_included }}</p>
       <router-link to="/booking" custom v-slot="{ navigate }">
           <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6" @click="navigate">
              Book Now
            </button>
        </router-link>
    </div>

    <div v-else-if="filteredPackages.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="travelPackage in filteredPackages" :key="travelPackage.id" class="package-card bg-white rounded-lg shadow p-6">
        <img :src="travelPackage.image_urls[0]" :alt="travelPackage.name" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ travelPackage.name }}</h3>
        <p class="text-gray-700 mb-4 line-clamp-3">{{ travelPackage.description }}</p>
        <p class="font-semibold text-gray-900">Price: ${{ travelPackage.price }}</p>
        <router-link :to="`/packages/${travelPackage.id}`" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-block">
          View Details
        </router-link>
      </div>
    </div>

    <p v-else class="text-center mt-6 text-gray-600">
      No packages found{{ destinationName ? " for " + destinationName : "" }}.
    </p>
  </div>
</template>

<script>
import { supabase } from '../supabase.config';

export default {
  name: 'PackagesPage',
  props: {
    destinationId: { type: [String, Number], default: null },
  },
  data() {
    return {
      packages: [],
      isLoading: true,
      selectedPackage: null,
      destinationName: null,
    };
  },
  computed: {
    filteredPackages() {
      return this.destinationId
        ? this.packages.filter(p => p.destination_id === this.destinationId)
        : this.packages;
    },
  },
  async mounted() {
    try {
      if (this.$route.params.id) {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', this.$route.params.id)
          .single(); // single() for getting a single package

        if (error) {
          console.error("Error fetching package:", error);
        } else {
          this.selectedPackage = data;
        }
      } else {
        let query = supabase.from('packages').select('*');

        if (this.destinationId) {
          query = query.eq('destination_id', this.destinationId); // Use destination_id
          const { data: destinationData, error: destinationError } = await supabase
            .from('destinations')
            .select('name')
            .eq('id', this.destinationId)
            .single();
          if (destinationError) {
            console.error("Error fetching destination:", destinationError);
          } else {
            this.destinationName = destinationData.name;
          }
        }

        const { data, error } = await query;
        if (error) {
          console.error("Error fetching packages:", error);
        } else {
          this.packages = data;
        }
      }
    } catch (error) {
      console.error("General error fetching data:", error);
    } finally {
      this.isLoading = false;
    }
  },
};
</script>
  
  <style scoped>
  .packages-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Roboto', sans-serif; /* Use a modern font */
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }
  
  .package-card {
    border: 1px solid #eee;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .package-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
  
  .package-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
  
  .package-card h3 {
    margin-bottom: 0.5rem;
    color: #007bff;
  }
  
  .btn-primary {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
  }
  
  .btn-primary:hover {
    background-color: #0056b3;
  }
  
  .no-packages {
    text-align: center;
    margin-top: 2rem;
    color: #666;
  }
  
  /* Loading Spinner */
  .loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #007bff;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>