import { createStore } from 'vuex'
import axios from 'axios'
import cart from './modules/cart'
import product from './modules/product'
import navbar from './modules/navbar'
import { ElNotification, ElLoading } from 'element-plus'
const store = createStore({
  modules: {
    cart,
    product,
    navbar,
  },
  state() {
    return {
 
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
 
  },
})

export default store