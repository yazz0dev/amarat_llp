<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../supabase.config';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import BookingCard from '@/components/BookingCard.vue';

const router = useRouter();
const user = ref(null);
const bookings = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const session = supabase.auth.session();
  if (!session) {
    router.push('/log-in');
    return;
  }

  try {
    const [userResponse, bookingsResponse] = await Promise.all([
      supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single(),
      supabase
        .from('bookings')
        .select(`*, package(*)`)
        .eq('user_id', session.user.id)
    ]);

    if (userResponse.error) throw userResponse.error;
    if (bookingsResponse.error) throw bookingsResponse.error;

    user.value = userResponse.data;
    bookings.value = bookingsResponse.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err.message || 'An unexpected error occurred.';
  } finally {
    loading.value = false;
  }
});

const formatDate = (dateString) => {
  return dayjs(dateString).format('MMMM D, YYYY');
};
</script>

<template>
  <div class="profile-container max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md my-8">
    <div v-if="loading" class="flex flex-col items-center justify-center h-64">
      <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      <p class="mt-4 text-gray-600">Loading profile information...</p>
    </div>
    <div v-else-if="error" class="text-red-500 bg-red-100 p-4 rounded-md">
      {{ error }}
    </div>
    <div v-else-if="user">
      <h2 class="text-2xl font-semibold mb-4">My Profile</h2>
      <div class="profile-info space-y-2">
        <div class="flex">
          <span class="font-medium w-24">Name:</span> {{ user.full_name }}
        </div>
        <div class="flex">
          <span class="font-medium w-24">Email:</span> {{ user.email }}
        </div>
        <div class="flex">
          <span class="font-medium w-24">Username:</span> {{ user.username }}
        </div>
         <div class="flex" v-if="user.avatar_url">
            <span class="font-medium w-24">Avatar:</span>
            <img :src="user.avatar_url" alt="User Avatar" class="rounded-full h-12 w-12">
        </div>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-4">Booking History</h3>
      <div v-if="bookings.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <BookingCard v-for="booking in bookings" :key="booking.id" :booking="booking" />
      </div>
      <div v-else class="text-gray-600 text-center mt-4">No bookings yet.</div>
    </div>
    <div v-else class="text-gray-600 text-center mt-4">Something went wrong. Please try again later.</div>
  </div>
</template>