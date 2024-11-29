<template>
  <div class="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-semibold text-gray-800 mb-6 text-center">Trip Planner</h1>
    <p class="text-gray-600 mb-8 text-center">Customize your dream vacation.</p>

    <div class="mb-6">
      <h2 class="text-xl font-medium text-blue-500 mb-2">1. Choose Your Destination</h2>
      <input v-model="searchDestination" type="text" placeholder="Search destinations..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">

      <div v-if="isLoadingDestinations" class="text-blue-500 mt-2 animate-pulse">Loading destinations...</div>

      <ul v-else-if="filteredDestinations.length > 0" class="mt-2 border border-gray-300 rounded-md">
        <li v-for="destination in filteredDestinations" :key="destination.id" @click="selectDestination(destination)" class="px-4 py-2 cursor-pointer hover:bg-gray-100">
          {{ destination.name }}
        </li>
      </ul>

      <p v-if="selectedDestination" class="text-blue-500 font-medium mt-2">Selected: {{ selectedDestination.name }}</p>
      <p v-else-if="noDestinationsFound && !isLoadingDestinations && searchDestination" class="text-red-500 mt-2">No matching destinations found.</p>
      <p v-else-if="errorLoadingDestinations" class="text-red-500 mt-2">{{ errorLoadingDestinations }}</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-medium text-blue-500 mb-2">2. Select Travel Dates</h2>
      <div class="flex space-x-4">
        <input v-model="startDate" type="date" class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        <input v-model="endDate" type="date" class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
      </div>
      <p v-if="invalidDates" class="text-red-500 mt-2">Invalid date range.</p>
      <p v-if="startDate && endDate && !invalidDates" class="text-blue-500 font-medium mt-2">
        Travel Dates: {{ formatDate(startDate) }} - {{ formatDate(endDate) }}
      </p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-medium text-blue-500 mb-2">3. Number of Travelers</h2>
      <input v-model.number="travelers" type="number" min="1" class="w-20 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
    </div>


    <div v-if="selectedDestination && packages.length > 0 && !noPackagesFound" class="mb-6 bg-blue-100 p-4 rounded-md">
      <h2 class="text-xl font-medium text-blue-500 mb-2">Package Pricing</h2>
      <ul>
        <li v-for="packageItem in packages" :key="packageItem.id" class="py-1">
          {{ packageItem.name }} - ${{ getPackagePrice(packageItem) }}/person
        </li>
      </ul>
      <p class="font-medium mt-2">Total Price: ${{ getTotalPrice() }}</p>
    </div>



    <button @click="bookPackage" :disabled="isBookingDisabled" class="w-full bg-blue-500 text-white font-medium py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
      Book Now
    </button>


  </div>
</template>

<script>
import { supabase } from '../supabase.config';

export default {
  data() {
    return {
      searchDestination: '',
      allDestinations: [],
      selectedDestination: null,
      startDate: null,
      endDate: null,
      travelers: 1,
      packages: [],
      isLoadingDestinations: false,
      errorLoadingDestinations: null,
      noDestinationsFound: false,
      noPackagesFound: false,
      packageLoading: false
    };
  },
  computed: {
    filteredDestinations() {
      return this.allDestinations.filter(destination =>
        destination.name.toLowerCase().includes(this.searchDestination.toLowerCase())
      );
    },
    invalidDates() {
      return this.startDate && this.endDate && new Date(this.startDate) > new Date(this.endDate);
    },
    isBookingDisabled() {
      return !this.selectedDestination || !this.startDate || !this.endDate || this.invalidDates || this.packages.length === 0;
    }
  },
  mounted() {
    this.fetchDestinations();
  },
  methods: {
    async fetchDestinations() {
      this.isLoadingDestinations = true;
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('*');
        if (error) {
          throw error;
        }
        this.allDestinations = data;
      } catch (error) {
        console.error("Error fetching destinations:", error);
        this.errorLoadingDestinations = "Failed to load destinations.";
      } finally {
        this.isLoadingDestinations = false;
      }
    },
    selectDestination(destination) {
      this.selectedDestination = destination;
      this.fetchPackagesForDestination();
    },
    async fetchPackagesForDestination() {
      if (!this.selectedDestination) return;
      this.packageLoading = true;
      this.noPackagesFound = false;
      this.packages = [];
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('destination_id', this.selectedDestination.id);
        if (error) {
          throw error;
        }
        this.packages = data;
        if (this.packages.length === 0) {
          this.noPackagesFound = true;
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        this.errorFindingPackages = "Failed to load packages for this destination.";
      } finally {
        this.packageLoading = false;
      }
    },
    getPackagePrice(packageItem) {
      if (!this.startDate || !this.endDate) return packageItem.price;
          const start = new Date(this.startDate);
          const end = new Date(this.endDate);
          const durationInMilliseconds = end - start;
          const durationInDays = Math.ceil(durationInMilliseconds / (1000 * 60 * 60 * 24));
          return packageItem.price * durationInDays;
    },
    getTotalPrice() {
      if (this.packages.length === 0) return 0;
      const pricePerPerson = this.getPackagePrice(this.packages[0]);
      return pricePerPerson * this.travelers;
    },
    bookPackage() {
      if (this.packages.length === 0) {
        alert('No packages available for this destination.');
        return;
      }
      const pricePerPerson = this.getPackagePrice(this.packages[0]);
      const totalPrice = pricePerPerson * this.travelers;
      this.$router.push({
        name: 'Booking',
        params: { id: this.packages[0].id },
        query: {
          destination: this.selectedDestination.name,
          package: this.packages[0].name,
          startDate: this.startDate,
          endDate: this.endDate,
          travelers: this.travelers,
          pricePerPerson: pricePerPerson,
          totalPrice: totalPrice
        }
      });
    },
        formatDate(date) {
            if (!date) return '';
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return new Date(date).toLocaleDateString(undefined, options);
        }
  }
};
</script>

