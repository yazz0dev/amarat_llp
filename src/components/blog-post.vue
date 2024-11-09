<template>
  <div class="container">
    <div v-if="isLoading">
      <p>Loading blog post...</p>
    </div>
    <div v-else-if="post">
      <h2>{{ post.title }}</h2>
      <p class="post-date">{{ formatDate(post.date) }}</p> 
      <img v-if="post.imageUrl" :src="post.imageUrl" :alt="post.title" class="blog-image">
      <p>{{ post.content }}</p>
    </div>
    <div v-else>
      <p>Blog post not found.</p>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      post: null,
      isLoading: true,
      errorMessage: null, // Add an error message property
    };
  },
  mounted() {
    this.fetchBlogPost();
  },
  methods: {  // Make sure to correctly close the methods object.
    fetchBlogPost() {
      const postId = this.$route.params.id;
      this.isLoading = true;
      this.errorMessage = null; // Clear any previous error messages

      axios.get(`/api/blog/${postId}`)
        .then(response => {
          this.post = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
          console.error("Error fetching blog post:", error);

          if (error.response && error.response.status === 404) {
            this.errorMessage = "Blog post not found."; // Specific 404 error message
          } else {
            this.errorMessage = "An error occurred while loading the blog post.";  // Generic error
          }

          // More detailed error logging for debugging (optional)
          if (error.response) {
            console.error("Server responded with:", error.response.data);
            console.error("Status code:", error.response.status);
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error('Error', error.message);
          }
        });
    },
    formatDate(dateString) { //Likely, you want this formatDate function if you're displaying dates.
      return moment(dateString).format('MMMM D, YYYY'); // Example format
    },


  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 20px auto;  /* Center the container */
  padding: 20px;
  border: 1px solid #ddd; /* Add a border */
  border-radius: 5px;    /* Rounded corners */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Add a shadow */
}

h2 {
  margin-bottom: 10px; /* Add some margin below the title */
}

.post-date {
  font-style: italic;
  color: #888;
  margin-bottom: 20px; /* Add margin below the date */
}

.blog-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  margin-bottom: 20px;
  border-radius: 8px;  /* Rounded corners for the image */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Add a shadow */
}
</style>