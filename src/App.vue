<template>
  <div id="app">
    <nav class="bg-white shadow-lg sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary-600">BookShop</router-link>
          </div>
          <div class="flex items-center space-x-8">
            <router-link to="/" class="text-gray-600 hover:text-primary-600">Home</router-link>
            <router-link to="/books" class="text-gray-600 hover:text-primary-600">Books</router-link>
            <router-link to="/categories" class="text-gray-600 hover:text-primary-600">Categories</router-link>
            <router-link to="/checkout" class="text-gray-600 hover:text-primary-600 flex items-center">
              Cart ({{ cartStore.totalItems }})
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Toast Component -->
    <Toast />
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart'
import Toast from './components/Toast.vue'

const cartStore = useCartStore()
</script>

<style scoped>
/* Add any custom styles here */
</style>