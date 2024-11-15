<template>
  <div class="container">
    <h2>My Profile</h2>

    <div v-if="user">
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <h3>Booking History:</h3>
      <div v-if="user.bookings.length > 0">
        <div v-for="booking in user.bookings" :key="booking.id">
          <h4>{{ booking.packageName }}</h4>
          <p>Travel Dates: {{ booking.startDate }} - {{ booking.endDate }}</p>
          <p>Number of Travelers: {{ booking.travelers }}</p>
          <p>Status: {{ booking.status }}</p>
        </div>
      </div>
      <div v-else>
        <p>No bookings yet.</p>
      </div>

      <!-- Add more sections as needed (e.g., wishlist, edit profile) -->

    </div>
    <div v-else>
      <p>Loading profile information...</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.fetchProfileData();
  },
  methods: {
    fetchProfileData() {
      // Replace with your actual API call to fetch user profile data
      // Make sure to send the authentication token in the request headers

      // Example using a simulated API call:
      setTimeout(() => {
        this.user = {
          name: "John Doe",
          email: "john.doe@example.com",
          bookings: [
            {
              id: 1,
              packageName: "Romantic Paris Escape",
              startDate: "2024-03-10",
              endDate: "2024-03-15",
              travelers: 2,
              status: "Confirmed",
            },
            // ... more bookings
          ],
        };
      }, 1000);
    },
  },
};
</script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
.container h3 {
  margin-top: 20px; /* Space the booking history heading */
}
  </style>