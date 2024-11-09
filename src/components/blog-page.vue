<template>
  <div class="container">
    <h2>Travel Blog</h2>

    <div v-if="isLoading">
      <p>Loading blog posts...</p>
    </div>
    <div v-else-if="blogPosts.length > 0">
      <div class="blog-grid">
        <div class="blog-post" v-for="post in blogPosts" :key="post.id">
          <img :src="post.imageUrl" :alt="post.title" class="post-image">
          <h3>{{ post.title }}</h3>
          <p class="post-date">{{ formatDate(post.date) }}</p>
          <p>{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.id}`" class="read-more">Read More</router-link>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No blog posts found.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      blogPosts: [],
      isLoading: true,
    };
  },
  mounted() {
    this.fetchBlogPosts();
  },
  methods: {
    fetchBlogPosts() {
      this.isLoading = true;
      axios.get('/api/blog') // Replace with your actual API endpoint
        .then(response => {
          this.blogPosts = response.data;
          this.isLoading = false;
        })
        .catch(error => {
          console.error("Error fetching blog posts:", error);
          this.isLoading = false;
        });
    },
    formatDate(dateString) {
      return moment(dateString).format('MMMM D, YYYY');
    },
  },
};
</script>


<style scoped>
.container {
  max-width: 960px;
  margin: 40px auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #333;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
  grid-gap: 25px;
}

.blog-post {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-3px); 
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-post h3 {
  margin-top: 15px; 
  margin-bottom: 5px;
  color: #333;
}

.post-date {
  font-style: italic;
  color: #888;
  margin-bottom: 10px;
}

.blog-post p {
  color: #555;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  margin-top: 15px;
  transition: background-color 0.3s ease;
}

.read-more:hover {
  background-color: #0056b3; 
}
</style>