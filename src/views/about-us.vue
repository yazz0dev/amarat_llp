<template>
  <div class="about-us-container max-w-7xl mx-auto px-4 py-12">
    <section class="about-section mb-10">
      <h2 class="section-title text-3xl font-bold text-center mb-6">About Us</h2>
      <p class="about-text text-gray-700 text-lg text-justify">
        Amrat Holidays LLP is a leading travel agency dedicated to providing unforgettable travel experiences to our valued customers. With years of experience in the travel industry, we have established ourselves as experts in crafting personalized itineraries, offering a wide selection of curated travel packages, and providing exceptional customer service. We're passionate about travel and committed to making your dream vacations a reality.
      </p>
    </section>

    <section class="mission-section mb-10">
      <h2 class="section-title text-3xl font-bold text-center mb-6">Our Mission</h2>
      <p class="mission-text text-gray-700 text-lg text-justify">
        Our mission is to inspire and empower travelers to explore the world, discover new cultures, and create lasting memories. We believe that travel should be accessible to everyone, and we strive to make the planning process seamless and enjoyable. We're here to help you every step of the way, from choosing your destination to ensuring a smooth and memorable trip.
      </p>
    </section>

    <section class="team-section">
      <h2 class="section-title text-3xl font-bold text-center mb-6">Our Team</h2>
      <p class="team-intro text-gray-700 text-base text-center mb-8">
        Meet the passionate travel advisors who are dedicated to making your travel dreams come true. Our team has extensive experience in the travel industry and is committed to providing exceptional service and personalized recommendations.
      </p>
      <div class="team-members grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div 
          v-for="(member, index) in teamMembers" 
          :key="index" 
          class="team-member bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center"
        >
          <img :src="member.image" :alt="member.name" class="member-image w-40 h-40 rounded-full mx-auto object-cover mb-4 shadow-sm">
          <h4 class="member-name text-xl font-medium text-gray-800 mb-2">{{ member.name }}</h4>
          <p class="member-title text-gray-600">{{ member.title }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import teamMember1 from '@/assets/team-member-1.jpg';
import teamMember2 from '@/assets/team-member-2.jpg';

const teamMembers = [
  {
    name: "John Doe",
    title: "Senior Travel Advisor",
    image: teamMember1, 
  },
  {
    name: "Jane Smith",
    title: "Travel Specialist",
    image: teamMember2,
  },
  // Add more team members here
];


</script>