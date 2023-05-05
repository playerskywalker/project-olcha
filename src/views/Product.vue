<template>
  <div>
    <Navbar></Navbar>
    <el-row>
      <div v-if="visibleCheckout" class="checkout-modal">
        <h1 class="checkout-modal-text">Ваш заказ успешно оформлен</h1>
        <img
          class="checkout-modal-mark"
          src="https://svgsilh.com/svg/40143-ff5722.svg"
          alt=""
        />
      </div>
      <div v-if="visibleModal" class="modal-buy-now">
        <h2 class="modal-title">Купить в один клик</h2>
        <svg
          @click="closeModal"
          class="cross"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
          />
        </svg>
        <el-row>
          <el-col :span="6">
            <img class="modal-img" :src="currentImageUrl" alt="" />
          </el-col>
          <el-col :span="18">
            <h4 class="modal-text-memory">
              Наименование:
              <span style="color: black">{{ product.title }}</span>
            </h4>
            <h4 class="modal-text-memory">
              Объем встроенной памяти:
              <span style="color: black">{{ currentStorage.value }}</span>
            </h4>
            <h4 class="modal-text-memory">
              Цвет: <span style="color: black"> {{ currentColor.value }}</span>
            </h4>
            <h4 class="modal-text-price">ИТОГО: {{ product.price }} $</h4>
          </el-col>
          <div class="prices-window-line"></div>
        </el-row>
        <span class="modal-text-info">Введите свои данные:</span>
        <input
          v-model="modalName"
          class="modal-input"
          type="text"
          placeholder="Имя и фамилия"
        />
        <div class="modal-phone-container">
          <div class="input_code">+998</div>
          <input
            v-model="modalPhone"
            type="tel"
            class="input_phone"
            placeholder="Контактный номер"
            data-mask="## ### ## ##"
            data-mask-inited="true"
            data-mask-raw-value=""
          />
        </div>
        <p v-if="visibleError" class="errorData">
          Необходимо заполнить все данные
        </p>
        <button @click="checkoutProduct" class="modal-button">Оформить</button>
      </div>
      <el-col :span="2"></el-col>
      <el-col :span="8">
        <h1 class="product_title">{{ product.title }}</h1>
        <div class="img_wrapper">
          <div class="carousel" v-if="currentImageUrl">
            <vue-image-zoomer :regular="currentImageUrl" />
          </div>
          <div>
            <el-row>
              <el-col
                :span="12"
                v-for="(img, index) in product.images"
                :key="index"
              >
                <img
                  class="product_img"
                  @click="setImage(img)"
                  :src="img"
                  alt=""
                />
              </el-col>
            </el-row>
            <img />
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div>
          <h4 class="info-product">
            Объем встроенной памяти:
            <span style="color: black">{{ currentStorage.value }}</span>
          </h4>
          <button
            :class="but.active ? 'info-active' : 'info-product-button'"
            v-for="but in storage"
            :key="but.id"
            @click="chooseStorage(but)"
            class="info-product-button"
          >
            {{ but.value }}
          </button>
        </div>
        <div style="margin-top: 50px">
          <h4 class="info-product-down">
            Цвет: <span style="color: black"> {{ currentColor.value }}</span>
          </h4>
          <button
            :class="col.active ? 'info-active' : 'info-product-button'"
            v-for="col in color"
            :key="col.id"
            @click="chooseColor(col)"
            value="Space"
            class="info-product-button"
          >
            {{ col.value }}
          </button>
        </div>
        <div style="margin-top: 50px">
          <h4 class="info-product-down">
            Описание:
            <span class="info-product-desc">{{ product.description }}</span>
          </h4>
          <h4 class="info-product-down">
            Категория:<span class="info-product-desc">{{
              product.category
            }}</span>
          </h4>
          <h4 class="info-product-down">
            Бренд:<span class="info-product-desc">{{ product.brand }}</span>
          </h4>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="card-credit">
          <h2 class="product-price">{{ product.price }}$</h2>
          <h4 style="display: inline" class="info-product-down">
            Информация о доставке:
          </h4>
          <div
            @mouseover="visibleTooltiptext = true"
            @mouseout="visibleTooltiptext = false"
            class="label"
          >
            i
            <span v-if="visibleTooltiptext" class="tooltiptext"
              >Вы можете настроить время доставки при покупке</span
            >
          </div>
          <div>
            <img
              class="delivery-img"
              src="https://olcha.uz/_nuxt/icon-truck.12926646.svg"
              alt=""
            />
            <h5 class="delivery-title">Стандартная доставка</h5>
            <p class="delivery-desc">
              Доставка от 4 часов до 4 рабочих дней исходя от адреса доставки
            </p>
            <div class="delivery-line"></div>
            <button @click="goToCart" class="delivery-button-add">
              Перейти в корзину
            </button>
            <button @click="buyNow" class="delivery-button-buy">
              Купить в один клик
            </button>
          </div>
        </div>
        <div class="card-payment">
          <h4 class="info-product-down">Рассрочка от:</h4>
          <p class="product-payment-price">{{ product.price }}$ / 12 мес</p>
          <div style="display: flex; justify-content: space-around">
            <div class="product-payment-bank">
              <img
                style="width: 55px"
                src="https://acdn.tinkoff.ru/static/documents/513f36a0-d533-4240-902c-86f082781f41.png"
                alt=""
              />
            </div>
            <div class="product-payment-bank">
              <img
                style="width: 60px"
                src="https://free-png.ru/wp-content/uploads/2020/09/sberbank_3-01.png"
                alt=""
              />
            </div>
            <div class="product-payment-bank">
              <img
                style="width: 60px"
                src="https://upload.wikimedia.org/wikipedia/commons/4/45/%D0%90%D0%BB%D1%8C%D1%84%D0%B0-%D0%B1%D0%B0%D0%BD%D0%BA_%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%B0.png"
                alt=""
              />
            </div>
          </div>
          <div class="delivery-line"></div>
          <button class="payment-button">Купить в рассрочку</button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="15">
        <div class="prices-window">
            <div>
              <h3 class="prices-window-title">Магазины:</h3>
              <h6 class="prices-window-shop">STP-Group</h6>
              <p class="prices-window-address">
                Узбекистан, Ташкент, Шайхантахурский район, Малая кольцевая
                дорога, 57
              </p>
            </div>
            <div class="prices-window-description">
              Доставка от 4 часов до 2 рабочих дней исходя от адреса доставки
            </div>
            <div style="width: 25%">
              <h3 class="prices-window-price">{{ product.price }}$</h3>
              <button
                v-if="addToBasket[0].visibleButton"
                @click="goToCart"
                class="prices-window-button"
              >
                Перейти в корзину
              </button>
            </div>

        </div>
      </el-col>
      <el-col :span="7">
        <div class="card-payment">
          <h2 class="product-price">История цены</h2>
          <h4 class="price-shedule">
            Диапазон цен:
            <span style="color: black">
              {{ product.price }}$ - {{ product.price }}$</span
            >
          </h4>
          <img
            style="width: 300px;margin-top: 30px;display: block;margin: auto;"
            src="https://www.top-rider.ru/image/grafb_1825_9.png"
            alt=""
          />
        </div>
      </el-col>
    </el-row>
    <Footer></Footer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { VueImageZoomer } from "vue-image-zoomer";
import Navbar from "../components/Header/Navbar.vue";
import Footer from "../components/Footer.vue";
import "vue-image-zoomer/dist/style.css";
export default {
  components: {
    VueImageZoomer,Navbar,Footer
  },
  data() {
    return {
      visibleModal: false,
      modalName: "",
      modalPhone: "",
      visibleError: false,
      visibleCheckout:false,
      currentImageUrl: "",
      addToBasket: [
        {
          id: 0,
          visibleButton: true,
          visibleCount: false,
          count: 1,
        },
        {
          id: 1,
          visibleButton: true,
          visibleCount: false,
          count: 1,
        },
      ],
      visibleTooltiptext: false,
      storage: [
        {
          id: 0,
          value: "128 GB",
          active: true,
        },
        {
          id: 1,
          value: "256 GB",
          active: false,
        },
        {
          id: 2,
          value: "512 GB",
          active: false,
        },
        {
          id: 3,
          value: "1TB",
          active: false,
        },
      ],
      color: [
        {
          id: 0,
          value: "SPACE",
          active: true,
        },
        {
          id: 1,
          value: "SILVER",
          active: false,
        },
        {
          id: 2,
          value: "GOLD",
          active: false,
        },
        {
          id: 3,
          value: "PURPLE",
          active: false,
        },
      ],
      currentStorage: { id: 0, value: "128 GB" },
      currentColor: { id: 0, value: "SPACE" },
      newProduct: [],
      loading: true,
      screenLoading: true,
    };
  },
  methods: {
    ...mapActions(["fetchProduct"]),
    chooseStorage(but) {
      this.currentStorage = but;
      this.storage.map((ell) => (ell.active = false));
      but.active = !but.active;
    },
    chooseColor(col) {
      this.currentColor = col;
      this.color.map((ell) => (ell.active = false));
      col.active = !col.active;
    },
    addBasket(index) {
      this.addToBasket[index].visibleButton = false;
      this.addToBasket[index].visibleCount = true;
    },
    goToCart() {
      this.$router.push("/cart");
    },
    setImage(img) {
      this.currentImageUrl = img;
    },
    buyNow() {
      this.visibleModal = true;
    },
    closeModal() {
      this.visibleModal = false;
    },
    checkoutProduct() {
      if (this.modalName && this.modalPhone) {
        this.visibleModal = false;
        this.modalName = "";
        this.modalPhone = "";
        this.visibleError = false;
        this.visibleCheckout=true;
        setTimeout(() => {
          this.visibleCheckout=false;
      }, 2000);
      } else {
        this.visibleError = true;
      }
    },
    async getProduct() {
      await this.fetchProduct(this.$route.params.id);
    },
  },
  computed: {
    ...mapGetters(["product"]),
  },
  async mounted() {
    await this.getProduct();
    this.currentImageUrl = this.product.images[0];
  },
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
.checkout-modal {
  position: absolute;
  display: flex;
  z-index: 3;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  justify-content: center;
  align-items: center;
}
.checkout-modal-mark {
  width: 50px;
  height: 50px;
  display: block;
}
.checkout-modal-text {
  color: #da002b;
}
.modal-buy-now {
  width: 600px;
  height: 510px;
  background: white;
  border-radius: 10px;
  border: 5px solid #da002b;
  position: fixed;
  z-index: 3;
  left: 25%;
  top: 70px;
}
.modal-title {
  font-size: 30px;
 text-align: center;
 margin-top: 20px;
}
.modal-img {
  width: 150px;
  margin-top: 10px;
}
.modal-text-memory {
  color: #818181;
  font-size: 18px;
  font-weight: 500;
  line-height: 19px;
  margin-top: 10px;
}
.modal-text-price {
  font-size: 20px;
  color: #111;
  font-weight: 600;
  text-align: right;
  margin-right: 30px;
}
.modal-input {
  width: 80%;
  display: block;
  margin: auto;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
  border: 2px solid #111;
  border-radius: 8px;
}
.modal-text-info {
  display: block;
  color: #818181;
  font-size: 18px;
  font-weight: 500;
  line-height: 19px;
  margin-left: 9%;
  margin-top: 10px;
}
.modal-phone-container {
  display: flex;
  width: 80%;
  margin: auto;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
  border: 2px solid #111;
  border-radius: 8px;
  align-items: center;
}
.product-price{
  margin-top:10px
}
.input_code {
  width: 10%;
  height: 20px;
  border-right: 1px solid #818181;
}
.input_phone {
  padding-left: 10px;
  width: 86%;
  height: 36px;
  border: none;
}
.modal-button {
  display: block;
  width: 130px;
  height: 40px;
  background: #da002b;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #da002b;
  cursor: pointer;
  transition: 0.5s;
  margin-left: 70%;
  margin-top: 20px;
}
.modal-button:hover {
  background: white;
  color: #da002b;
}
.errorData {
  margin: 0px;
  color: #da002b;
  margin-left: 50%;
  margin-top: 10px;
}
.cross {
  width: 20px;
  position: absolute;
  cursor: pointer;
  right: 10px;
  top: 10px;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
.product_title {
  display: block;
  text-align: center;
  height: 30px;
  margin-top: 60px;
  margin-bottom: 40px;
}
.product_img {
  height: 100px;
  margin-left: 20px;
  margin-right: 20px;
  cursor: pointer;
  border-radius: 10px;
}
.img_wrapper {
  width: 400px;
  overflow: hidden;
}
.carousel {
  width: 350px;
  display: flex;
  transition: all ease 0.5s;
}
.buttonCarousel {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  background: #f0efef;
  border: none;
  cursor: pointer;
  margin-left: 100px;
}
.info-product {
  color: #818181;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  margin-top: 130px;
  margin-left: 10px;
}
.info-product-down {
  color: #818181;
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  margin-left: 10px;
  margin-top: 10px;
}
.info-product-desc {
  color: black;
  margin-left: 10px;
}
.info-product-button {
  align-items: center;
  border: 2px solid #111;
  border-radius: 8px;
  color: #111;
  display: inline-flex;
  font-size: 13px;
  font-weight: 400;
  height: 35px;
  justify-content: center;
  line-height: 24px;
  width: 80px;
  padding: 6px 15px;
  margin-left: 10px;
  background: transparent;
  cursor: pointer;
}
.info-active {
  border: 2px solid #da002b;
}
.card-credit {
  margin-top: 140px;
  margin-left: 20px;
  width: 88%;
  height: 400px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  position: relative;
}
.label {
  border: 1px solid #818181;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  color: #818181;
  text-align: center;
  margin-left: 35%;
  cursor: pointer;
}

.tooltiptext {
  position: absolute;
  display: block;
  right: 50px;
  top: 100px;
  width: 300px;
  height: 40px;
  background: white;
  border-radius: 8px;
  box-shadow: -1px 9px 16px 13px rgba(85, 91, 96, 0.2);
}
.delivery-img {
  margin-top: 20px;
  margin-left: 10px;
  width: 30px;
}
.delivery-title {
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  display: inline-block;
  padding-left: 10px;
  margin-bottom: 10px;
}
.delivery-desc {
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  width: 250px;
  margin-left: 50px;
  margin-top: 0px;
}
.delivery-line {
  height: 1px;
  width: 86%;
  margin-left: 6%;
  margin-top: 30px;
  background: #e8e8e8;
}
.delivery-button-add {
  display: block;
  width: 300px;
  height: 40px;
  background: #12bf6c;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #12bf6c;
  margin-top: 30px;
  margin-left: 6%;
  cursor: pointer;
  transition: 0.5s;
}
.delivery-button-add:hover {
  background: white;
  color: #12bf6c;
}
.delivery-button-buy {
  display: block;
  width: 300px;
  height: 40px;
  background: white;
  color: black;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid black;
  margin-top: 20px;
  margin-left: 6%;
  cursor: pointer;
  transition: 0.5s;
}
.delivery-button-buy:hover {
  background: rgb(131, 124, 124, 0.3);
}
.card-payment {
  margin-top: 20px;
  margin-left: 20px;
  width: 88%;
  height: 250px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
}
.product-payment-price {
  font-size: 26px;
  font-weight: 800;
  line-height: 36px;
  color: #da002b;
  margin-left: 20px;
}
.payment-button {
  display: block;
  width: 300px;
  height: 40px;
  background: #da002b;
  color: white;
  font-size: 16px;
  border-radius: 10px;
  border: 2px solid #da002b;
  margin-top: 20px;
  margin-left: 6%;
  cursor: pointer;
  transition: 0.5s;
}
.payment-button:hover {
  background: white;
  color: #da002b;
}
.product-payment-bank {
  width: 90px;
  height: 50px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.prices-window {
  margin-top: 20px;
  width: 100%;
  height: 250px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
}
.prices-window-title {
  margin-left: 40px;
  font-weight: 300;
  font-size: 32px;
  line-height: 40px;
  margin-top: -60px;
}
.prices-window-shop {
  color: black;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  margin: 0px;
  margin-left: 40px;
}
.prices-window-shop-down {
  color: black;
  display: inline-block;
  font-size: 20px;
  font-weight: 800;
  line-height: 24px;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 40px;
}
.prices-window-address {
  color: #999;
  width: 250px;
  margin-left: 40px;
  margin-top: 5px;
}
.prices-window-description {
  color: #999;
  width: 250px;
}
.prices-window-description-down {
  color: #999;
  width: 250px;
  margin-top: 50px;
}
.prices-window-price {
  font-size: 26px;
  font-weight: 800;
  line-height: 24px;
  text-align: center;
  margin-top: 60px;
}
.count {
  border: 2px solid #111;
  border-radius: 8px;
  color: #111;
  font-size: 16px;
  font-weight: 500;
  width: 120px;
  height: 35px;
  line-height: 24px;
  text-align: center;
  background-color: transparent;
  display: flex;
  margin-left: 40px;
}
.count_minus {
  background: transparent;
  color: #999;
  border: none;
  cursor: pointer;
  width: 40%;
}
.count_plus {
  background: transparent;
  color: #999;
  border: none;
  cursor: pointer;
  width: 40%;
  color: #da002b;
}
.count_input {
  background: transparent;
  border: none;
  width: 20%;
  text-align: center;
}
.prices-window-button {
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  height: 36px;
  width: 180px;
  background: #12bf6c;
  color: white;
  border: 1px solid #12bf6c;
  cursor: pointer;
  transition: 0.5s;
  margin-top: 40px;
}
.prices-window-button:hover {
  background: white;
  color: #12bf6c;
}
.prices-window-price-down {
  font-size: 26px;
  font-weight: 800;
  line-height: 24px;
  margin-top: 50px;
  text-align: center;
}
.prices-window-line {
  height: 1px;
  width: 86%;
  margin-left: 6%;
  margin-top: 20px;
  background: #e8e8e8;
}
.price-shedule {
  color: #999;
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  margin-left: 20px;
}
</style>