<template>
  <div>
    <div class="flex flex-col md:flex-row gap-8">
      <!-- Filters Sidebar -->
      <div class="w-full md:w-64 space-y-6">
        <div class="card p-4">
          <h3 class="text-lg font-semibold mb-4">Filters</h3>
          
          <!-- Price Range -->
          <div class="mb-4">
            <h4 class="font-medium mb-2">Price Range</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.under10"
                  @change="applyFilters"
                >
                <span class="ml-2">Under $10</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.tenTo20"
                  @change="applyFilters"
                >
                <span class="ml-2">$10 - $20</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.twentyTo30"
                  @change="applyFilters"
                >
                <span class="ml-2">$20 - $30</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.priceRanges.over30"
                  @change="applyFilters"
                >
                <span class="ml-2">Over $30</span>
              </label>
            </div>
          </div>

          <!-- Categories -->
          <div class="mb-4">
            <h4 class="font-medium mb-2">Categories</h4>
            <div class="space-y-2">
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.fiction"
                  @change="applyFilters"
                >
                <span class="ml-2">Fiction</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.nonFiction"
                  @change="applyFilters"
                >
                <span class="ml-2">Non-Fiction</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.science"
                  @change="applyFilters"
                >
                <span class="ml-2">Science</span>
              </label>
              <label class="flex items-center">
                <input 
                  type="checkbox" 
                  class="rounded text-primary-600"
                  v-model="filters.categories.history"
                  @change="applyFilters"
                >
                <span class="ml-2">History</span>
              </label>
            </div>
          </div>

          <!-- Clear Filters -->
          <button 
            class="btn btn-secondary w-full mt-4"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Books Grid -->
      <div class="flex-1">
        <!-- Search and Sort -->
        <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div class="w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Search books..." 
              class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
              v-model="searchQuery"
              @input="applyFilters"
            >
          </div>
          <select 
            class="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            v-model="sortBy"
            @change="applyFilters"
          >
            <option value="featured">Sort by: Featured</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <!-- Books Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="book in filteredBooks" :key="book.id" class="card group">
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

        <!-- No Results Message -->
        <div v-if="filteredBooks.length === 0" class="text-center py-8">
          <p class="text-gray-500">No books found matching your criteria.</p>
        </div>

        <!-- Pagination -->
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button 
              class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
              :disabled="currentPage === 1"
              @click="currentPage--"
            >Previous</button>
            <button 
              v-for="page in totalPages" 
              :key="page"
              class="px-3 py-1 rounded-md"
              :class="currentPage === page ? 'bg-primary-600 text-white' : 'border border-gray-300 text-gray-700 hover:bg-gray-50'"
              @click="currentPage = page"
            >{{ page }}</button>
            <button 
              class="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
            >Next</button>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

// In a real application, this would be fetched from an API
const allBooks = ref([
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    price: 14.99,
    category: 'fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 12.99,
    category: 'fiction',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 3,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: 9.99,
    category: 'science',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    price: 11.99,
    category: 'fiction',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    title: 'The Origin of Species',
    author: 'Charles Darwin',
    price: 15.99,
    category: 'science',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6,
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    price: 19.99,
    category: 'history',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    title: 'The Art of War',
    author: 'Sun Tzu',
    price: 8.99,
    category: 'nonFiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 8,
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    price: 13.99,
    category: 'fiction',
    cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    price: 16.99,
    category: 'nonFiction',
    cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    title: 'The Guns of August',
    author: 'Barbara W. Tuchman',
    price: 17.99,
    category: 'history',
    cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 11,
    title: 'The Selfish Gene',
    author: 'Richard Dawkins',
    price: 14.99,
    category: 'science',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 12,
    title: 'The Midnight Library',
    author: 'Matt Haig',
    price: 15.99,
    category: 'fiction',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80'
  }
])

// Filter state
const filters = ref({
  priceRanges: {
    under10: false,
    tenTo20: false,
    twentyTo30: false,
    over30: false
  },
  categories: {
    fiction: false,
    nonFiction: false,
    science: false,
    history: false
  }
})

const searchQuery = ref('')
const sortBy = ref('featured')
const currentPage = ref(1)
const itemsPerPage = 6

// Computed properties for filtered and sorted books
const filteredBooks = computed(() => {
  let result = [...allBooks.value]

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(book => 
      book.title.toLowerCase().includes(query) || 
      book.author.toLowerCase().includes(query)
    )
  }

  // Apply price range filters
  const activePriceRanges = Object.entries(filters.value.priceRanges)
    .filter(([_, isActive]) => isActive)
    .map(([range]) => range)

  if (activePriceRanges.length > 0) {
    result = result.filter(book => {
      if (activePriceRanges.includes('under10') && book.price < 10) return true
      if (activePriceRanges.includes('tenTo20') && book.price >= 10 && book.price < 20) return true
      if (activePriceRanges.includes('twentyTo30') && book.price >= 20 && book.price < 30) return true
      if (activePriceRanges.includes('over30') && book.price >= 30) return true
      return false
    })
  }

  // Apply category filters
  const activeCategories = Object.entries(filters.value.categories)
    .filter(([_, isActive]) => isActive)
    .map(([category]) => category)

  if (activeCategories.length > 0) {
    result = result.filter(book => activeCategories.includes(book.category))
  }

  // Apply sorting
  switch (sortBy.value) {
    case 'priceLow':
      result.sort((a, b) => a.price - b.price)
      break
    case 'priceHigh':
      result.sort((a, b) => b.price - a.price)
      break
    case 'newest':
      // In a real application, we would sort by date
      break
    default:
      // Featured - no specific sorting
      break
  }

  // Apply pagination
  const start = (currentPage.value - 1) * itemsPerPage
  return result.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => {
  return Math.ceil(allBooks.value.length / itemsPerPage)
})

// Methods
const applyFilters = () => {
  currentPage.value = 1 // Reset to first page when filters change
}

const clearFilters = () => {
  filters.value = {
    priceRanges: {
      under10: false,
      tenTo20: false,
      twentyTo30: false,
      over30: false
    },
    categories: {
      fiction: false,
      nonFiction: false,
      science: false,
      history: false
    }
  }
  searchQuery.value = ''
  sortBy.value = 'featured'
  currentPage.value = 1
}

const addToCart = (book) => {
  cartStore.addItem({
    id: book.id,
    title: book.title,
    price: book.price,
    quantity: 1
  })
}
</script> 