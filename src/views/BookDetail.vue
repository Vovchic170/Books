<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Book Image -->
      <div class="card overflow-hidden">
        <img :src="book.cover" :alt="book.title" class="w-full h-full object-cover">
      </div>

      <!-- Book Details -->
      <div>
        <h1 class="text-3xl font-bold text-gray-900">{{ book.title }}</h1>
        <p class="text-xl text-gray-600 mt-2">by {{ book.author }}</p>
        
        <div class="mt-4 flex items-center space-x-4">
          <div class="flex items-center">
            <span class="text-yellow-400">★★★★★</span>
            <span class="ml-2 text-gray-600">({{ book.reviews }} reviews)</span>
          </div>
          <span class="text-gray-600">|</span>
          <span class="text-gray-600">{{ book.details.paperback }}</span>
        </div>

        <div class="mt-6">
          <h2 class="text-2xl font-bold text-primary-600">${{ book.price }}</h2>
          <p class="text-green-600 mt-2">In Stock: {{ book.stock }}</p>
        </div>

        <div class="mt-6 space-y-4">
          <div class="flex items-center space-x-4">
            <button class="btn btn-primary flex-1" @click="addToCart">Add to Cart</button>
            <button class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-2">Description</h3>
          <p class="text-gray-600">{{ book.description }}</p>
        </div>

        <div class="mt-8">
          <h3 class="text-lg font-semibold mb-2">Details</h3>
          <ul class="space-y-2 text-gray-600">
            <li><span class="font-medium">Publisher:</span> {{ book.details.publisher }}</li>
            <li><span class="font-medium">Publication Date:</span> {{ book.details.publicationDate }}</li>
            <li><span class="font-medium">Language:</span> {{ book.details.language }}</li>
            <li><span class="font-medium">ISBN:</span> {{ book.details.isbn }}</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Related Books -->
    <div class="mt-16">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" class="card group">
          <router-link :to="'/book/' + relatedBook.id">
            <div class="relative aspect-[3/4] overflow-hidden">
              <img :src="relatedBook.cover" :alt="relatedBook.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300">
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-900">{{ relatedBook.title }}</h3>
              <p class="text-gray-600">{{ relatedBook.author }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-primary-600 font-semibold">${{ relatedBook.price }}</span>
                <button class="btn btn-primary">Add to Cart</button>
              </div>
            </div>
          </router-link>
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

// In a real application, this would be fetched from an API based on the book ID
const book = ref({
  id: 1,
  title: 'The Great Gatsby',
  author: 'F. Scott Fitzgerald',
  rating: 4.5,
  reviews: 128,
  price: 14.99,
  stock: 15,
  cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
  description: 'The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway\'s interactions with mysterious millionaire Jay Gatsby and Gatsby\'s obsession to reunite with his former lover, Daisy Buchanan.',
  details: {
    publisher: 'Scribner',
    publicationDate: 'April 10, 1925',
    language: 'English',
    paperback: '240 pages',
    isbn: '978-0743273565',
    dimensions: '5.5 x 0.6 x 8.4 inches'
  }
})

const relatedBooks = ref([
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
  }
])

const addToCart = () => {
  cartStore.addItem({
    id: book.value.id,
    title: book.value.title,
    price: book.value.price,
    quantity: 1
  })
}

onMounted(() => {
  // In a real application, we would fetch the book data based on the route.params.id
  console.log('Book ID:', route.params.id)
})
</script> 