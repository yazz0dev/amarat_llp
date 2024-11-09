<template>
  <div class="container">
    <section class="about-us">
      <h2>About Us</h2>
      <p class="about-text">
        Amrat Holidays LLP is a leading travel agency dedicated to providing unforgettable travel experiences to our valued customers. 
        With years of experience in the travel industry, we have established ourselves as experts in crafting personalized itineraries, 
        offering a wide selection of curated travel packages, and providing exceptional customer service.
      </p>
    </section>

    <section class="mission">
      <h3>Our Mission</h3>
      <p class="mission-text">
        Our mission is to inspire and empower travelers to explore the world, discover new cultures, and create lasting memories. 
        We believe that travel should be accessible to everyone, and we strive to make the planning process seamless and enjoyable.
      </p>
    </section>

    <section class="team">
      <h3>Our Team</h3>
      <p class="team-text">
        Our team of passionate travel advisors is committed to providing personalized recommendations and expert guidance throughout your journey. 
        We are dedicated to ensuring that your travel experience exceeds your expectations.
      </p>
      <div class="team-members"> 
        <div class="team-member" v-for="(member, index) in teamMembers" :key="index">
          <img :src="member.image" :alt="member.name" class="member-image">
          <h4>{{ member.name }}</h4>
          <p>{{ member.title }}</p>
        </div>
      </div>
    </section>

    </div>
</template>

<script>
export default {
  data() {
    return {
      teamMembers: [
        {
          name: "John Doe",
          title: "Senior Travel Advisor",
          image: require('@/assets/team-member-1.jpg'),
        },
        {
          name: "Jane Smith",
          title: "Travel Specialist",
          image: require('@/assets/team-member-2.jpg'), 
        },
        // Add more team members here
      ],
    };
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
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: #333;
}

section {
  margin-bottom: 30px;
}

h3 {
  color: #333;
  margin-bottom: 15px;
}

.about-text,
.mission-text,
.team-text {
  line-height: 1.6;
  color: #555;
}

/* Team Member Styles */
.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid */
  grid-gap: 20px;
}

.team-member {
  text-align: center; 
}

.member-image {
  width: 150px;
  height: 150px;
  border-radius: 50%; /* Make images circular */
  object-fit: cover;
  margin-bottom: 10px;
}

.team-member h4 {
  margin-bottom: 5px;
  color: #333;
}

.team-member p {
  color: #555;
}
</style>