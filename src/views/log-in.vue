<template>
  <div class="container mx-auto px-4 py-12">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold mb-6 text-center">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-medium mb-2">Email:</label>
          <input type="email" id="email" v-model="email" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-medium mb-2">Password:</label>
          <input type="password" id="password" v-model="password" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        <div v-if="errorMessage" class="text-red-500 mb-4">{{ errorMessage }}</div>
        <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed">
          <span v-if="isSubmitting">Logging in...</span>
          <span v-else>Login</span>
        </button>
        <p class="text-center mt-6">
          Don't have an account? <router-link to="/sign-up" class="text-blue-500 hover:underline">Sign up here</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'pinia';
import { supabase } from '../supabase.config'; // Import supabase client

const router = useRouter();
const store = useStore(); // Assuming you have a Pinia store set up

const email = ref('');
const password = ref('');
const errorMessage = ref(null);
const isSubmitting = ref(false);


const login = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;

  try {
    const { user, session, error } = await supabase.auth.signIn({
      email: email.value,
      password: password.value,
    });

    if (error) {
      errorMessage.value = error.message;
      console.error("Login Error:", error);
    } else {
      store.setUser(user);  // Assuming you have these actions in your Pinia store
      store.setSession(session);

      router.push('/profile');
    }
  } catch (error) {
    errorMessage.value = 'An unexpected error occurred.';
    console.error('Unexpected Login Error:', error);
  } finally {
    isSubmitting.value = false;
  }
};

</script>