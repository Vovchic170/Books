import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const toastMessage = ref('')
  const showToast = ref(false)

  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })

  const addItem = (book) => {
    const existingItem = items.value.find(item => item.id === book.id)
    if (existingItem) {
      existingItem.quantity += book.quantity
    } else {
      items.value.push({ ...book })
    }
    showToastMessage(`${book.title} added to cart`)
  }

  const removeItem = (bookId) => {
    const index = items.value.findIndex(item => item.id === bookId)
    if (index > -1) {
      const removedItem = items.value[index]
      items.value.splice(index, 1)
      showToastMessage(`${removedItem.title} removed from cart`)
    }
  }

  const updateQuantity = (bookId, quantity) => {
    const item = items.value.find(item => item.id === bookId)
    if (item) {
      item.quantity = quantity
    }
  }

  const showToastMessage = (message) => {
    toastMessage.value = message
    showToast.value = true
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    toastMessage,
    showToast
  }
}) 