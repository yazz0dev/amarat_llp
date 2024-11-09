<template>
  <div class="container">
    <h2>Our Packages</h2>
    <p>Explore our curated travel packages to various exciting destinations.</p>

    <div v-if="isLoading">
      <p>Loading packages...</p>
    </div>
    <div v-else-if="filteredPackages.length > 0">
      <div class="packages-grid">
        <div class="package-card" v-for="travelPackage in filteredPackages" :key="travelPackage.id">
          <img :src="travelPackage.imageUrl" :alt="travelPackage.name">
          <h3>{{ travelPackage.name }}</h3>
          <p>{{ travelPackage.description }}</p>
          <p><strong>Price:</strong> ${{ travelPackage.price }}</p>
          <router-link :to="`/package/${travelPackage.id}`" class="btn btn-primary">View Details</router-link>
        </div>
      </div>
    </div>    
    <div v-else>
      <p>No packages found.</p>
    </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PackagesPage',
  data() {
    return {
      packages: [],
      isLoading: true,
    };
  },
  computed: {
    filteredPackages() {
      const query = this.$route.query;
      return this.packages.filter(travelPackage => {
        if (query.destination && !travelPackage.destination.toLowerCase().includes(query.destination.toLowerCase())) {
          return false;
        }
        // Add more filtering logic here as needed (startDate, endDate, etc.)
        return true;
      });
    },
  },
  mounted() {
    this.fetchPackages();
  },
  methods: {
    fetchPackages() {
      this.isLoading = true;
      axios.get('/api/packages') // Replace with your actual API endpoint
        .then(response => {
          this.packages = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching packages:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
  grid-gap: 20px;
}

.package-card {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
}

.package-card img {
  width: 100%;
  height: 200px;  /* Set a fixed height */
  object-fit: cover; /* Maintain aspect ratio and cover the area */
  margin-bottom: 15px;
  border-radius: 5px;
}

.btn-primary {
  display: inline-block; /* Make it a block element */
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 15px; /* Add margin */
}

/* ...any other styles you want */
</style>