<template>
  <NavigationBar />
    <div class="container mx-auto mt-8 p-4">  <!-- Added container for content -->
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <Footer />
</template>

<script setup>
import NavigationBar from './components/NavigationBar.vue';
import Footer from './components/Footer.vue';
import { onMounted } from 'vue'
import { useAuthStore } from './store/modules/auth'


onMounted(() => {
  authStore.fetchUser();
})

onMounted(async () => {  //Make onMounted async
  const authStore = useAuthStore();
  // Check if there is an existing session before fetching the user. 
  // This usually involves checking for a valid access token in local storage or a cookie
  if (supabase.auth.session()) {  
    await authStore.fetchUser();
  }
});
</script>