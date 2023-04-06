<template>
  <div>
    <Navbar></Navbar>
          <router-view></router-view>
    <div class="home">
      <div @click="scroll" class="scroll-btn"></div>
      <ElRow class="row">
        <ElCol :span="1">  </ElCol>
        <ElCol :span="23">
          <div><h1>Избранные товары</h1></div>
          <el-row>
            <el-col
              v-for="(product, index) in favouriteProducts"
              :key="index"
              :span="8"
            >
              <el-card class="card">
                <img :src="product.images[0]" class="image" />
                <div>
                  <h3 class="product-title">{{ product.title }}</h3>
                  <p class="description">{{ product.description }}</p>
                  <div class="bottom">
                    <h2 class="product-price">{{ product.price }}$</h2>
                    <div class="card-bottom-fav">
                      <el-button class="product-button-buy" @click="buy(product)"
                      >Посмотреть</el-button>
                      <img @click="deleteFav(product)" class="deleteFav" src="https://cdn-icons-png.flaticon.com/512/1483/1483063.png" alt="">
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </ElCol>
      </ElRow>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Navbar from "../components/Header/Navbar.vue";
import Footer from "../components/Footer.vue";
import { ElButton } from "element-plus";
import { ElRow, ElCol } from "element-plus";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  components: {
    Navbar,Footer
  },
  methods: {
    ...mapActions(["fetchProductsByFavourite"]),
    ...mapMutations(["DELETE_PRODUCT_FAV", "SEARCH"]),
    getProductsByFavourite() {
      this.fetchProductsByFavourite();
    },
    buy(product) {
      this.$router.push("/products/" + product.id);
    },
    deleteFav(product){
      console.log(product)
      this.DELETE_PRODUCT_FAV({
          id: product.id
        });
        this.getProductsByFavourite()
    },
    scroll(){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  },
  computed: {
    ...mapGetters(["favouriteProducts"]),
  },
  mounted() {
    this.getProductsByFavourite();
  },
};
</script>
<style>
.card-bottom-fav{
  display: flex;
  align-items: center;
}
.deleteFav{
  display:block;
  width: 30px;
  height: 100%;
  cursor: pointer;
  margin-top: 15px;
  margin-left: 10px;
}
</style>