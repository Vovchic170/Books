<template>
  <div>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Category Info -->
      <div class="w-full md:w-64">
        <div class="card p-6">
          <div class="text-4xl mb-4">{{ category.icon }}</div>
          <h1 class="text-2xl font-bold text-gray-900">{{ category.name }}</h1>
          <p class="text-gray-600 mt-2">{{ category.count }} books</p>
          <p class="text-gray-600 mt-4">{{ category.description }}</p>
        </div>
      </div>

      <!-- Books Grid -->
      <div class="flex-1">
        <!-- Search and Sort -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div class="w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search in category..." 
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
          </div>
          <select class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Newest First</option>
          </select>
        </div>

        <!-- Books Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="book in categoryBooks" :key="book.id" class="card group">
            <div class="relative aspect-[3/4] overflow-hidden">
              <router-link :to="'/book/' + book.id">
                <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
              </router-link>
            </div>
            <div class="p-4">
              <router-link :to="'/book/' + book.id">
                <h3 class="text-lg font-semibold text-gray-900">{{ book.title }}</h3>
                <p class="text-gray-600">{{ book.author }}</p>
              </router-link>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-primary-600 font-semibold">${{ book.price }}</span>
                <button class="btn btn-primary" @click="addToCart(book)">Add to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Previous</button>
            <button class="px-3 py-1 rounded-md bg-primary-600 text-white">1</button>
            <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">2</button>
            <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">3</button>
            <button class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">Next</button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const cartStore = useCartStore()

// In a real application, this would be fetched from an API based on the category ID
const category = ref({
  id: 1,
  name: 'Fiction',
  icon: '📚',
  count: 156,
  description: 'Explore our collection of fiction books, from contemporary novels to classic literature.'
})

const categoryBooks = ref([
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 14.99,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 12.99,
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    price: 9.99,
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    price: 15.99,
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    price: 10.99,
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }
])

const addToCart = (book) => {
  cartStore.addItem({
    id: book.id,
    title: book.title,
    price: book.price,
    quantity: 1
  })
}

onMounted(() => {
  // In a real application, we would fetch the category and its books based on the route.params.id
  console.log('Category ID:', route.params.id)
})
</script> 