<script setup lang="ts">
import { useCartStore as addtocard } from "../../stores/test";
import type { Product } from "@/model/cartmodel";
import { ref, onMounted } from 'vue';


const  products  = ref<Product[]>([]);
const cartstore = addtocard();

onMounted(async () =>{
  const data: Product[] = JSON.parse(localStorage.getItem('menus') || '[]');
  products.value = data.filter(product => product.category === 'drink');
})


// In your Vue component for Food
function inserttocard(product: Product) {
  const productWithCategory = {
    ...product,
    category: 'food',  // Add category as 'food' for food products
  };

  // Add the product with the category to the cart store
  cartstore.insertProduct(productWithCategory);

  // Save to 'cart' storage for the current session
  localStorage.setItem('cart', JSON.stringify(cartstore.cart));
}

</script>

<template>
  <div class="w-full h-full flex flex-col">
    <!-- Main content with products displayed based on selected category -->
    <div class="grow overflow-y-auto grid grid-cols-12 gap-5 p-3 items-start">
      <div v-for="product in products" :key="product.id"
        class="col-span-12 lg:col-span-3 xl:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden border p-6">
        <img :src="product.image" alt="">

        <h1 class="lg:text-2xl text-2xl font-bold">{{ product.name }}</h1>
        <div class="flex justify-between gap-y-10 items-center">
          <h1 class="text-red-600 lg:text-2xl text-xl">$ {{ product.price }}</h1>
          <button @click="inserttocard(product)" type="button"
            class="text-black lg:text-xl bg-green-300 hover:bg-green-600 rounded-lg p-3">Order now</button>
        </div>
      </div>
    </div>
    <CartIcon />
  </div>
</template>
