<script setup lang="ts">
import type { CartItem } from '@/model/cartmodel';
import { ref, watch } from 'vue';
import { useCartStore } from '@/stores/test';
import type { HistoryCartModel } from '@/model/historymodel';

const useCartState = useCartStore();

// Initialize cart items from localStorage
const cartItems = ref<CartItem[]>(JSON.parse(localStorage.getItem('cart') || '[]'));

// Dialog and loading states
const visible = ref(false);
const orderConfirmed = ref(false);
const isLoading = ref(false);

// Flag to ignore storage updates after clearing the cart
let cartCleared = false;

// Function to clear the cart
function clearCart(): void {
  cartCleared = true; // Set flag to ignore upcoming localStorage updates
  useCartState.clearCart();
  localStorage.removeItem('cart'); // Clear the cart in localStorage
  cartItems.value = []; // Clear the local cart items to update the UI reactively
}

// Function to confirm the order
const confirmOrder = async () => {
  visible.value = false;
  isLoading.value = true;
  const historycart = ref<HistoryCartModel[]>([]);
  historycart.value = JSON.parse(`${localStorage.getItem('historycart')}`);

  if (historycart.value) {
    // continue pushing value to history cart
    historycart.value.push({id: historycart.value.length + 1, item: useCartState.cart});
    // update history cart
    localStorage.setItem('historycart', JSON.stringify(historycart.value));
  } else {
    // push item to history cart when empty history
    historycart.value = [{id: 1, item: useCartState.cart}]; 
    // update history cart
    localStorage.setItem('historycart', JSON.stringify(historycart.value));
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    orderConfirmed.value = true;
    cartCleared = true; // Set the flag
    cartItems.value = []; // Clear the cart items in the component
    clearCart(); // Call clearCart from your Pinia store to clear everything
  } catch (error) {
    console.error('Error during order confirmation:', error);
  } finally {
    isLoading.value = false;
  }

};

// Watch for changes to the `visible` ref and reload cart items when dialog opens
watch(visible, (newValue) => {
  if (newValue && !cartCleared) { // Only reload if cart has not been cleared
    cartItems.value = JSON.parse(localStorage.getItem('cart') || '[]');
  }
  cartCleared = false; // Reset the flag after opening dialog
});

</script>

<template>
  <!-- Cart Icon Button -->
  <a @click="visible = true" class="fixed bottom-4 right-4 z-50 p-3 rounded-full">
    <!-- Cart Icon -->
    <OverlayBadge severity="danger">
      <i class="pi pi-cart-plus" style="font-size: 3rem" />
    </OverlayBadge>
  </a>

  <!-- Cart Dialog -->
  <Dialog v-model:visible="visible" modal header="Your Cart" class="w-full h-full p-4">
    <div v-if="cartItems.length > 0">
      <h2 class="text-2xl font-semibold mb-4">Your Cart</h2>
      <ul class="divide-y">
        <li v-for="item in cartItems" :key="item.id" class="flex justify-between items-center p-3 border-b">
          <div class="flex items-center">
            <img :src="item.image" alt="" class="w-12 h-12 object-cover mr-4">
            <div>
              <p class="font-medium">{{ item.name }}</p>
              <p class="text-gray-600">Price: ${{ item.price }}</p>
              <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
            </div>
          </div>
          <p class="font-semibold">$ {{ (item.price * item.quantity).toFixed(2) }}</p>
        </li>
      </ul>
      <div class="flex justify-between items-center mt-6 font-bold text-lg">
        <h1>Total:</h1>
        <span>${{ cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2) }}</span>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 my-6">
      <p>Your cart is empty.</p>
    </div>

    <!-- Confirm Order Button -->
    <div class="flex justify-center mt-6">
      <button @click="confirmOrder"
        class="text-white bg-yellow-500 hover:bg-yellow-400 p-3 rounded-lg font-medium transition-all duration-300"
        :disabled="isLoading">
        {{ isLoading ? 'Processing...' : 'Confirm Order' }}
      </button>
    </div>
  </Dialog>

  <!-- Message Dialog -->
  <Dialog v-model:visible="orderConfirmed" class="w-full h-auto mx-4 text-center" :closable="false">
    <p class="lg:text-2xl font-bold text-green-600">Order Success!<br>Thank you!<br>Please wait...</p>
    <div v-if="isLoading" class="mt-4 text-lg">Processing...</div>
    <button @click="orderConfirmed = false" class="mt-4 text-white bg-blue-500 p-2 rounded-lg lg:text-2xl font-bold">
      Close
    </button>
  </Dialog>
</template>
