import { createStore } from 'vuex'
import axios from 'axios'
import { ElNotification, ElLoading } from 'element-plus'
const navbar = {
    state() {
        return {
            nav_links: [
                {
                    title: 'Home',
                    path: '/'
                },
                {
                    title: 'Products',
                    path: '/products'
                },
                {
                    title: 'Categories',
                    path: '/categories'
                },
            ],

        }
    },
    mutations: {
    },
    actions: {
    },
    getters: {
        nav_links: (state) => state.nav_links,
    }
}
export default navbar