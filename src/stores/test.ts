import type { CartItem, Product } from '@/model/cartmodel'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<CartItem[]>([])
  const total = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  )

  // Insert product into cart
  function insertProduct(product: Product) {
    const existingProduct = cart.value.find(item => item.id === product.id)

    if (existingProduct) {
      existingProduct.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
    saveCart()
  }

  // Remove an item from the cart
  function removeItem(itemId: number) {
    const index = cart.value.findIndex(item => item.id === itemId)
    if (index !== -1) {
      cart.value.splice(index, 1)
      updateTotal()
    }
    saveCart()
  }

  // Update quantity of a cart item
  function updateQuantity(itemId: number, quantity: number) {
    const item = cart.value.find(i => i.id === itemId)
    if (item) {
      item.quantity = quantity
    }
    saveCart()
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  }

  // Load cart from localStorage if available
  function loadCart() {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      cart.value = JSON.parse(savedCart)
    }
  }

  function clearCart() {
    cart.value = [] // Clear the store
    localStorage.removeItem('cart') // Remove from localStorage
  }

  loadCart()

  return {
    cart: computed(() => cart.value),
    total,
    insertProduct,
    removeItem,
    updateQuantity,
    saveCart,
    loadCart,
    clearCart,
  }
})
function updateTotal() {
  throw new Error('Function not implemented.')
}
