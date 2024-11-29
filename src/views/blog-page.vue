<template>
  <div class="blog-container max-w-screen-xl mx-auto px-4 py-12">
    <h2 class="page-title text-3xl font-bold text-center mb-8 text-gray-800">Travel Blog</h2>

    <div v-if="isLoading" class="loading-message text-center mt-6 text-gray-600">
      <p>Loading blog posts...</p>
    </div>

    <div v-else-if="blogPosts.length > 0" class="blog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="post in blogPosts" :key="post.id" class="blog-post bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <img :src="post.image_url" :alt="post.title" class="w-full h-48 object-cover transition-transform duration-500 ease-in-out hover:scale-105">
        <div class="post-content p-6">
          <h3 class="post-title text-xl font-semibold mb-2 text-gray-800">{{ post.title }}</h3>
          <p class="post-date text-sm text-gray-500 italic mb-4">{{ formatDate(post.created_at) }}</p>
          <p class="post-excerpt text-gray-600 leading-relaxed mb-6">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.id}`" class="read-more-button bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out">Read More</router-link>
        </div>
      </div>
    </div>

    <div v-else class="no-posts-message text-center mt-6 text-gray-600">
      <p>No blog posts found.</p>
    </div>

    <div v-if="error" class="error-message text-center mt-6 text-red-500">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase.config';
import { useRouter } from 'vue-router';

const router = useRouter();
const blogPosts = ref([]);
const isLoading = ref(true);
const error = ref(null);


async function fetchBlogPosts() {
  isLoading.value = true;
  error.value = null;

  try {
    const { data, error } = await supabase.from('blog_posts').select('*');

    if (error) {
      throw error;
    }

    blogPosts.value = data;
  } catch (err) {
    console.error("Error fetching blog posts:", err);
    error.value = err.message || 'An error occurred.';
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

onMounted(fetchBlogPosts);

</script>