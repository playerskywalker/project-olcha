import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'
import Favourites from '../views/Favourites.vue'
import Cart from '../views/Cart.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {

    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/favourites',
    name: 'favourites',
    component: Favourites
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },

]
const router = createRouter({
  history: createWebHistory(''),
  routes
})
export default router