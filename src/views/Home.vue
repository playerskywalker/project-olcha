<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <div @click="scroll" class="scroll-btn"></div>
    <el-row class="demo-autocomplete">
    <el-col :span="20">
      <div class="sub-title my-2 text-m text-gray-600">
      </div>
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
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
import { mapMutations,mapActions } from "vuex";
import { ElButton } from "element-plus";
import { ElRow, ElCol, ElCarousel,ElInput} from "element-plus";
export default {
  data() {
    return {
      search:'',
      state1:'',
      restaurants:[],

    };
  },
  components: {
    Navbar,Footer
  },
  methods: {
    ...mapActions(['search']),
    goToProducts() {
    router.push("/products");
},
querySearch(queryString, cb){
  const results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value
  // call callback function to return suggestions
  cb(results)
},
createFilter(queryString){
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    )
  }
},
fetchInput(){
        fetch("https://dummyjson.com/products", {
          method: "GET",
        }).then((res) => {
         console.log(res)
        });
      },
  scroll(){
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    },


  },
  computed: {
   
  },
  mounted() {
    this.fetchInput()
}
}
</script>
<style>
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
.el-input__wrapper{
display: block!important;
margin-left: 200px;
}
.el-input__inner{
    width: 800px!important;
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