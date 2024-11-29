
<!-- NavigationBarItem.vue -->

<template>
  <router-link :to="to" :class="classes" @click="$emit('click')">
    {{ label }}
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  mobile: {
    type: Boolean,
    default: false,
  },
  activeClass: {
    type: String,
    default: 'text-blue-600 underline'
  }
});

const route = useRoute();


const classes = computed(() => {
  let baseClasses = "text-gray-700 hover:text-blue-500 transition duration-300";
  if (props.mobile) {
    baseClasses += " block py-2 text-center";
  }

  // Active class logic remains the same
  if (props.to === route.path) {
    baseClasses += ` ${props.activeClass}`;
  }

  return baseClasses;
});
</script>
