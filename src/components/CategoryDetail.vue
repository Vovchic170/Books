
<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Category Details</h1>
    <p class="text-gray-600">Category detail component - to be implemented</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('Category ID:', route.params.id)
</script>
