<template>
  <div class="container">
    <div class="trip-planner">
      <h2>Trip Planner</h2>
      <p class="planner-intro">Customize your dream vacation with our easy-to-use trip planner.</p>

      <div class="planner-section">
        <h3>1. Choose Your Destination</h3>
        <input type="text" v-model="searchDestination" placeholder="Search destinations..." class="destination-input">
        <ul class="destination-list" v-if="filteredDestinations.length > 0">
          <li v-for="destination in filteredDestinations" :key="destination.id" @click="selectDestination(destination.name)">
            {{ destination.name }}
          </li>
        </ul>
        <p v-if="selectedDestination" class="selected-destination">Selected: {{ selectedDestination }}</p>
         <p v-if="noDestinationsFound" class="error-message">No matching destinations found.</p>

      </div>



      <div class="planner-section">
        <h3>2. Select Travel Dates</h3>
        <div class="date-inputs">
          <input type="date" v-model="startDate">
          <input type="date" v-model="endDate">
        </div>
        <p v-if="startDate && endDate" class="selected-dates">Travel Dates: {{ startDate }} - {{ endDate }}</p>
      </div>

      <div class="planner-section">
        <h3>3. Choose Activities</h3>
        <div class="activity-options">
          <label class="activity-label" v-for="activity in activities" :key="activity.value">
            <input type="checkbox" v-model="selectedActivities" :value="activity.value">
            {{ activity.label }}
          </label>
        </div>
        <p v-if="selectedActivities.length > 0" class="selected-activities">
          Selected Activities: {{ selectedActivities.join(', ') }}
        </p>
      </div>

       <button @click="generateItinerary" class="generate-button" :disabled="isGenerating">Generate Itinerary</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>


    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchDestination: '',
      allDestinations: [],
      selectedDestination: null,
      startDate: null,
      endDate: null,
      selectedActivities: [],
      activities: [
        { label: 'Sightseeing', value: 'sightseeing' },
        { label: 'Hiking', value: 'hiking' },
        { label: 'Food Tours', value: 'food_tours' },
        { label: 'Beach Relaxation', value: 'beach_relaxation' },
        { label: 'Adventure Sports', value: 'adventure_sports' },
        // ... more activities
      ],
      errorMessage: null,
      isLoading: true, // Add loading state for destinations
      noDestinationsFound: false, // Add flag for no matching destinations
      isGenerating: false, // Disable the button while generating

    };
  },
    computed: {
    filteredDestinations() {
      if (!this.allDestinations) return []; // Handle the case where allDestinations is null

      return this.allDestinations.filter(destination =>
        destination.name.toLowerCase().includes(this.searchDestination.toLowerCase())
      );
    },
  },
  mounted() {
    this.fetchDestinations();
  },
  methods: {
     fetchDestinations() {
      this.isLoading = true;
      axios.get('/api/destinations')
        .then(response => {
          this.allDestinations = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching destinations:", error);
          this.isLoading = false;
          this.errorMessage = "Could not load destinations. Please try again later.";
        });
    },
    selectDestination(destination) {
      this.selectedDestination = destination;
      this.noDestinationsFound = false; // Reset if a destination is selected
    },

    generateItinerary() {
        this.isGenerating = true; // Disable the button
        this.errorMessage = null;


      if (!this.selectedDestination) {
        this.errorMessage = "Please select a destination.";
         this.isGenerating = false; // Re-enable the button if there's an error
        return;
      }
      if (!this.startDate || !this.endDate) {
        this.errorMessage = "Please select travel dates.";
         this.isGenerating = false;
        return;
      }
      if (this.selectedActivities.length === 0) {
        this.errorMessage = "Please select at least one activity.";
         this.isGenerating = false;
        return;
      }


      this.$router.push({
        name: 'Packages',
        query: {
          destination: this.selectedDestination,
          startDate: this.startDate,
          endDate: this.endDate,
          activities: this.selectedActivities.join(','),
        },
      }).then(() => {
        this.isGenerating = false;
      });
    },
  },
};
</script>

<style scoped>.trip-planner {
  max-width: 600px;
  margin: 50px auto;
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff; /* Add a white background for contrast */
}

.planner-intro {
  margin-bottom: 20px;
  color: #555;
  font-size: 1.2rem;
}

.planner-section {
  margin-bottom: 25px;
}

h3 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.4rem; /* Slightly larger headings */
}

.destination-input {
  width: 100%;
  padding: 12px; /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 5px; /* Slightly more rounded corners */
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 1rem;  /* Adjust font size as needed */
}


.destination-list {
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  max-height: 150px;
  overflow-y: auto;
  border-radius: 5px; /* Rounded corners for the list */
}

.destination-list li {
  padding: 10px 15px; /* Increased padding */
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem; /* Adjust font size as needed */
}

.destination-list li:hover {
  background-color: #e0f7fa; /* Lighter teal hover */
}


.selected-destination,
.selected-dates,
.selected-activities {
  margin-top: 10px;
  font-weight: bold;
  color: #0056b3; /* Darker blue */
}


.date-inputs {
  display: flex;
  gap: 10px;
}

.date-inputs input[type="date"] {
  width: calc(50% - 5px);
  padding: 10px; /* Increased padding */
  border: 1px solid #ccc;
  border-radius: 5px; /* Slightly more rounded corners */
  box-sizing: border-box;
  font-size: 1rem;  /* Consistent font size */
}

.activity-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns for better layout */
  gap: 10px;
}


.activity-label {
  display: flex; /* Use flexbox for alignment */
  align-items: center; /* Align checkbox and label vertically */
  gap: 5px;       /* Space between checkbox and label */
  cursor: pointer; /* Make entire label clickable */
  font-size: 1rem;
}


.generate-button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
  margin-top: 20px;
  font-size: 1.1rem; /* Make button text slightly larger */
}

.generate-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: #dc3545;  /* Use a Bootstrap red */
  margin-top: 10px;
  text-align: center;
}
</style>