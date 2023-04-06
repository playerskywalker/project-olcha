import { createStore } from 'vuex'
import axios from 'axios'
import { ElNotification, ElLoading } from 'element-plus'
const cart = {
    state() {
        return {
          favouriteProducts: [],
          products: [],
          buyProducts: [],
          products_in_cart: JSON.parse(localStorage.getItem('cart')),
          liked_products: JSON.parse(localStorage.getItem('favourite')),
          promo: '',
          searchData:'',
          search:'',
        }
      },
      mutations: {
        SEARCH(state, payload) {
          console.log(payload.products)
          payload.products.map((ell)=>ell.value=ell.title)
      
          console.log(payload.products)
        },
        GET_FAVOURITE(state, payload) {
          state.favouriteProducts = payload
        },
        DELETE_PRODUCT_FAV(state, payload) {
          state.liked_products = JSON.parse(localStorage.getItem('favourite'))
          let prod = state.liked_products.findIndex((ell) => ell.id == payload.id)
          state.liked_products.splice(prod, 1)
          localStorage.setItem('favourite', JSON.stringify(state.liked_products))
         
        },
        SET_PRODUCTS(state, payload) {
          payload.products.map((ell) => ell.active = false)
          payload.products.map((ell) => ell.buy = false)
          let data = payload.products
          for (let i = 0; i < data.length; i++) {
            if (state.liked_products) {
              for (let k = 0; k < state.liked_products.length; k++) {
                if (data[i].id == state.liked_products[k].id) {
                  data[i].active = true
                }
              }
            }
            if (state.products_in_cart) {
              for (let j = 0; j < state.products_in_cart.length; j++) {
                if (data[i].id == state.products_in_cart[j].id) {
                  data[i].buy = true
                }
              }
            }
          }
          state.products = data
        },
        setLoader() {
          const svg = `<svg style="color: red" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>`
          this.isLoading = ElLoading.service({
            background: "rgb(245, 245, 245)",
            svg: svg,
          });
          setTimeout(() => {
            this.isLoading.close();
          }, 1000);
        },
        GET_CART(state, payload) {
          payload.map((ell) => ell.value = 1)
          state.buyProducts = payload
        },
        DELETE_PRODUCT_CART(state, payload) {
          state.products_in_cart = JSON.parse(localStorage.getItem('cart'))
          let prod = state.products_in_cart.findIndex((ell) => ell.id == payload.id)
          state.products_in_cart.splice(prod, 1)
          localStorage.setItem('cart', JSON.stringify(state.products_in_cart))
        },
        SET_SUM_WITH_PROMO(state, payload) {
          state.promo = payload
        },
        SET_NOTIFICATION(state, payload) {
          ElNotification({
            title: payload?.title || 'sucess',
            message: payload?.message || 'Успешно',
            type: payload?.type || 'success',
          })
        },
        LIKED_PRODUCTS(state, payload) {
          let favourite = localStorage.getItem('favourite')
          if (payload.active == true) {
            if (favourite) {
              state.liked_products = JSON.parse(localStorage.getItem('favourite'))
              state.liked_products.push(payload)
              localStorage.setItem('favourite', JSON.stringify(state.liked_products))
            } else {
              localStorage.setItem('favourite', JSON.stringify([payload]))
            }
            this.commit('SET_NOTIFICATION', { title: 'Успешно!', message: 'Товар добавлен в избранное', type: 'success' })
          } else {
            state.liked_products = JSON.parse(localStorage.getItem('favourite'))
            let prod = state.liked_products.findIndex((ell) => ell.id == payload.id)
            state.liked_products.splice(prod, 1)
            localStorage.setItem('favourite', JSON.stringify(state.liked_products))
            this.commit('SET_NOTIFICATION', { title: 'Успешно!', message: 'Товар удален из избранного', type: 'success' })
          }
        },
        ADD_TO_CART(state, payload) {
          let cart = localStorage.getItem('cart')
          if (payload.buy == true) {
            if (cart) {
              state.products_in_cart = JSON.parse(localStorage.getItem('cart'))
              state.products_in_cart.push(payload)
              localStorage.setItem('cart', JSON.stringify(state.products_in_cart))
            } else {
              localStorage.setItem('cart', JSON.stringify([payload]))
            }
            this.commit('SET_NOTIFICATION', { title: 'Успешно!', message: 'Товар добавлен в корзину', type: 'success' })
          } else {
            state.products_in_cart = JSON.parse(localStorage.getItem('cart'))
            let prod = state.products_in_cart.findIndex((ell) => ell.id == payload.id)
            state.products_in_cart.splice(prod, 1)
            localStorage.setItem('cart', JSON.stringify(state.products_in_cart))
            this.commit('SET_NOTIFICATION', { title: 'Успешно!', message: 'Товар удален из корзины', type: 'success' })
          }
          console.log(cart)
        },
      },
      actions: {
        async fetchProductsByFavourite({ commit, state }) {
          commit('setLoader')
          await axios.get('https://dummyjson.com/products').then((res) => {
            let newArr = []
            for (let i = 0; i < res.data.products.length; i++) {
              for (let y = 0; y < state.liked_products?.length; y++) {
                if (res.data.products[i].id == state.liked_products[y].id) {
                  newArr.push(res.data.products[i])
                }
              }
            } commit('GET_FAVOURITE', newArr)
          }
          )
        },
        async fetchProducts({ commit }) {
          commit('setLoader')
          await axios.get('https://dummyjson.com/products').then((res) => {
            commit('SET_PRODUCTS', res.data)
          })
        },
        async search({commit}){
          await axios.get('https://dummyjson.com/products').then((res) => {
            commit('SEARCH', res.data)
          })
        },
        async fetchProductsByCart({ commit, state }) {
          commit('setLoader')
          await axios.get('https://dummyjson.com/products').then((res) => {
            let newArr = []
            for (let i = 0; i < res.data.products.length; i++) {
              for (let y = 0; y < state.products_in_cart?.length; y++) {
                if (res.data.products[i].id == state.products_in_cart[y].id) {
                  newArr.push(res.data.products[i])
                }
              }
            } commit('GET_CART', newArr)
          }
          )
        },
      },
      getters: {
        products_in_cart: (state) => state.products_in_cart,
        liked_products: (state) => state.liked_products,
        buyProducts: (state) => state.buyProducts,
        allProductSum(state) {
          if (state.promo > 0) {
            let result = state.buyProducts.reduce(function (acc, obj) {
              return acc + obj?.price * obj?.value;
            }, 0);
            return result - (result / 100 * state.promo)
          } else {
            let result = state.buyProducts.reduce(function (acc, obj) {
              return acc + obj?.price * obj?.value;
            }, 0);
            return result - result * state.promo / 100
          }
        },
        grandTotal(state) {
          let result = state.buyProducts.reduce(function (acc, obj) {
            return acc + obj?.price * obj?.value;
          }, 0);
          return result
        },
        products: (state) => state.products,
        favouriteProducts: (state) => state.favouriteProducts,
      },
}
export default cart