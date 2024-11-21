<script setup lang="ts">
import ClientLayout from "@/components/layouts/ClientLayout.vue";
</script>
<!--  -->
<!--  -->
<template>
  <ClientLayout>
    <template #content>
      <div class="bg-[url('../src/assets/Image/08.jpg')] flex flex-col h-screen w-full bg-no-repeat bg-cover bg-center items-center justify-center gap-10 ">
        <img src="../assets/Image/Icon.png" alt="" class="w-1/3">
        <RouterLink to="/menu"><button class="text-white text-2xl bg-orange-600 hover:bg-orange-700 p-3 rounded-lg">ចាប់ផ្តើមការកម្មង់</button></RouterLink>
      </div>
    </template>
  </ClientLayout>
</template>
