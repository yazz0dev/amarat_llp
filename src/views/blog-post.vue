<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
    <div v-if="isLoading" class="text-center mt-6 text-gray-500">
      Loading blog post...
    </div>
    <div v-else-if="post" class="blog-post">
      <h2 class="text-3xl font-bold mb-4 text-gray-800">{{ post.title }}</h2>
      <p class="text-sm italic text-gray-600 mb-6">{{ formatDate(post.created_at) }}</p>
      <img v-if="post.image_url" :src="post.image_url" :alt="post.title" class="w-full rounded-lg shadow-md mb-6">
      <p class="text-lg text-gray-700 leading-relaxed" v-html="post.content"></p> </div>
    <div v-else-if="errorMessage" class="text-center mt-6 text-red-500">
      <p>{{ errorMessage }}</p>
    </div>
    <div v-else class="text-center mt-6 text-gray-500">
      <p>Blog post not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase.config';

const post = ref(null);
const isLoading = ref(true);
const errorMessage = ref(null);
const route = useRoute();

onMounted(async () => {
  await fetchBlogPost();
});

async function fetchBlogPost() {
  const postId = route.params.id;
  isLoading.value = true;
  errorMessage.value = null;

  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', postId)
      .single();

    if (error) {
      console.error('Error fetching blog post:', error);
      if (error.status === 404) {
        errorMessage.value = "Blog post not found.";
      } else if (error.status === 406) {
        errorMessage.value = 'Not Acceptable request';
      } else {
        errorMessage.value = 'An error occurred while loading the blog post.';
      }
    } else {
      post.value = data;
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = 'An unexpected error occurred.';
  } finally {
    isLoading.value = false;
  }
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
</script>