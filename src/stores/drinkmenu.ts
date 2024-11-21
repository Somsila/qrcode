import { defineStore } from 'pinia';

export const useDrinkMenu = defineStore('drinkmenu', {
  state: () => ({
    products: [
      {
        id: 101,
        image: 'https://www.beanilla.com/wp/wp-content/uploads/2022/06/RefreshingDrinks-1024x683.jpg',
        name: 'Coffee',
        price: 19.99,
        category: 'drink',
      },
      {
        id: 102,
        image: 'https://www.beanilla.com/wp/wp-content/uploads/2022/06/RefreshingDrinks-1024x683.jpg',
        name: 'Product Two',
        price: 29.99,
        category: 'drink',
      },
      {
        id: 103,
        image: 'https://www.beanilla.com/wp/wp-content/uploads/2022/06/RefreshingDrinks-1024x683.jpg',
        name: 'Product Three',
        price: 39.99,
        category: 'drink',

      },
      {
        id: 104,
        image: 'https://www.beanilla.com/wp/wp-content/uploads/2022/06/RefreshingDrinks-1024x683.jpg',
        name: 'Product four',
        price: 39.99,
        category: 'drink',
      },
      {
        id: 105,
        image: 'https://www.beanilla.com/wp/wp-content/uploads/2022/06/RefreshingDrinks-1024x683.jpg',
        name: 'Product five',
        price: 39.99,
        category: 'drink',


      },
      
    ],
  }),
  getters: {
    getProducts: (state) => state.products,
  },
});
