<template>
  <div class="contact-page">
    <div class="container">
      <div class="contact-form">
        <h2>Contact Us</h2>
        <p>Have a question or need assistance? We'd love to hear from you!</p>
        <form @submit.prevent="sendMessage">
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message" v-model="message" rows="5" required></textarea>
          </div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
          <button type="submit" :disabled="isSubmitting">Send Message</button>
        </form>
        <div v-if="messageSent" class="success-message">
          Your message has been sent successfully!
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactPage',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      messageSent: false,
      errorMessage: null,
      isSubmitting: false,
    };
  },
  methods: {
    sendMessage() {
      this.isSubmitting = true;
      this.errorMessage = null;
      this.messageSent = false; // Clear previous success message

      const messageData = {
        name: this.name,
        email: this.email,
        message: this.message,
      };


      axios.post('/api/contact', messageData) // Replace with your API endpoint
        .then(response => {
          console.log('Message sent:', response.data);
          this.messageSent = true;
          this.name = '';
          this.email = '';
          this.message = '';

          this.isSubmitting = false;

        })
        .catch(error => {
          console.error('Error sending message:', error);
          this.errorMessage = error.response?.data?.error || 'An error occurred while sending your message.'; // Display error message from the server.
          this.isSubmitting = false;

        });
    },
  },
};
</script>

<style scoped>
.contact-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); /* Adjust based on your header height */
  padding: 20px 0;
  background-color: #f5f5f5; /* Light gray background */
}
.container {
  max-width: 600px;
  width: 90%; /* Responsive width */
  margin: 0 auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.contact-form h2 {
  color: #333;
  margin-bottom: 20px;
}

.contact-form p {
  margin-bottom: 30px;
  color: #666; /* Slightly lighter text */
}

.form-group {
  margin-bottom: 20px;
}


label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

button {
  background-color: #007bff; /* Blue */
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}


.success-message {
  color: green;
  margin-top: 20px;
  text-align: center;
}

.error-message {
  color: red;
  margin-top: 10px;
  text-align: center;
}

</style>