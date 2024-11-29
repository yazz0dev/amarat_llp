<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4 text-center">Book Your Package</h2>

    <div v-if="isLoading" class="flex flex-col items-center justify-center h-48">
      <svg class="animate-spin -ml-1 mr-3 h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 0a6 6 0 100 12 6 6 0 000-12z"></path>
      </svg>
      <p class="text-gray-600">Loading package details...</p>
    </div>

    <div v-else-if="travelPackage" class="booking-form">
      <h3 class="text-xl font-semibold text-gray-800 mb-2">{{ travelPackage.name }}</h3>
      <p class="text-lg text-gray-700 mb-4">Price: ${{ travelPackage.price }}</p>
      <img v-if="travelPackage.image_urls && travelPackage.image_urls[0]" :src="travelPackage.image_urls[0]" alt="Package Image" class="w-full h-64 object-cover rounded-lg mb-4 shadow-md">


      <form @submit.prevent="submitBooking">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700">Full Name:</label>
          <input type="text" id="name" v-model="bookingData.name" required class="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
          <input type="email" id="email" v-model="bookingData.email" required disabled class="mt-1 p-2 w-full border rounded-md bg-gray-100 focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div class="mb-4">
          <label for="travelers" class="block text-sm font-medium text-gray-700">Number of Travelers:</label>
          <input type="number" id="travelers" v-model="bookingData.travelers" min="1" required disabled class="mt-1 p-2 w-full border rounded-md bg-gray-100">
        </div>

        <div class="mb-4">
          <label for="startDate" class="block text-sm font-medium text-gray-700">Travel Start Date:</label>
          <input type="date" id="startDate" v-model="bookingData.startDate" required disabled class="mt-1 p-2 w-full border rounded-md bg-gray-100">
        </div>

        <div class="mb-4">
          <label for="endDate" class="block text-sm font-medium text-gray-700">Travel End Date:</label>
          <input type="date" id="endDate" v-model="bookingData.endDate" required disabled class="mt-1 p-2 w-full border rounded-md bg-gray-100">
        </div>
       
        <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

        <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
          <span v-if="isSubmitting">Submitting...</span>
          <span v-else>Confirm Booking</span>
        </button>

        <div v-if="bookingSuccess" class="text-green-500 text-center mt-4">Your booking request has been submitted successfully! We'll contact you shortly.</div>

      </form>
    </div>

    <div v-else class="text-center text-gray-600 mt-8">
      <p>Package not found.</p>
    </div>
  </div>
</template>


<script>
import { supabase } from '../supabase.config'; // Import your Supabase client instance

export default {
  name: 'BookingPage',
  data() {
    return {
      travelPackage: null,
      isLoading: true,
      bookingData: {
        name: '',
        email: '', // Email will be populated from the store (assuming you have a Vuex store)
        travelers: 1,
        startDate: '',
        endDate: '',
        destination: '',
        package: '', // Consider removing this, as packageId is sufficient.
        pricePerPerson: 0,
        totalPrice: 0
      },
      errorMessage: '',
      bookingSuccess: false,
      isSubmitting: false,
    };
  },
  async created() {
    await this.fetchPackageDetails();

    // Pre-fill bookingData from query parameters (same as before)
    let travelers = parseInt(this.$route.query.travelers, 10);
    this.bookingData.travelers = isNaN(travelers) ? 1 : travelers;
    this.bookingData.startDate = this.$route.query.startDate || '';
    this.bookingData.endDate = this.$route.query.endDate || '';
    this.bookingData.destination = this.$route.query.destination || '';
    this.bookingData.pricePerPerson = parseFloat(this.$route.query.pricePerPerson) || 0;
    this.bookingData.totalPrice = parseFloat(this.$route.query.totalPrice) || 0;

    // Get user email from Vuex store (replace with your store's getter)
    this.bookingData.email = this.$store.getters.userEmail; // Assuming you have a Vuex store

    console.log("Booking data after pre-fill:", this.bookingData);
  },
  methods: {
    async fetchPackageDetails() {
      this.isLoading = true;
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .eq('id', this.$route.params.id)
          .single();

        if (error) {
          console.error('Error fetching package details:', error);
          this.travelPackage = null;
        } else {
          this.travelPackage = data;
        }
      } finally {
        this.isLoading = false;
      }
    },
    async submitBooking() {
      this.isSubmitting = true;
      this.errorMessage = '';

      // Authentication check (replace with your store's getter)
      if (!this.$store.getters.isLoggedIn) {
        this.errorMessage = 'Please log in to book a package.';
        this.isSubmitting = false;
        return;
      }

      try {
        const { data, error } = await supabase
          .from('bookings')
          .insert([{
            user_id: this.$store.getters.userId, // Get user ID from store
            package_id: this.$route.params.id,
            number_of_travelers: this.bookingData.travelers,
            total_price: this.bookingData.totalPrice, // Assuming totalPrice is already calculated
            start_date: this.bookingData.startDate,
            end_date: this.bookingData.endDate,
          }])
          .select(); // Select the inserted row

        if (error) {
          console.error('Error submitting booking:', error);
          this.errorMessage = 'Failed to submit booking. Please try again.';
        } else {
          console.log('Booking successful:', data);
          this.bookingSuccess = true;
        }
      } finally {
        this.isSubmitting = false;
      }
    },
  },
};
</script>
<style scoped>
.booking-container {
  max-width: 600px; /* Adjust as needed */
  margin: 2rem auto;
  padding: 2rem;
  font-family: 'Roboto', sans-serif;  /* Modern font */
  background-color: #f8f9fa; /* Light background */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

h3 {
  margin-top: 1rem;
  color: #333;
}

.price {
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

.booking-form {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);

}

.package-image {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  display: block;
  margin: 1rem auto;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  box-sizing: border-box;
}

.book-button {
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  max-width: 200px;
  margin: 1rem auto 0;
}

.book-button:hover {
  background-color: #0056b3;
}

.book-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
  text-align: center;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
  text-align: center;
}

/* Loading Spinner */
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px; /* Adjust as needed */
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