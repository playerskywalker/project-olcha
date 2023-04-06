 <template>
  <div>
    <nav class="navbar">
      <div style="display: flex;">
        <h3 @click="goHome" class="nav-logo">OLCHA</h3>
        <div class="nav-but">0% Рассрочка</div>
        <div class="nav-but-two">Скидки</div>
        <div class="nav-but">Розыгрыши</div>
      </div>
     <button @click="goToProducts" class="nav-button">
      <div>
        <span class="ham"></span>
        <span class="ham"></span>
        <span class="ham"></span>
      </div>
      Каталог</button>
    </nav>
    <div style="display: flex; justify-content: flex-end">
      <el-badge :value="liked_products?.length" class="item">
        <el-button class="button-like" @click="goToFavourites">
          <div>
            <img
              class="button-like-img"
              src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
              alt=""
            />
            Избранное
          </div>
        </el-button>
      </el-badge>
      <el-badge :value="products_in_cart?.length" class="item">
        <el-button @click="goToCart" class="button-like">
          <div>
            <img
              class="button-like-img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2%D0%BE%D0%B9_%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B_%28ei%29.svg/1200px-%D0%98%D0%BA%D0%BE%D0%BD%D0%BA%D0%B0_%D0%BF%D1%80%D0%BE%D0%B4%D1%83%D0%BA%D1%82%D0%BE%D0%B2%D0%BE%D0%B9_%D0%BA%D0%BE%D1%80%D0%B7%D0%B8%D0%BD%D1%8B_%28ei%29.svg.png"
              alt=""
            />
            Корзина
          </div>
        </el-button>
      </el-badge>
    </div>
  </div>
</template>
  
<script>
import { ElPageHeader, ElButton } from "element-plus";
import { mapGetters } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      cartLength: 0,
    };
  },
  methods: {
    goToPage(link) {
      this.$router.push(link.path);
    },
    goToProducts(){
      this.$router.push("/products");
    },
    goToFavourites() {
      this.$router.push("/favourites");
    },
    goHome(){
      this.$router.push("/");
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
  computed: {
    ...mapGetters(["nav_links", "liked_products", "products_in_cart"]),
  },
  mounted() {},
};
</script>
<style>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  border: 0;
}
.navbar {
  display: flex;
  background-repeat: no-repeat;
  align-items: center;
  width: 100%;
  background: #da002b;
  height: 70px;
  justify-content: space-between;
}
.el-page-header__back {
  display: none !important;
}
.el-page-header__header .el-divider {
  display: none !important;
}
.nav-logo {
  font-size: 30px;
  color: white;
  margin-left: 20px;
  cursor: pointer;
  transition: 0.5s;
}
.nav-logo:hover{
color: black;
}
.nav-but {
  color: #da002b;
  background: white;
  font-size: 18px;
  font-weight: 700;
  padding: 10px;
  border-radius: 8px;
  margin-left: 15px;
}
.nav-but-two {
  color: white;
  background: #da002b;
  font-size: 18px;
  font-weight: 700;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid white;
  margin-left: 15px;
}
.nav-button{
  padding: 8px;
  font-size: 18px;
  font-weight: 700;
  border-radius: 8px;
  border: 2px solid white;
  background: transparent;
  color: white;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  margin-right: 50px;
}
.nav-button:hover{
  border: 2px solid black;
  color: black;
}
.nav-button:hover .ham{
  background: black;
}
.ham{
  display: block;
    width: 20px;
    height: 2px;
    background: white;
    margin-bottom: 3px;
    margin-right: 8px;
    transition: 0.5s;
}
</style>
