<template>
  <div class="container">
    <h2>Frequently Asked Questions</h2>

    <div class="faq-accordion">
      <div class="faq-item" v-for="(item, index) in faqItems" :key="index">
        <button class="accordion-button" @click="toggleAccordion(index)">
          <h3>{{ item.question }}</h3>
          <span class="accordion-icon" :class="{ active: item.isOpen }">+</span> 
        </button>
        <div class="accordion-content" v-show="item.isOpen">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      faqItems: [
        {
          question: "How do I book a travel package?",
          answer: "You can easily book a travel package through our website by selecting your desired package and following the booking instructions. You can also contact our travel advisors for assistance.",
          isOpen: false, // Initially closed
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept major credit cards, debit cards, and online payment platforms.",
          isOpen: false,
        },
        {
          question: "Can I customize a travel package?",
          answer: "Yes, we offer customized travel packages to meet your specific needs and preferences. Contact our travel advisors to discuss your requirements.",
          isOpen: false,
        },
        // Add more FAQ items here
      ],
    };
  },
  methods: {
    toggleAccordion(index) {
      this.faqItems[index].isOpen = !this.faqItems[index].isOpen;
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 40px auto; /* Centered on page */
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: #333;
}

.faq-accordion {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


.faq-item {
  border-bottom: 1px solid #ddd;
  padding: 15px 20px;
}


.accordion-button {
  width: 100%;
  display: flex;
  justify-content: space-between; /* Align question and icon */
  align-items: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 1.1rem;
  color: #333;
  transition: background-color 0.3s ease;
}

.accordion-button:hover {
  background-color: #f8f9fa; /* Subtle hover effect */
}

.accordion-button h3 {
  margin: 0; /* Remove default h3 margin */
  flex-grow: 1; /* Allow question to take up available space */
}

.accordion-icon {
  display: inline-block;
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.accordion-icon.active {
  transform: rotate(45deg); /* Rotate + icon when open */
}

.accordion-content {
  padding-top: 10px; /* Add some top padding */
  color: #555; /* Slightly darker text color for answers */
}

.faq-item:last-child {
  border-bottom: none; /* Remove bottom border from last item */
}

</style>