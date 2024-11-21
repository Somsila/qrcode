<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AddProductDialog from '../components/layouts/AddProductDialog.vue';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  category: string;
  image: string | null;
}

const foods = ref<Product[]>([]);
const showAddProductForm = ref(false);
const newProduct = ref<Product>({
  id: 0,
  name: '',
  price: 0,
  discount: 0,
  category: 'food',
  image: null,
});

// Editing state
const editingProductId = ref<number | undefined>(undefined);

// Deletion state
const selectedProducts = ref<number[]>([]);
const showDeleteConfirmation = ref(false);

// Load products from localStorage on mount
onMounted(() => {
  loadFoodsFromLocalStorage();
});

function loadFoodsFromLocalStorage() {
  const savedProducts = localStorage.getItem('menus');
  if (savedProducts) {
    const data: Product[] = JSON.parse(savedProducts);
    foods.value = data.filter(product => product.category === 'food');
  }
}

// Add or update product
function addProduct(product: Product) {
  const savedProducts = localStorage.getItem('menus');
  const allProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];

  if (editingProductId.value !== undefined) {
    const index = allProducts.findIndex(p => p.id === editingProductId.value);
    if (index !== -1) {
      allProducts[index] = { ...product };
    }
    editingProductId.value = undefined;
  } else {
    const newId = allProducts.length > 0 ? Math.max(...allProducts.map(p => p.id)) + 1 : 101;
    product.id = newId;
    allProducts.push({ ...product });
  }

  localStorage.setItem('menus', JSON.stringify(allProducts));
  loadFoodsFromLocalStorage();
  showAddProductForm.value = false;
}

// Edit a product
function editProduct(product: Product) {
  newProduct.value = { ...product };
  editingProductId.value = product.id;
  showAddProductForm.value = true;
}

// Toggle product selection
function toggleProductSelection(productId: number) {
  if (selectedProducts.value.includes(productId)) {
    selectedProducts.value = selectedProducts.value.filter(id => id !== productId);
  } else {
    selectedProducts.value.push(productId);
  }
}

// Confirm deletion of selected products
function confirmDeletion() {
  const savedProducts = localStorage.getItem('menus');
  let allProducts: Product[] = savedProducts ? JSON.parse(savedProducts) : [];

  allProducts = allProducts.filter(product => !selectedProducts.value.includes(product.id));

  localStorage.setItem('menus', JSON.stringify(allProducts));
  loadFoodsFromLocalStorage();
  selectedProducts.value = [];
  showDeleteConfirmation.value = false;
}

// Reset the new product form
function resetNewProduct() {
  newProduct.value = { id: 0, name: '', price: 0, discount: 0, category: 'food', image: null };
}
</script>

<template>
  <div class="container mx-auto mt-10">
    <h1 class="text-2xl font-bold mb-6 text-center">Food Products</h1>

    <!-- Action Buttons -->
    <div class="flex justify-between items-center mb-4">
      <button
        @click="showAddProductForm = true; resetNewProduct()"
        class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
      >
        <i class="pi pi-plus-circle mr-1"></i> Add Product
      </button>

      <button
        v-if="selectedProducts.length > 0"
        @click="showDeleteConfirmation = true"
        class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
      >
        Delete Selected ({{ selectedProducts.length }})
      </button>
    </div>

    <!-- Product Table -->
    <table class="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
      <thead class="bg-lime-500">
        <tr>
          <th class="border border-gray-300 px-4 py-2 text-left font-bold">ID</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-bold">Product</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-bold">Price</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-bold">Discount</th>
          <th class="border border-gray-300 px-4 py-2 text-left font-bold">Category</th>
          <th class="border border-gray-300 px-4 py-2 text-center font-bold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in foods" :key="product.id" class="hover:bg-gray-50 transition duration-200">
          <td class="border border-gray-300 px-4 py-2">00{{ product.id }}</td>
          <td class="border border-gray-300 px-4 py-2 flex items-center">
            <img :src="product.image || '/default-image.jpg'" :alt="product.name" class="w-10 h-10 mr-2 rounded-full" />
            <span>{{ product.name }}</span>
          </td>
          <td class="border border-gray-300 px-4 py-2 font-semibold text-gray-800">${{ product.price }}</td>
          <td :class="['border border-gray-300 px-4 py-2 font-bold', product.discount >= 50 ? 'text-red-500' : 'text-green-500']">
            {{ product.discount }}%
          </td>
          <td class="border border-gray-300 px-4 py-2">{{ product.category }}</td>
          <td class="border border-gray-300 px-4 py-2 flex items-center justify-center space-x-2">
            <input
              type="checkbox"
              class="form-checkbox"
              :checked="selectedProducts.includes(product.id)"
              @change="toggleProductSelection(product.id)"
            />
            <i class="pi pi-pen-to-square cursor-pointer hover:text-blue-500" @click="editProduct(product)" title="Edit"></i>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Product Dialog -->
    <AddProductDialog
      :show="showAddProductForm"
      :product="newProduct"
      :editingProductId="editingProductId"
      @save="addProduct"
      @cancel="() => { showAddProductForm = false; resetNewProduct(); }"
    />

    <!-- Delete Confirmation Dialog -->
    <div v-if="showDeleteConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 class="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete the selected products?</p>
        <div class="mt-6 flex justify-end space-x-4">
          <button @click="showDeleteConfirmation = false" class="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">
            Cancel
          </button>
          <button @click="confirmDeletion" class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
