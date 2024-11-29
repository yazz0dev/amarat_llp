<!--Destination details-->
<template>
  <div class="destination-card rounded-lg overflow-hidden shadow-lg relative group bg-white"> 
    <img v-if="destination.image_url" :src="destination.image_url" :alt="destination.name" class="w-full h-64 object-cover transition duration-300 group-hover:scale-105">
    <div v-else class="w-full h-64 bg-gray-300 flex items-center justify-center">
      <span class="text-gray-500">No Image Available</span>  <!-- Placeholder if no image -->
    </div>
    <div class="card-overlay absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition duration-300">
      <h3 class="text-xl font-bold text-white mb-2">{{ destination.name }}</h3>
      <p class="text-white mb-4 line-clamp-3">
        {{ destination.description || "No description available." }}  <!-- Handles missing descriptions -->
      </p>
      <router-link :to="{ name: 'DestinationDetails', params: { id: destination.id } }" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 self-start">
        Explore →
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  destination: {
    type: Object,
    required: true,
  },
});
</script>
  
  <style scoped lang="scss">
  .destination-card {
    position: relative;
    width: 100%; // Adjust as needed for responsiveness
    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;  // Indicate interactivity
    transition: transform 0.3s ease;
  
    &:hover {
      transform: scale(1.03); // Subtle hover effect
    }
  
  
    .card-image {
      width: 100%;
      height: 200px; // Or use aspect-ratio for a consistent aspect ratio
      object-fit: cover;
      display: block; // Prevents a small gap below the image
    }
  
    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: inherit; // Inherit border-radius from parent
  
      &.show-overlay {
        opacity: 1;
      }
  
      .card-title {
        font-size: 1.2em;
        margin-bottom: 0.5em;
      }
  
      .card-description {
        margin-bottom: 1em;
      }
  
      .btn-accent {
        // Your accent button styles here.  Make sure they are visible on dark backgrounds.
        background-color: #4682B4; // Example: Steel Blue
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        align-self: flex-start; // Align button to the left or start
        transition: background-color 0.3s ease;
  
        &:hover {
          background-color: darken(#4682B4, 10%); // Darken on hover
        }
      }
  
    }
  
  }
  </style>