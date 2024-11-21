<script setup lang="ts">
import { useCartStore as addtocard } from "../../stores/test";
import type {  Product } from "@/model/cartmodel";
import { ref, onMounted } from 'vue';
import CartIcon from "@/components/CartIcon.vue";

const products = ref<Product[]>([]);
const cartstore = addtocard();

onMounted(async() => {
  const data: Product[] = JSON.parse(localStorage.getItem('menus') || '[]');
  products.value = data.filter(product => product.category === 'food');
})

// In your Vue component for Drink
function inserttocard(product: Product) {
  const productWithCategory = {
    ...product,
    category: 'drink',  // Add category as 'drink' for drink products
  };

  // Add the product with the category to the cart store
  cartstore.insertProduct(productWithCategory);

  // Save to 'cart' storage for the current session
  localStorage.setItem('cart', JSON.stringify(cartstore.cart));
}
</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Product List -->
    <div class="grow overflow-y-auto grid grid-cols-12 gap-5 p-3 items-start">
      <div v-for="product in products" :key="product.id"
        class="col-span-12 lg:col-span-3 xl:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden border p-6">
        <img :src="product.image" alt="" class="w-full h-40 object-cover mb-4"> <!-- Responsive image styling -->
        <h1 class="lg:text-2xl text-xl font-bold mb-2">{{ product.name }}</h1>
        <div class="flex justify-between items-center">
          <h1 class="text-red-600 lg:text-2xl text-xl">$ {{ product.price }}</h1>
          <button @click="inserttocard(product)" type="button"
            class="text-white bg-green-500 hover:bg-green-600 rounded-lg p-3 lg:text-lg transition-all">
            Order now
          </button>
        </div>
      </div>
    </div>
    <!-- Cart Icon at the bottom -->
    <CartIcon />
  </div>
</template>
