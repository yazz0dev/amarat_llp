<template>
  <div class="container">
    <h2>Destination Guides</h2>

    <div v-if="isLoading">
      <p>Loading destinations...</p>
    </div>
    <div v-else-if="destinations.length > 0">
      <div class="destination-grid">
        <div class="destination-card" v-for="destination in destinations" :key="destination.id">
          <img :src="destination.imageUrl" :alt="destination.name" class="destination-image">
          <div class="card-content">
            <h3>{{ destination.name }}</h3>
            <p>{{ destination.description }}</p>
            <router-link :to="`/destination/${destination.id}`" class="explore-button">Explore</router-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No destinations found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      destinations: [],
      isLoading: true,
    };
  },
  mounted() {
    this.fetchDestinations();
  },
  methods: {
    fetchDestinations() {
    this.isLoading = true;
    axios.get('/api/destinations')
        .then(response => {
            this.destinations = response.data;
            this.isLoading = false;
        })
        .catch(error => {
            this.isLoading = false;
            console.error("Error fetching destinations:", error); 
            if (error.response) {
                console.error("Data:", error.response.data);
                console.error("Status:", error.response.status);
                console.error("Headers:", error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error("Request:", error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('General Error:', error.message);
            }
        });
},
  },
};
</script>

  
  <style scoped>
  .container {
    max-width: 1200px; 
    margin: 0 auto;
    padding: 30px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 2.5rem; 
    color: #333;
  }
  
  .destination-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); 
    grid-gap: 25px;
  }
  
  .destination-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden; /* Hide image overflow for clean corners */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease; /* Add a subtle hover effect */
  }
  
  .destination-card:hover {
    transform: translateY(-3px); 
  }
  
  .destination-image {
    width: 100%;
    height: 250px; 
    object-fit: cover;
  }
  
  .card-content {
    padding: 20px;
  }
  
  .card-content h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  .card-content p {
    color: #555;
  }
  
  .explore-button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease; 
  }
  
  .explore-button:hover {
    background-color: #0056b3; 
  }
  </style>