import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menu', {
  state: () => ({
    products: [
      {
        id: 1,
        image: 'https://static.vecteezy.com/system/resources/previews/036/498/554/non_2x/ai-generated-paneer-tikka-on-a-white-plate-on-transparent-background-png.png',
        name: 'Product One',
        price: 19.99,
        category: 'food',

      },
      {
        id: 2,
        image: 'https://static.vecteezy.com/system/resources/previews/036/498/554/non_2x/ai-generated-paneer-tikka-on-a-white-plate-on-transparent-background-png.png',
        name: 'Product Two',
        price: 29.99,
        category: 'food',

      },
      {
        id: 3,
        image: 'https://static.vecteezy.com/system/resources/previews/036/498/554/non_2x/ai-generated-paneer-tikka-on-a-white-plate-on-transparent-background-png.png',
        name: 'Product Three',
        price: 39.99,
        category: 'food',

      },
      {
        id: 4,
        image: 'https://static.vecteezy.com/system/resources/previews/036/498/554/non_2x/ai-generated-paneer-tikka-on-a-white-plate-on-transparent-background-png.png',
        name: 'Product Three',
        price: 39.99,
        category: 'food',

      },
      {
        id: 5,
        image: 'https://static.vecteezy.com/system/resources/previews/036/498/554/non_2x/ai-generated-paneer-tikka-on-a-white-plate-on-transparent-background-png.png',
        name: 'Product Three',
        price: 39.99,
        category: 'food',

      },
    ],
  }),
  getters: {
    getProducts: (state) => state.products,
  },
});
