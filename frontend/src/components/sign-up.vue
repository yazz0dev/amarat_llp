<template>
  <div class="container">
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div> <!-- Display error -->
        <button type="submit" :disabled="isSubmitting">Sign Up</button>
        <p class="login-link">Already have an account? <router-link to="/login">Login here</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default {
  name: 'Sign-up', // Corrected component name
  data() {
    return {
      name: '',
      email: '',
      password: '',
      errorMessage: null, // Store error message
      isSubmitting: false // Flag to disable button during submission
    };
  },
  methods: {
    signup() {
      this.isSubmitting = true; // Disable button while submitting
      this.errorMessage = null; // Clear any existing error messages

      const signupData = {
        name: this.name,
        email: this.email,
        password: this.password,
      };

      bcrypt.hash(signupData.password, 10)
        .then(hashedPassword => {
          signupData.password = hashedPassword;
          axios.post('/api/signup', signupData)
            .then(response => {
              console.log('Signup successful:', response.data);
              this.$router.push('/login');
              this.isSubmitting = false; // Enable button after success
            })
            .catch(error => {
              console.error('Signup API error:', error);
              this.errorMessage =
                error.response?.data?.error || 'An error occurred.'; // Use response error if available
              this.isSubmitting = false; // Enable button after error
            });
        })
        .catch(error => {
          console.error('Hashing error:', error);
          this.errorMessage = 'An error occurred during password hashing.';
          this.isSubmitting = false;
        });
    },
  },
};
</script>

<style scoped>
.signup-form {
  width: 350px;
  margin: 50px auto; 
  padding: 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="text"]:focus,
input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff; 
  outline: none;
}

button {
  background-color: #28a745; 
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #218838; 
}

.login-link {
  text-align: center;
  margin-top: 20px;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>