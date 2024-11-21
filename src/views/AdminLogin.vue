<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const hasError = ref(false);

const router = useRouter();

const validUsers = [
  { username: 'admin', password: 'password' },
  { username: 'Somsila', password: 'Somsila123' },
  { username: 'Sila', password: 'Sila123' },
  { username: 'Som', password: 'Sila123' },
];

const login = () => {
  const user = validUsers.find(
    (user) => user.username === username.value && user.password === password.value
  );

  if (user) {
    hasError.value = false;
    errorMessage.value = '';
    router.push('/admin');
  } else {
    hasError.value = true;
    errorMessage.value = 'Invalid username or password';
    // Auto-clear the error message after 3 seconds
    setTimeout(() => {
      errorMessage.value = '';
      hasError.value = false;
    }, 3000);
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500 overflow-hidden relative">
    <!-- Dynamic Gradient Animation -->
    <div class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-30 animate-bg-flow"></div>

    <!-- Animated Login Form -->
    <div
      class="bg-white p-8 rounded-xl shadow-lg w-96 max-w-full transform transition-all duration-700
             ease-in-out animate-form-slide-in hover:shadow-2xl"
      :class="{ 'animate-shake': hasError }"
    >
      <h1 class="text-4xl font-extrabold text-center text-gradient bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 animate-fade-in-down">
        Admin Login
      </h1>
      <form @submit.prevent="login" class="flex flex-col space-y-6">
        <!-- Glowing Input Fields -->
        <input
          v-model="username"
          type="text"
          placeholder="Username"
          class="border p-3 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500
                 focus:ring-opacity-50 transition duration-300 shadow-sm hover:shadow-lg"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="border p-3 rounded-lg w-full focus:outline-none focus:ring-4 focus:ring-purple-500
                 focus:ring-opacity-50 transition duration-300 shadow-sm hover:shadow-lg"
        />
        <!-- Button with Glow and Ripple Effects -->
        <button
          type="submit"
          class="bg-purple-600 text-white py-3 rounded-lg font-semibold tracking-wider
                 hover:bg-purple-700 transition duration-300 transform hover:scale-105
                 focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 relative overflow-hidden"
        >
          <span class="absolute inset-0 bg-purple-800 opacity-0 rounded-lg transform scale-50
                      hover:animate-ripple"></span>
          Login
        </button>
      </form>
      <!-- Error Notification -->
      <p
        v-if="errorMessage"
        class="text-red-500 mt-4 text-center"
        aria-live="assertive"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
