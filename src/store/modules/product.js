import { createStore } from 'vuex'
import axios from 'axios'
import { ElNotification, ElLoading } from 'element-plus'
const product = {
    state() {
        return {
            product: [],
        }
    },
    mutations: {
        SET_PRODUCT(state, payload) {
            state.product = payload
          },
    
    },
    actions: {
        async fetchProduct({ commit }, payload) {
            commit('setLoader')
              await axios.get('https://dummyjson.com/products/' + payload).then((res) =>
                commit('SET_PRODUCT', res.data)
              )
          },
    },
    getters: {
        product: (state) => state.product,
    }
}
export default product