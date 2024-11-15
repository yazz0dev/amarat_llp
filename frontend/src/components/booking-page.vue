<template>
  <div class="container">
    <h2>Book Your Package</h2>

    <div v-if="isLoading">
      <p>Loading package details...</p>
    </div>
    <div v-else-if="travelPackage">
      <h3>{{ travelPackage.name }}</h3>
      <p>Price: ${{ travelPackage.price }}</p>
      <img :src="travelPackage.image" alt="Package Image" v-if="travelPackage.image" class="package-image">


      <form @submit.prevent="submitBooking">
        <div class="form-group">
          <label for="name">Full Name:</label>
          <input type="text" id="name" v-model="bookingData.name" required>
        </div>

        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="bookingData.email" required>
        </div>

        <div class="form-group">
          <label for="travelers">Number of Travelers:</label>
          <input type="number" id="travelers" v-model="bookingData.travelers" min="1" required>
        </div>

        <div class="form-group">
          <label for="startDate">Travel Start Date:</label>
          <input type="date" id="startDate" v-model="bookingData.startDate" required>
        </div>

        <div class="form-group">
          <label for="endDate">Travel End Date:</label>
          <input type="date" id="endDate" v-model="bookingData.endDate" required>
        </div>
         <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" :disabled="isSubmitting">Confirm Booking</button>
      </form>
        <div v-if="bookingSuccess" class="success-message">
          Your booking request has been submitted successfully! We'll contact you shortly.
      </div>
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
      isLoading: true,  // Add loading state
      bookingData: {
        name: '',
        email: '',
        travelers: 1,
        startDate: '',
        endDate: '',
        packageId: this.$route.params.id, 
      },
       errorMessage: null,
       isSubmitting: false,
       bookingSuccess: false,
    };
  },
  mounted() {
    this.fetchPackageDetails();
  },
  methods: {
    fetchPackageDetails() {

      const packageId = this.$route.params.id;
      axios.get(`/api/packages/${packageId}`)
        .then(response => {
          this.travelPackage = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching package details:", error);
          this.isLoading = false;  // Set loading to false even on error
        });
    },
    submitBooking() {
        this.isSubmitting = true;
        this.errorMessage = null;
        this.bookingSuccess = false;



      axios.post('/api/bookings', this.bookingData)  // Replace '/api/bookings'
        .then(response => {
           console.log('Booking successful:', response.data);
           this.bookingSuccess = true;
           this.isSubmitting = false;

           // Clear form or redirect
           this.bookingData = {
             name: '', // You might not clear name and email.
             email: '', 
             travelers: 1,
             startDate: '',
             endDate: '',
             packageId: this.$route.params.id,
           };
        })
        .catch(error => {
          console.error('Booking failed:', error);
          this.errorMessage = error.response?.data?.error || 'An error occurred during booking.';
           this.isSubmitting = false;
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
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea,
button {
  width: 100%;
  padding: 10px;
  margin-top: 5px; /* Add some top margin */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding in width */
}

button {
  background-color: #007bff; /* Blue */
  color: white;
  cursor: pointer;
  border: none; /* Remove default button border */
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
.package-image {
  max-width: 100%; /* Ensure image doesn't overflow container */
  height: auto;
  display: block; /* Prevent image from affecting layout */
  margin: 20px auto; /* Center the image */
}
.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}
.success-message {
  color: green;
  margin-top: 10px;
  text-align: center;
}

</style>