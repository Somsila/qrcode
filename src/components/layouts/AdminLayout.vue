<script setup lang="ts">
import FoodProduct from '@/views/FoodProduct.vue';
import DrinkProduct from '@/views/DrinkProduct.vue';
import { ref } from 'vue';

// Menu visibility state
const isMenuOpen = ref(false);

// Defult website menu
const selectedMenu = ref<string>('foodproduct');

// Toggle menu function
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Function to handle menu item selection
const selectMenu = (menu: string) => {
  selectedMenu.value = menu;
  isMenuOpen.value = false; // Close the menu after selection
};
</script>

<template>

  <div class="min-h-screen flex flex-col">
    <!-- Navbar -->
    <header class="flex justify-between items-center p-4 border-b sticky top-0 z-10 bg-white">
      <!-- Hamburger Icon -->
      <div class="space-y-1 cursor-pointer" @click="toggleMenu">
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
        <div class="w-6 h-0.5 bg-black"></div>
      </div>

      <!-- Title (Admin) -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <h1 class="font-bold text-4xl italic font-serif">Admin</h1>
      </div>
    </header>


    <!-- Sliding Menu -->
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 z-20 transition-opacity duration-300" v-if="isMenuOpen"
      @click="toggleMenu"></div>
    <div
      class="fixed left-0 top-0 w-64 h-full bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': isMenuOpen, '-translate-x-full': !isMenuOpen }">
      <div class="p-4">
        <nav class="flex flex-col space-y-2 p-4 bg-gray-100 rounded-lg shadow-md">

          <!-- Discount Menu-->
          <div class="flex items-center space-x-2 pt-5 cursor-pointer" @click="selectMenu('foodproduct')">
            <img src="https://cdn-icons-png.flaticon.com/512/2771/2771401.png" alt="" class="w-10 h-10">
            <h1 class="font-bold">Food</h1>
          </div>
          <!-- Manage User -->
          <div class="flex items-center space-x-2 pt-5 cursor-pointer" @click="selectMenu('drinkproduct')">
            <img src="https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/drink.png" alt="" class="w-10 h-10">
            <h1 class="font-bold">Drink</h1>
          </div>
        </nav>
      </div>
    </div>

    <!-- Board Content -->
    <div class="flex-1 p-6 bg-gray-50">
      <!-- Conditionally render DiscountAdmin when "Discount" menu is selected -->
      <div v-if="selectedMenu === 'foodproduct'">
        <FoodProduct/>
      </div>
      <!-- Conditionally render DiscountAdmin when "Discount" menu is selected -->
      <div v-if="selectedMenu === 'drinkproduct'">
        <DrinkProduct/>
      </div>

    </div>
  </div>
</template>
