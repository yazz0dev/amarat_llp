<template>
  <div class="container">
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit">Login</button>
        <p class="signup-link">Don't have an account? <router-link to="/signup">Sign up here</router-link></p>
      </form>
    </div>
  </div>
</template>


<style scoped>
.login-form {
  width: 350px;
  margin: 50px auto; /* Center vertically and horizontally */
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

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff; /* Highlight on focus */
  outline: none; 
}

button {
  background-color: #007bff; 
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; 
}

.signup-link {
  text-align: center;
  margin-top: 20px;
}

.signup-link a {
  color: #007bff;
  text-decoration: none;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
  
<script>
import axios from 'axios';

export default {
  name: 'Log-in', // Corrected component name
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null, // Store error message
      isSubmitting: false // Flag to disable button while submitting
    };
  },
  methods: {
    login() {
      this.isSubmitting = true; // Disable button
      this.errorMessage = null; // Clear any existing error


      const loginData = {
        email: this.email,
        password: this.password,
      };

      axios.post('/api/login', loginData)
        .then(response => {
          const token = response.data.token;
          localStorage.setItem('token', token);
          this.$router.push('/profile');
          this.isSubmitting = false; // Re-enable button
        })
        .catch(error => {
          console.error('Login error:', error);
          this.errorMessage =
            error.response?.data?.error || 'Login failed. Please check your credentials.'; // Use response error
          this.isSubmitting = false; // Re-enable button
        });
    }
  },
};
</script>