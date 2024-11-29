<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase.config';

const name = ref('');
const email = ref('');
const message = ref('');
const messageSent = ref(false);
const errorMessage = ref(null);
const isSubmitting = ref(false);

const sendMessage = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;
  messageSent.value = false;

  const messageData = {
    name: name.value,
    email: email.value,
    message: message.value,
  };

  try {
    const { data, error } = await supabase.functions.invoke('contact', {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (error) {
      console.error('Error sending message:', error);
      errorMessage.value = error.message || 'An error occurred while sending your message.';
    } else {
      console.log('Message sent:', data);
      messageSent.value = true;
      name.value = '';
      email.value = '';
      message.value = '';
    }
  } catch (error) {
    console.error('Error sending message (catch):', error);
    errorMessage.value = error.message || 'An error occurred while sending your message.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="contact-page min-h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-gray-100 font-roboto py-6">
    <div class="container max-w-2xl mx-auto w-full px-4">
      <div class="contact-form-card bg-white p-8 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <p class="text-gray-600 mb-8">Have a question or need assistance? We'd love to hear from you!</p>
        <form @submit.prevent="sendMessage">
          <div class="mb-6">
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900">Name:</label>
            <input type="text" id="name" v-model="name" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          </div>
          <div class="mb-6">
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900">Email:</label>
            <input type="email" id="email" v-model="email" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          </div>
          <div class="mb-6">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-900">Message:</label>
            <textarea id="message" v-model="message" rows="5" required class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></textarea>
          </div>
          <div v-if="errorMessage" class="text-red-500 text-center mb-4">{{ errorMessage }}</div>

          <button type="submit" :disabled="isSubmitting" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
            <span v-if="isSubmitting" class="inline-flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg> Sending...
            </span>
            <span v-else>Send Message</span>
          </button>          
        </form>
        <div v-if="messageSent" class="text-green-500 text-center mt-6">
          Your message has been sent successfully!
        </div>
      </div>
    </div>
  </div>
</template>
