<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="p-8 bg-white rounded-lg shadow-md text-center">
      <img src="@/assets/404-animation.gif" alt="Lost Traveler Animation" class="w-48 mx-auto mb-4" />

      <h1 class="text-3xl font-semibold mb-2">Lost in Paradise?</h1>
      <p class="text-gray-600 mb-6">Looks like you've taken a detour off the beaten path. Don't worry, adventure awaits!</p>

      <!-- Travel Quiz -->
      <div class="travel-quiz mb-6">
        <h3 class="text-lg font-medium mb-2">Quick Travel Quiz:</h3>
        <p>{{ quizQuestion }}</p>
        <ul class="list-none p-0">
          <li v-for="(option, index) in quizOptions" :key="index" class="inline-block m-2">
            <button @click="checkAnswer(option)" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
              {{ option }}
            </button>
          </li>
        </ul>
        <p v-if="quizResult" class="text-sm text-green-600" v-html="quizResult"></p> 
      </div>

      <div class="search-bar mb-6">
        <input type="text" v-model="searchQuery" placeholder="Search for destinations..." class="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mr-2">
        <button @click="performSearch" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Search</button>
      </div>

      <div class="popular-links mb-6">
        <h3 class="text-lg font-medium mb-2">Popular Destinations:</h3>
        <ul class="list-none p-0">
          <li class="mb-2"><router-link to="/packages" class="text-blue-500 hover:underline">Explore Packages</router-link></li>
          <li class="mb-2"><router-link to="/destinations" class="text-blue-500 hover:underline">Discover Destinations</router-link></li>
          <li class="mb-2"><router-link to="/blog" class="text-blue-500 hover:underline">Read Travel Blogs</router-link></li>
        </ul>
      </div>

      <p class="text-gray-600 mb-2">
        Still lost? <router-link to="/contact" class="text-blue-500 hover:underline">Contact our travel experts</router-link> for assistance.
      </p>

       <p class="text-gray-600 mb-2">
        Want to report a broken link? <a href="#" @click.prevent="reportBrokenLink" class="text-blue-500 hover:underline">Let us know</a>.
      </p>

      <div class="random-fact mt-4">
        <p class="text-sm text-gray-500 italic">{{ randomFact }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
  export default {
    name: 'NotFound',
    data() {
      return {
        searchQuery: '',
        quizQuestion: 'What is the capital of France?',
        quizOptions: ['London', 'Paris', 'Berlin', 'Rome'],
        quizResult: '',
        randomFact: 'The Great Barrier Reef is the largest living structure on Earth.', // Get this dynamically if possible
        // Add your list of travel facts or fetch them from an API
      };
    },
    methods: {
      performSearch() {
        // Implement your search logic here (e.g., redirect to search results page)
        if (this.searchQuery) {
          this.$router.push({ path: '/search', query: { q: this.searchQuery } });
        }
      },
      checkAnswer(answer) {
        if (answer === 'Paris') {
          this.quizResult = 'Correct! You know your capitals!';
        } else {
          this.quizResult = 'Oops, that\'s not quite right. The capital of France is Paris.';
        }
      },
      reportBrokenLink() {
        // Implement logic to collect information about the broken link and send it to you
        alert('Broken link reported! We appreciate your feedback.');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here to make it visually appealing */
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f5f5f5;
  }
  
  .content {
    text-align: center;
    padding: 50px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .animation img {
    max-width: 200px;
    margin-bottom: 20px;
  }
  
  .travel-quiz ul {
    list-style: none;
    padding: 0;
  }
  
  .travel-quiz li {
    display: inline-block;
    margin: 5px;
  }
  
  button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .search-bar {
    margin: 20px 0;
  }
  
  .popular-links ul {
    list-style: none;
    padding: 0;
  }
  
  .popular-links li {
    margin-bottom: 10px;
  }
  
  .random-fact {
    margin-top: 20px;
    font-style: italic;
  }
  </style>