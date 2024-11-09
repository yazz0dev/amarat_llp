<template>
  <div class="container">
    <div v-if="isLoading">
      <p>Loading destination details...</p>
    </div>
    <div v-else-if="destination">
      <h2>{{ destination.name }}</h2>
      <img :src="destination.imageUrl" :alt="destination.name" class="destination-image">
      <p>{{ destination.description }}</p>

      <h3>Things to Do:</h3>
      <ul v-if="destination.activities && destination.activities.length > 0">
        <li v-for="(activity, index) in destination.activities" :key="index">
          {{ activity }}
        </li>
      </ul>
      <p v-else>Information on activities coming soon...</p>

      <!-- Add more sections as needed (e.g., accommodation, transportation, etc.) -->
    </div>
    <div v-else>
      <p>Destination not found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      destination: null,
      isLoading: true,
    };
  },
  mounted() {
    this.fetchDestinationDetails();
  },
  methods: {
    fetchDestinationDetails() {
      const destinationId = this.$route.params.id;
      this.isLoading = true;
      axios.get(`/api/destinations/${destinationId}`) // Replace with your API endpoint
        .then(response => {
          this.destination = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching destination details:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto; /* Center the container */
  padding: 20px;
  border: 1px solid #ddd; /* Add a border */
  border-radius: 5px;    /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow */
}

h2 {
  text-align: center;  /* Center the title */
  margin-bottom: 20px; /* Add some bottom margin */
}

.destination-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px; /* Rounded image corners */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


ul {
  list-style-type: disc; /* Use bullet points */
  padding-left: 20px;    /* Add left padding */
}
</style>