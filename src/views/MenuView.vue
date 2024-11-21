<script setup lang="ts">
import { ref } from 'vue';
import FoodMenu from "../components/layouts/FoodMenu.vue";
import DrinkMenu from "../components/layouts/DrinkMenu.vue";


// This will track which board (food or drink) is currently selected
const selectedBoard = ref('food');

// Function to change the selected board
function changeBoard(board: string) {
  selectedBoard.value = board;
}


</script>

<template>
  <div>
    <div class="flex items-center gap-3 bg-blue-800 sticky top-0 p-3 ">
      <img src="../assets/Image/Icon.png" alt="" class="w-10 h-10 rounded-full">
      <h1 class="text-white font-bold text-3xl">Menu</h1>

      <!-- Buttons to switch between food and drink boards -->
      <div class="flex gap-3">
        <button @click="changeBoard('food')"
          class="font-bold bg-green-600 px-5 py-2 rounded-lg hover:bg-green-300">Food</button>
        <button @click="changeBoard('drink')"
          class="font-bold bg-green-600 px-5 py-2 rounded-lg hover:bg-green-300">Drink</button>
          <button @click="changeBoard('history')"
          class="font-bold bg-green-600 px-5 py-2 rounded-lg hover:bg-green-300">History</button>
      </div>

    </div>



    <!-- Conditional rendering for FoodMenu or DrinkMenu based on the selected board -->
    <div v-if="selectedBoard === 'food'">
      <FoodMenu />
    </div>
    <div v-if="selectedBoard === 'drink'">
      <DrinkMenu />
    </div>
    <div v-if="selectedBoard === 'history'">
      <HistoryRecord/>
    </div>
  </div>


</template>
