<template>
  <div>
    <el-card class="card">
      <el-button @click="liked(product)" class="button-heart"
        ><img
          class="heart"
          :src="
            product.active
              ? 'https://img1.freepng.ru/20180318/pgq/kisspng-love-heart-love-heart-romance-clip-art-picture-of-red-heart-5aaeb717d57125.4294717615213995758743.jpg'
              : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
          "
          alt=""
      /></el-button>
      <img :src="product.images[0]" class="image" />
      <div>
        <h3 class="product-title">{{ product.title }}</h3>
        <p class="description">{{ product.description }}</p>
        <div class="bottom">
          <h2 class="product-price">{{ product.price }}$</h2>
          <el-button @click="addToCart(product)" class="product-button">
            <img
              style="width: 35px"
              :src="
                product.buy
                  ? 'https://e7.pngegg.com/pngimages/52/913/png-clipart-check-mark-computer-icons-yes-yes-angle-hand.png'
                  : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2%D0%BE%D0%B9_%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B_%28ei%29.svg/1200px-%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2%D0%BE%D0%B9_%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B_%28ei%29.svg.png'
              "
              alt=""
            />
          </el-button>
          <el-button class="product-button-buy" @click="buy(product)"
            >Посмотреть</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: {
    product: {
      type: Object,
    },
  },
  methods: {
    ...mapMutations(["LIKED_PRODUCTS", "ADD_TO_CART"]),
    buy(product) {
      this.$router.push("/products/" + product.id);
    },
    liked(product) {
      if (this.product.active == false) {
        this.product.active = true;
        this.LIKED_PRODUCTS({
          id: product.id,
          active: true,
        });
      } else {
        this.product.active = false;
        this.LIKED_PRODUCTS({
          id: product.id,
          active: false,
        });
      }
    },
    addToCart(product) {
      if (this.product.buy == false) {
        this.product.buy = true;
        this.ADD_TO_CART({
          id: product.id,
          buy: true,
        });
      } else {
        this.product.buy = false;
        this.ADD_TO_CART({
          id: product.id,
          buy: false,
        });
      }
    },
  },
  mounted(){
    
  }
};
</script>
<style>
.home {
  display: flex;
}
.row {
  width: 100%;
}
.el-card {
  margin-top: 10px;
}
.el-card__body {
  width: 300px;
  display: block;
  justify-content: center;
  height: 480px;
  margin: 30px;
}
.card {
  width: 370px;
  display: flex;
  justify-content: center;
  height: 560px;
}
.image {
  height: 200px;
  width: 300px;
  object-fit: contain;
}
.description {
  text-align: center;
  height: 100px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
  margin-top: 20px;
}
.product-title {
  display: block;
  text-align: center;
  height: 30px;
  margin-top: 20px;
}
.product-price {
  text-align: center;
  margin-top: 20px;
}
.product-button {
  width: 40px;
  height: 50px;
  border: 2px solid #111 !important;
  margin-left: 8px;
  margin-top: 20px;
}
.product-button:hover {
  background: rgb(131, 124, 124, 0.2) !important;
}
.button-img {
  width: 30px;
}
.product-button-buy {
  width: 230px;
  border: 2px solid red !important;
  color: red !important;
  margin-top: 20px;
}
.product-button-buy:hover {
  background: rgb(193, 103, 103, 0.1) !important;
}
.heart {
  width: 30px;
  display: block;
}
.button-heart {
  width: 50px;
  height: 50px !important;
  border-radius: 30px !important;
  position: absolute;
  margin-left: 250px;
  margin-top: 10px;
}
.button-like {
  margin-right: 20px;
  height: 70px !important;
  width: 79px;
  border: none !important;
  color: #111 !important;
}
.button-like-img {
  width: 35px;
  display: block;
  margin-left: 15px;
}
.item {
  width: 60px !important;
  margin-right: 60px;
  margin-top: 15px;
}
</style>