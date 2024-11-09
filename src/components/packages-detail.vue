<template>
  <div class="container">
    <div v-if="isLoading">
      <p>Loading package details...</p>
    </div>
    <div v-else-if="travelPackage">
      <h2>{{ travelPackage.name }}</h2>
      <img :src="travelPackage.imageUrl" :alt="travelPackage.name" class="package-image">
      <p>{{ travelPackage.description }}</p>

      <h3>Itinerary:</h3>
      <div v-if="travelPackage.itinerary && travelPackage.itinerary.length > 0">
        <div v-for="(day, index) in travelPackage.itinerary" :key="index">
          <h4>Day {{ index + 1 }}</h4>
          <p>{{ day.description }}</p>
        </div>
      </div>
      <div v-else>
        <p>Itinerary details coming soon...</p>
      </div>

      <h3>Accommodation:</h3>
      <p v-if="travelPackage.accommodation">{{ travelPackage.accommodation }}</p>
      <p v-else>Accommodation details coming soon...</p>

      <h3>Price: ${{ travelPackage.price }}</h3>

      <router-link :to="{ name: 'Booking', params: { id: travelPackage.id } }">
        <button class="book-button">Book Now</button>
      </router-link>
    </div>
    <div v-else>
      <p>Package not found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      travelPackage: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchPackageDetails();
  },
  methods: {
    fetchPackageDetails() {
      const packageId = this.$route.params.id;
      this.isLoading = true; // Set loading state to true before API call
      axios.get(`/api/packages/${packageId}`)
        .then(response => {
          this.travelPackage = response.data;
          this.isLoading = false; // Set loading to false after data is fetched
        })
        .catch(error => {
          console.error("Error fetching package details:", error);
          this.isLoading = false; // Set loading to false even on error
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

h2, h3 {
  text-align: center; /* Center headings */
}

.package-image {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto; /* Center the image */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}



.book-button {
  background-color: #007bff; /* Blue */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px; /* Add top margin */
  display: block; /* Make button a block element */
  width: 100%; /* Full width button */
  max-width: 300px; /* Limit maximum width */
  margin-left: auto;
  margin-right: auto;
}


.book-button:hover {
  background-color: #0056b3; /* Darker blue */
}
</style>