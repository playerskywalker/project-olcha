import { createStore } from 'vuex'
import axios from 'axios'
import { ElNotification, ElLoading } from 'element-plus'
const home = {
    state() {
        return {
            searchData:[],
        }
    },
    mutations: {
        SEARCH(state, payload) {
            state.searchData=payload
            console.log(state.searchData)
          },
    
    },
    actions: {
        async search({commit},payload){
            console.log(payload)
            await axios.get('https://dummyjson.com/products').then((res) => {
       let newArr = res.data.products.filter((ell)=>ell.title[0].toUpperCase()==payload.toUpperCase())
              commit('SEARCH', newArr)
            })
          },
    },
    getters: {
        searchData: (state) => state.searchData,
    }
}
export default home

