<template>
  <div class="home-page">
    <section class="hero-section">
      <div class="hero-content">
        <h1>Amrat Holidays LLP</h1>
        <h2>Your Gateway to Unforgettable Travel Experiences</h2>

        <div class="hero-buttons">
          <router-link to="/packages" class="btn btn-primary">Browse Packages</router-link>
          <router-link to="/planner" class="btn btn-secondary">Start Planning</router-link>
        </div>
      </div>
    </section>

    <section class="featured-destinations">
      <h2>Featured Destinations</h2>
      <div class="destination-cards">
        <div class="destination-card" v-for="destination in featuredDestinations" :key="destination.id">
          <img :src="destination.image" alt="destination image">
          <div class="card-overlay">
            <h3>{{ destination.name }}</h3>
            <p>{{ destination.description }}</p>
            <router-link :to="`/destination/${destination.id}`" class="btn">Explore →</router-link>
          </div>

        </div>
      </div>
    </section>

    <section class="what-we-offer">
      <h2>What We Offer</h2>
      <div class="offer-cards">
        <div class="offer-card" v-for="offer in offers" :key="offer.title">
          <i :class="offer.iconClass"></i>
          <h3>{{ offer.title }}</h3>
          <p>{{ offer.description }}</p>
          <router-link :to="offer.link" class="btn">{{ offer.buttonText }} →</router-link>
        </div>
      </div>
    </section>


    <section class="testimonials">
      <div class="testimonial-slider">
        <div class="testimonial-slide" v-for="(review, index) in reviews" :key="index">
          <p class="quote">"{{ review.text }}"</p>
          <p class="author">- {{ review.author }}</p>
        </div>
      </div>
      <div class="testimonial-navigation"></div>
    </section>

    <section class="call-to-action">
      <h2>Ready for an Adventure?</h2>
      <p>Contact us today to start planning!</p>
      <router-link to="/contact" class="btn">Get Started →</router-link>
    </section>
  </div>
</template>

<script>


export default {
  name: 'HomePage',
  data() {
    return {
      searchQuery: '',
      featuredDestinations: [
        {
          id: 1,
          name: 'Paris',
          description: 'Experience the magic of the City of Lights.',
          image: require('@/assets/paris.jpg'), // Example image path. Replace with your actual path.          
        },
        {
          id: 2,
          name: 'Tokyo',
          description: 'Explore the vibrant culture of Japan.',
          image: require('@/assets/tokyo.jpg'),// Example image path. Replace with your actual path.
        },
        {
          id: 3,
          name: 'Maldives',
          description: 'Relax on pristine beaches and enjoy luxurious overwater bungalows.',
          image: require('@/assets/maldives.jpg'),// Example image path. Replace with your actual path.
        },
      ],
      offers: [ // ... (same as before)
        {
          title: 'Curated Packages',
          description: 'Explore our handpicked travel packages to stunning destinations. We offer diverse options to cater to your preferences and budget.',
          iconClass: 'fas fa-suitcase',
          link: '/packages',
          buttonText: 'View Packages'
        },
        {
          title: 'Personalized Trip Planner',
          description: 'Craft your dream itinerary with our intuitive trip planner. Select your destinations, activities, and accommodations to create a personalized journey.',
          iconClass: 'fas fa-route',
          link: '/planner',
          buttonText: 'Plan Your Trip'
        },
        {
          title: 'Expert Travel Advice',
          description: 'Our team of experienced travel advisors is dedicated to providing personalized recommendations and support throughout your planning process.',
          iconClass: 'fas fa-headset',
          link: '/contact',
          buttonText: 'Contact Us'
        },

      ],
      reviews: [ // ... (same as before)
        { text: "Amrat Holidays planned an amazing trip for us! Everything was seamless and we had a wonderful time.", author: "John Doe" },
        { text: "The trip planner tool was so helpful in creating our itinerary. We highly recommend their services.", author: "Jane Smith" },
        { text: "Excellent customer service and attention to detail. Our trip to the Maldives was unforgettable!", author: "Emily Brown" }

      ],

    };
  },





};
</script>


<style lang="scss" scoped>
$primary-color: #007bff;
$secondary-color: #6c757d;


// Mixins for reusability and maintainability.
@mixin section-styles {
  padding: 40px 0;
  text-align: center;
}

@mixin card-styles {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

}



// Styling for all sections.

section {
  @include section-styles;
}


//Hero Section styles
.hero-section {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("@/assets/hero-image.jpg"); // Using placeholder image
  background-size: cover;
  color: white;
  min-height: calc(100vh - 70px); // Adjust to your navbar height if needed
  display: flex;
  align-items: center;

  .hero-content {
    padding: 20px;

    h1 {
      font-size: 3rem;
      margin-bottom: 1rem;

    }

    h2 {
      font-size: 1.5rem;

    }

    .search-bar {
      margin-bottom: 20px;
      display: flex;
    }

    .hero-buttons {

      display: flex;
      margin-top: 20px;

      a {
        margin: 0 10px;
        background-color: $primary-color; // Or another style
        color: white;
        padding: 10px 20px;
        border-radius: 5px;

        text-decoration: none; // Remove underline
        transition: background-color 0.3s ease;

        &:hover {
          background-color: color.adjust($primary-color, $lightness: -10%); // Use color.adjust
        }

      }

    }


  }

}


// Featured Destinations Styles
.featured-destinations {
  background-color: #f8f9fa;

  .destination-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .destination-card {
      @include card-styles;
      width: 300px;
      margin: 10px;
      position: relative;

      img {
        width: 100%;
        height: 200px;
        object-fit: cover;
      }

      .card-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
        color: white;
        /* Text color inside the overlay */
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        /* Align content to bottom */
        padding: 20px;
        opacity: 0;
        transition: opacity 0.3s ease;

        /* Smooth transition for overlay */
        &:hover {
          opacity: 1;
        }
      }


      &:hover {
        transform: translateY(-5px);
      }

    }
  }
}
// What We Offer Styles

.what-we-offer {
  .offer-cards {
    display: flex;
    justify-content: center;

    .offer-card {
      @include card-styles;
      width: 350px; // Adjust card widths as needed        
      margin: 20px;
      padding: 20px;

      i {
        font-size: 2rem;
        margin-bottom: 15px;
        color: $primary-color;
      }

      .btn {
        display: inline-block;
        /* Or block */
        background-color: $primary-color;
        color: white;
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        text-decoration: none;
        transition: background-color 0.3s ease;

        /* Add transition for :hover effect */
        &:hover {
          background-color: color.adjust($primary-color, $lightness: -10%); // Use color.adjust
        }
      }

      &:hover {
        transform: translateY(-5px);
      }
    }
  }
}

// Testimonials Styles
.testimonials {
  background-color: #f8f9fa;
  overflow: hidden; //Needed to prevent margin collapsing issue if testimonials wrap.   

  .testimonial-slider {
    display: flex;
    transition: transform 0.5s ease-in-out; //Transition for smooth sliding 

    .testimonial-slide {
      flex: 0 0 100%; // Each slide takes full width. If less width is provided other testimonial  will also show along side, giving bad ux experience
      padding: 20px 40px; // Adequate spacing between quote and edges

      p {
        font-size: 1.2rem;
        /* Larger text for quotes */
      }

      .author {
        font-style: italic; // Use Italic for author, adjust font properties as desired.                
      }
    }


  }
}

//Call To Action Styles
.call-to-action {
  background-color: $secondary-color;
  color: white;

  .btn {
    display: inline-block;
    background-color: $primary-color;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 20px;

    &:hover {
      background-color: color.adjust($primary-color, $lightness: -10%); // Use color.adjust
    }


  }

}
</style>