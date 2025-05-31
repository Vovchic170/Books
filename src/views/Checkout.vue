<template>
  <div class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Order Summary -->
      <div class="md:col-span-2">
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Order Summary</h2>
          <div class="space-y-4">
            <div v-for="item in cartStore.items" :key="item.id" class="flex items-center justify-between py-2 border-b">
              <div class="flex items-center space-x-4">
                <div class="flex-1">
                  <h3 class="font-medium">{{ item.title }}</h3>
                  <p class="text-sm text-gray-500">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-medium">${{ (item.price * item.quantity).toFixed(2) }}</p>
              </div>
            </div>
          </div>
          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">${{ cartStore.totalPrice.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Shipping</span>
              <span class="font-medium">$5.00</span>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Tax</span>
              <span class="font-medium">${{ (cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t">
              <span>Total</span>
              <span class="text-primary-600">${{ (cartStore.totalPrice + 5 + cartStore.totalPrice * 0.1).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="md:col-span-1">
        <div class="card p-6">
          <h2 class="text-xl font-semibold mb-4">Payment Details</h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
              <input type="text" placeholder="1234 5678 9012 3456" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input type="text" placeholder="MM/YY" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input type="text" placeholder="123" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
              <input type="text" placeholder="John Doe" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" placeholder="john@example.com" class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
            </div>
            <button type="submit" class="btn btn-primary w-full">Place Order</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const handleSubmit = () => {
  // In a real application, this would process the payment
  alert('Order placed successfully!')
  cartStore.items = [] // Clear the cart
  router.push('/') // Redirect to home page
}
</script> 