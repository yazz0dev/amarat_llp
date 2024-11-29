<template>
  <div class="container">
    <div class="signup-form">
      <h2>Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        <button type="submit" :disabled="isSubmitting">Sign Up</button>
        <p class="login-link">Already have an account? <router-link to="/login">Login here</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import { supabase } from '../supabase.config'; //Import your Supabase client instance

export default {
  name: 'Sign-up',
  data() {
    return {
      email: '',
      password: '',
      errorMessage: null,
      isSubmitting: false,
    };
  },
  methods: {
    async signup() {
      this.isSubmitting = true;
      this.errorMessage = null;

      try {
        const { user, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
        });

        if (error) {
          //Handle Supabase specific errors
          if(error.message.includes('email')){
            this.errorMessage = 'Email is already in use.'
          } else if (error.message.includes('password')){
            this.errorMessage = 'Invalid password. Please make sure your password meet our security requirements'
          } else {
            this.errorMessage = error.message; // Generic error message from Supabase
          }
          throw error; // Re-throw for general error handling below.
        }

        // Successful signup.  You might want to redirect to a confirmation page or login page.
        console.log('Signup successful:', user);
        this.$router.push('/login'); 
      } catch (error) {
        console.error('Signup error:', error);
        // Error already handled above, but this handles unexpected errors.
        this.errorMessage = 'An unexpected error occurred during signup. Please try again later.';
      } finally {
        this.isSubmitting = false;
      }
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