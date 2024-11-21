// import type { CartItem, Product } from '@/model/cartmodel';
// import { defineStore } from 'pinia';
// import { ref, computed } from 'vue';

// export const useCartStore = defineStore('cart', () => {
//   // Cart ref
//   const cart = ref<CartItem[]>([]);

//   // Insert product into cart
//   function insertProduct(product: Product) {
//     const existingProductIndex = cart.value.findIndex(item => item.id === product.id);

//     if (existingProductIndex === -1) {
//       cart.value.push({ ...product, quantity: 1 });
//     } else {
//       cart.value[existingProductIndex].quantity += 1;
//     }
//     saveCart();
//   }

//   // Clear the cart completely
//   function clearCart() {
//     cart.value = []; // Clear the store
//     localStorage.removeItem('cart'); // Remove from localStorage
//   }

//   // Save cart to localStorage
//   function saveCart() {
//     localStorage.setItem('cart', JSON.stringify(cart.value));
//   }

//   // Load cart only if there’s data in localStorage
//   function loadCart() {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       cart.value = JSON.parse(savedCart);
//     }
//   }

//   // Initialize the cart from localStorage if available
//   loadCart();

//   return { cart: computed(() => cart.value), insertProduct, clearCart, saveCart };
// });
