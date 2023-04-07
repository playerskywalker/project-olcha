<template>
  <div>
    <Navbar></Navbar>
    <div class="home">
      <div @click="scroll" class="scroll-btn"></div>
      <ElRow class="row">
        <ElCol :span="1"> </ElCol>
        <ElCol :span="23">
          <el-row>
            <el-col v-for="(product, index) in products" :key="index" :span="8">
              <ProductCard :product="product"></ProductCard>
            </el-col>
          </el-row>
        </ElCol>
      </ElRow>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { ElButton } from "element-plus";
import { ElRow, ElCol } from "element-plus";
import Navbar from "../components/Header/Navbar.vue";
import Footer from "../components/Footer.vue";
import ProductCard from "../components/Products/ProductCard.vue";

export default {
  data() {
    return {};
  },
  components: {
    Navbar,
    ProductCard,
    Footer,
  },
  methods: {
    ...mapActions(["fetchProducts"]),
    getProducts() {
      this.fetchProducts()
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
    ...mapGetters(["products"]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>
<style>
.scroll-btn {
  position: fixed;
  background: #da002b;
  left: 20px;
  z-index: 5;
  bottom: 10px;
  border-radius: 40px;
  border: 1px solid #da002b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  transition: 0.5s;
}
.scroll-btn:hover{
  background: white;
}
.scroll-btn::before {
  content: "";
  width: 40px;
  height: 40px;
  background: transparent no-repeat center center;
  background-size: 100% 100%;
  background-image: url("https://ikonki.svgpng.ru/wp-content/uploads/2021/08/Vverh.png");
}
</style>