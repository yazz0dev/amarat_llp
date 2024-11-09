<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">

        <nav class="nav">
          <router-link to="/">
          <img src="./assets/logo.png" alt="Amrat Holidays Logo" class="logo" height="50px" width="50px">
        </router-link>
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/destinations" class="nav-link">Destinations</router-link>
          <router-link to="/planner" class="nav-link">planner</router-link>
          <router-link to="/blog" class="nav-link">Blog</router-link>
          <router-link to="/faq" class="nav-link">FAQ</router-link>          
          <router-link to="/about-us" class="nav-link">About Us</router-link>
          <template v-if="!isLoggedIn">
            <router-link to="/signup" class="nav-button signup-button">Sign Up</router-link>
            <router-link to="/login" class="nav-button login-button">Login</router-link>
          </template>
          <template v-else>
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <button @click="logout" class="nav-link logout-button">Logout</button>
          </template>
        </nav>
      </div>
    </div>
  </header>
  <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      // isLoggedIn: false, // Remove this line (we'll compute it dynamically)
    };
  },
  computed: {
    isLoggedIn() {
      // Check if a token exists in local storage
      return !!localStorage.getItem('token'); 
    },
  },
  methods: {
    logout() {
      // Remove the token from local storage
      localStorage.removeItem('token');
      // Redirect to the login page
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
/* General Styles */
.app-header {
  background-color: #f8f9fa;
  padding: 15px 0; 
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); 
  position: sticky; /* Make the header sticky */
  top: 0;
  z-index: 1000; /* Ensure header is above other content */
}

.container {
  max-width: 1200px; 
  margin: 0 auto;
  padding: 0 20px; 
}

.header-content {
  display: flex;
  justify-content: space-between; /* Distribute space between logo and navigation */
  align-items: center;
}

.logo {
  height: 60px;
  width: auto; /* Maintain aspect ratio */
}

/* Navigation Styles */
.nav {
  display: flex;
  align-items: center;
}

.nav-link {
  margin-left: 40px;
  text-decoration: none;
  color: #343a40; 
  font-weight: 500;
  transition: color 0.2s ease;
  position: relative; /* For underline effect */
}

.nav-link:hover {
  color: #007bff; 
}

.nav-link::after { /* Underline effect */
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #007bff;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}

/* Button Styles */
.nav-button {
  margin-left: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  opacity: 0.9; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle shadow */
}

.nav-button:hover {
  opacity: 1; 
}

.signup-button {
  background-color: #28a745; 
}

.login-button {
  background-color: #007bff; 
}

/* Logout Button Styles */
.logout-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-weight: 500;
  color: #343a40;
  transition: color 0.2s ease;
}

.logout-button:hover {
  color: #dc3545; 
}
</style>