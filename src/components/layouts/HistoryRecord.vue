<script setup lang="ts">
// Import the necessary types
import type { HistoryCartModel } from '@/model/historymodel';
import { ref, onMounted } from 'vue';

// Initialize cart items from localStorage or default to an empty array
const cartItems = ref<HistoryCartModel[]>([]);

// Load cart items from localStorage on mount
onMounted(() => {
  const storedCart = localStorage.getItem('historycart');
  cartItems.value = storedCart ? JSON.parse(storedCart) : [];
});

// Function to clear cart from localStorage
const clearCart = () => {
  localStorage.removeItem('historycart');
  cartItems.value = [];
};
</script>



<template>
  <div class="w-full px-4 py-6">
    <!-- Cart Header -->
    <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>

    <!-- Cart Items List -->
    <div v-if="cartItems.length > 0">
      <ul class="divide-y">
        <!-- Loop through each cart category -->
        <li v-for="cartItem in cartItems" :key="cartItem.id" class="py-4">
          <h3 class="font-semibold text-lg mb-2">Category ID: {{ cartItem.id }}</h3>

          <!-- Loop through the items within each cart category -->
          <ul>
            <li v-for="item in cartItem.item" :key="item.id" class="flex justify-between items-center p-3">
              <div class="flex items-center">
                <img :src="item.image" alt="" class="w-12 h-12 object-cover mr-4">
                <div>
                  <p class="font-medium">{{ item.name }}</p>
                  <p class="text-gray-600">Price: ${{ item.price }}</p>
                  <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
                </div>
              </div>
              <p class="font-semibold text-right">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
            </li>
          </ul>

          <!-- Total for this category -->
          <div class="mt-4 flex justify-between items-center font-bold text-lg">
            <h1>Total for Category:</h1>
            <span>${{ cartItem.item.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) }}</span>
          </div>
        </li>
      </ul>

      <!-- Overall Total -->
      <div class="flex justify-between items-center mt-6 font-bold text-lg">
        <h1>Total:</h1>
        <span>${{ cartItems.reduce((total, cartItem) => total + cartItem.item.reduce((sum, item) => sum + (item.price * item.quantity), 0), 0).toFixed(2) }}</span>
      </div>

      <!-- Clear Cart Button -->
      <div class="mt-6 text-center">
        <button @click="clearCart" class="w-full bg-red-600 text-white rounded-lg py-2 hover:bg-red-700 transition">
          Clear Cart
        </button>
      </div>
    </div>

    <!-- Empty Cart State -->
    <div v-else class="text-center text-gray-500 my-6">
      <p>Your cart is empty.</p>
    </div>
  </div>
</template>


