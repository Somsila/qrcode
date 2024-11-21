<script setup lang="ts">
import { ref, watch } from 'vue';

interface Product {
  id: number;
  name: string;
  price: number;
  discount: number;
  category: string;  // Category will be passed in (food or drink)
  image: string | null; // Image can be either a URL string or a file object
}

// Props from parent component (either FoodProduct or DrinkProduct)
const props = defineProps({
  show: Boolean,
  product: Object as () => Product,
  editingProductId: Number,
});

// Emit events to parent
const emit = defineEmits(['save', 'cancel']);

// Local state for the product form
const localProduct = ref<Product>({
  id: 0,
  name: '',
  price: 0,
  discount: 0,
  category: props.product?.category || 'food',
  image: props.product?.image || null,
});

// Preview for the image file
const imagePreview = ref<string | null>(localProduct.value.image);

// Watch for changes in the `product` prop to reset the form when editing
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    localProduct.value = { ...newProduct };
    imagePreview.value = newProduct.image;
  }
});

// Handle image file selection
function handleImageChange(event: Event) {
  const fileInput = event.target as HTMLInputElement;
  if (fileInput?.files?.[0]) {
    const file = fileInput.files[0];
    imagePreview.value = URL.createObjectURL(file);  // Update image preview
    if (file) {
      convertToBase64(file);
    }
  }
}

// Function to convert the image file to a base64 string
const convertToBase64 = (file: File) => {
  const reader = new FileReader();

  reader.onloadend = () => {
    if (reader.result) {
      localProduct.value.image = reader.result as string;
    }
  };

  reader.onerror = () => {
    console.error('Error converting file to base64');
  };

  reader.readAsDataURL(file); // Read the file as a data URL (base64)
};
// const addproduct = async () => {




// Save the product (emit to parent)
function saveProduct() {
  emit('save', localProduct.value); // Send the product back to the parent
}

//fetched product
const fetchedProduct = ref<Product | null>(null);
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    fetchedProduct.value = newProduct;
  }
});

// Close the dialog without saving (emit to parent)
function cancel() {
  emit('cancel');
}
</script>

<template>
  <div v-if="props.show" class="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-xl font-semibold mb-4">{{ props.editingProductId ? 'Edit Product' : 'Add Product' }}</h2>
      <form @submit.prevent="saveProduct">
        <div class="mb-4">
          <label for="name" class="block text-sm font-semibold">Product Name</label>
          <input v-model="localProduct.name" id="name" type="text" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div class="mb-4">
          <label for="price" class="block text-sm font-semibold">Price</label>
          <input v-model="localProduct.price" id="price" type="number" min="0" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <div class="mb-4">
          <label for="discount" class="block text-sm font-semibold">Discount</label>
          <input v-model="localProduct.discount" id="discount" type="number" min="0" max="100" required
            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <!-- Image File Input -->
        <div class="mb-4">
          <label for="image" class="block text-sm font-semibold">Image</label>
          <input @change="handleImageChange" id="image" type="file" accept="image/*"
            class="w-full px-3 py-2 border border-gray-300 rounded-md" />
          <!-- Preview of the selected image -->
          <div v-if="imagePreview" class="mt-4">
            <img :src="imagePreview" alt="Image preview" class="w-32 h-32 object-cover rounded-md" />
          </div>
        </div>

        <!-- <div class="mb-4">
          <label for="category" class="block text-sm font-semibold">Category</label>
          <select v-model="localProduct.category" id="category"
            class="w-full px-3 py-2 border border-gray-300 rounded-md">
            <option value="food">Food</option>
            <option value="drink">Drink</option>
          </select>
        </div> -->

        <div class="flex justify-end space-x-2">
          <button type="button" @click="cancel" class="px-4 py-2 bg-gray-300 rounded-md text-sm">Cancel</button>
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md text-sm">{{ props.editingProductId ?
            'Save Changes' : 'Add Product' }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add any specific styles for your dialog here */
</style>
