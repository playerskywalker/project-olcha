<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <div @click="scroll" class="scroll-btn"></div>
    <el-row class="demo-autocomplete">
      <el-col :span="20">
        <input type="text"
          v-model="state1"
          class="input-search"
          placeholder="Please Input"
          @input="handleSelect(state1)"
        >
        <div v-if="searchData.length>0" class="result">
        <div @click="goToProduct(res)" v-for="(res,index) in searchData" :key="index" class="card-result">
          <div class="res-title"><p>{{ res.title }}</p></div>
          <img class="res-img" :src="res.images[0]" alt="">
          <div class="res-desc"><p>{{ res.description }}</p></div>
          <div class="res-price"><p>{{ res.price }}$</p></div>
        </div>
        </div>
      </el-col>
    </el-row>
    <el-carousel @click="goToProducts" :interval="5000" arrow="always">
      <el-carousel-item>
        <img
          class="carousel-img"
          src="https://olcha.uz/image/original/sliders/ru/gW9sn2FoUW9lVwGwuNQ9a35sv6oCgQC0QUg5u9Y1joSUYXnWcRjBeP3Rzwq9.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          class="carousel-img"
          src="https://olcha.uz/image/original/sliders/ru/soCLOx1y1agHJO2aK0eeEyXZtkAYBxSGhvcogReZhkZo1BA9F7XDsRXWxBvf.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          class="carousel-img"
          src="https://olcha.uz/image/original/sliders/ru/CxIdl9a7ODmqcXU352k2Nfi0CCuBQ6W0xm6XICkIqrM7ARxVtcrXHBFYHBm1.png"
          alt=""
        />
      </el-carousel-item>
      <el-carousel-item>
        <img
          class="carousel-img"
          src="https://olcha.uz/image/original/sliders/ru/Z9QH0viBAmghcdGPKax3HLKlACye7HPdTt2YzCjLPwLasNw7mHTy1hRgSGLP.png"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
    <Footer></Footer>
  </div>
</template>
<script >
import Navbar from "../components/Header/Navbar.vue";
import Footer from "../components/Footer.vue";
import router from "../router/index";
import { mapGetters, mapActions } from "vuex";
import { ElButton } from "element-plus";
import { ElRow, ElCol, ElCarousel, ElInput } from "element-plus";
export default {
  data() {
    return {
      state1: "",
    };
  },
  components: {
    Navbar,
    Footer,
  },
  methods: {
    ...mapActions(["search"]),
    handleSelect(vak) {
     this.search(vak)
    },
    goToProducts() {
      router.push("/products");
    },
    goToProduct(res){
      this.$router.push("/products/" + res.id);
    },
    scroll() {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    },
  },
  computed: {
    ...mapGetters(["searchData"]),
  },
  mounted() {
  },
};
</script>
<style>
.result{
  width: 800px;
  background: rgb(223, 221, 221);
  position: absolute;
  left:13%;
  z-index: 3;
}
.card-result{
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
}
.card-result:hover .res-desc{
color: #da002b;
}
.card-result:hover .res-title{
color: #da002b;
}
.card-result:hover .res-price{
color: #da002b;
}
.res-title{
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
width: 100px;
transition: 0.5s;
}
.res-img{
width: 20%;
transition: 0.5s;
}
.res-desc{
  padding-left: 10px;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: left;
width: 400px;
transition: 0.5s;
}
.res-price{
width: 160px;
font-size: 28px;
justify-content: center;
  display: flex;
  align-items: center;
  transition: 0.5s;
}
.input-search{
  width: 500px;
  height: 25px;
  display: block;
  margin: auto;
}
.el-carousel__container {
  height: 360px !important;
}
.carousel-img {
  display: block;
  margin: auto;
  cursor: pointer;
}
.el-carousel__item {
  background: transparent;
  width: 80%;
  height: 100%;
}

.home {
  display: flex;
}
.row {
  width: 100%;
}
.el-input__wrapper {
  display: block !important;
  margin-left: 200px;
}
.el-input__inner {
  width: 800px !important;
}
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
.scroll-btn:hover {
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