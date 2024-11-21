<!-- HeaderMenu.vue -->
<script setup lang="ts">
import { ref } from 'vue';

const value = ref('value');
const options = ref(['']);

</script>

<template>
  <div class="flex items-center gap-3 bg-blue-800 sticky top-0 p-3">
    <img src="../assets/Image/Icon.png" alt="" class="w-10 h-10 rounded-full">
    <h1 class="text-white font-bold text-3xl">Menu</h1>
    <div class="card flex justify-center">
        <SelectButton v-model="value" :options="options" />
    </div>
  </div>
</template>
