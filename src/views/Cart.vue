<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <div class="home">
      <div @click="scroll" class="scroll-btn"></div>
      <ElRow class="row">
        <ElCol :span="1"> </ElCol>
        <ElCol :span="23">
          <el-row>
            <el-col :span="16">
              <div v-if="modalBuyNow" class="checkout-modal-order">
                <h1 class="checkout-modal-text">Ваш заказ успешно оформлен</h1>
                <img
                  class="checkout-modal-mark"
                  src="https://svgsilh.com/svg/40143-ff5722.svg"
                  alt=""
                />
              </div>
              <div v-if="PaymentByCard" class="modal-payByCard">
                <svg
                  @click="closePayment"
                  class="cross"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 320 512"
                >
                  <path
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                  />
                </svg>
             <CreditCard></CreditCard>
             <button @click="addOrder2" class="card-form__button">
          Оплатить
        </button>
              </div>
              <div v-if="visibleModalReg" class="modal-registration">
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
                <h3 class="modal-registration-title">Введите свои данные:</h3>
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
                    v-mask="'####-##'"
                  />
                </div>
                <p v-if="visibleError" class="errorData">
                  Необходимо заполнить все данные
                </p>
                <button @click="checkoutProduct" class="modal-button">
                  Сохранить
                </button>
              </div>
              <div v-if="addressVis" class="addAddress">
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
                <div class="adress-container">
                  <div>
                    <h4 class="titleAddress">Регион доставки:</h4>
                    <select v-model="region" class="modal-input-adr">
                      <option value="" selected disabled>
                        Регион доставки
                      </option>
                      <option value="Ташкент">Ташкент</option>
                      <option value="Ташкентская область">
                        Ташкентская область
                      </option>
                      <option value="Андижанская область">
                        Андижанская область
                      </option>
                      <option value="Бухарская область">
                        Бухарская область
                      </option>
                      <option value="Навоийская область">
                        Навоийская область
                      </option>
                      <option value="Самаркандская область">
                        Самаркандская область
                      </option>
                      <option value="Ферганская область">
                        Ферганская область
                      </option>
                    </select>
                  </div>
                  <div>
                    <h4 class="titleAddress">Улица:</h4>
                    <input
                      v-model="street"
                      class="modal-input-adr"
                      type="text"
                    />
                  </div>
                </div>
                <div class="adress-container">
                  <div>
                    <h4 class="titleAddress">Номер дома:</h4>
                    <input
                      v-model="house"
                      class="modal-input-adr"
                      type="text"
                    />
                  </div>
                  <div>
                    <h4 class="titleAddress">Квартира:</h4>
                    <input v-model="room" class="modal-input-adr" type="text" />
                  </div>
                </div>
                <div class="adress-container">
                  <div>
                    <h4 class="titleAddress">Подъезд:</h4>
                    <input
                      v-model="porch"
                      class="modal-input-adr"
                      type="text"
                    />
                  </div>
                  <div>
                    <h4 class="titleAddress">Этаж:</h4>
                    <input
                      v-model="floor"
                      class="modal-input-adr"
                      type="text"
                    />
                  </div>
                </div>
                <p v-if="visibleError" class="errorData">
                  Необходимо заполнить все данные
                </p>
                <button @click="saveAddress" class="modal-button">
                  Сохранить
                </button>
              </div>
              <div class="cart-window">
                <h3 class="prices-window-title-new">В корзине</h3>
                <el-row>
                  <el-col
                    v-for="(product, index) in buyProducts"
                    :key="index"
                    :span="24"
                  >
                    <div class="prices-window-line"></div>
                    <div class="card-in-cart">
                      <img
                        class="image-in-cart"
                        :src="product.images[0]"
                        alt=""
                      />
                      <div>
                        <img
                          @click="deleteCart(product)"
                          class="delete"
                          src="https://cdn-icons-png.flaticon.com/512/1483/1483063.png"
                          alt=""
                        />
                        <span class="delete-text">удалить</span>
                      </div>
                      <div class="text-in-cart">
                        <h3 class="product-title-in-cart">
                          {{ product.title }}
                        </h3>
                        <p>{{ product.brand }}</p>
                      </div>
                      <div class="count-in-cart">
                        <button @click="minus(product)" class="count_minus">
                          -
                        </button>
                        <input
                          class="count_input"
                          type="text"
                          :value="product.value"
                        />
                        <button @click="plus(product)" class="count_plus">
                          +
                        </button>
                      </div>
                      <div class="price-in-cart">{{ product.price }}$</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div v-if="dataTable" class="cart-window">
                <div class="your-data-container">
                  <h3 class="prices-window-title-new">Ваши данные:</h3>
                  <button @click="openModal" class="your-data-button">
                    Изменить
                  </button>
                </div>
                <div class="your-data-container">
                  <h4 class="your-data-text">
                    Имя и фамилия: <br /><br />
                    {{ modalNameOk }}
                  </h4>
                  <h4 class="your-data-text">
                    Номер телефона: <br /><br />
                    {{ modalPhoneOk }}
                  </h4>
                </div>
              </div>
              <div v-if="dataTable" class="cart-window">
                <h3 class="prices-window-title-new">Способ доставки</h3>
                <button class="delivery-button">Доставка курьером</button>
                <button
                  v-if="buttonAddress"
                  @click="showAddress"
                  class="addAdress-button"
                >
                  + Добавить новый адрес
                </button>
                <div v-if="yourAddress" class="show-address">
                  <div class="your-data-container">
                    <h3 class="address-title">Ваш адрес:</h3>
                    <button @click="showAddress" class="your-data-button">
                      Изменить
                    </button>
                  </div>
                  <p class="your-address">
                    Регион:{{ region }},улица:{{ street }}, дом: {{ house }},
                    квартира:{{ room }}, подъезд: {{ porch }}, этаж: {{ floor }}
                  </p>
                </div>
              </div>
              <div v-if="dataTable" class="cart-window">
                <h3 class="prices-window-title-new">Способ оплаты:</h3>
                <form>
                  <div>
                    <label @click="changePaid('Наличный расчет')">
                      <div class="radio-button">
                        <input
                          checked
                          type="radio"
                          id="contactChoice1"
                          name="contact"
                          value="email"
                        />Наличный расчет
                      </div>
                    </label>
                    <label @click="changePaid('Оплата по терминалу')">
                      <div class="radio-button">
                        <input
                          type="radio"
                          id="contactChoice2"
                          name="contact"
                          value="phone"
                        />Оплата по терминалу
                      </div>
                    </label>
                    <div class="radio-container">
                      <label @click="changePaid('Click')">
                        <div class="radio-button-mini">
                          <input
                            type="radio"
                            id="contactChoice2"
                            name="contact"
                            value="phone"
                          />
                          <img
                            class="radio-img"
                            src="https://olcha.uz/uploads/images/payments/8MgaV0UlK0rLi2sf3R1vtuhys1BKTEkE5VgM50Sk.jpeg"
                            alt=""
                          />
                        </div>
                      </label>
                      <label @click="changePaid('Paycom')">
                        <div class="radio-button-mini">
                          <input
                            type="radio"
                            id="contactChoice2"
                            name="contact"
                            value="phone"
                          />
                          <img
                            class="radio-img"
                            src="https://olcha.uz/uploads/images/payments/5kfI4Rwv7ZIkgJxLzMBAJGilcC5jO38Y5KCBVnY9.svg"
                            alt=""
                          />
                        </div>
                      </label>
                      <label @click="changePaid('Apelsin')">
                        <div class="radio-button-mini">
                          <input
                            type="radio"
                            id="contactChoice2"
                            name="contact"
                            value="phone"
                          />
                          <img
                            class="radio-img"
                            src="https://olcha.uz/uploads/images/payments/XL1QnsDYQOvWxdLGi9ZU6Y8okxOppJOt9nofO6D0.png"
                            alt=""
                          />
                        </div>
                      </label>
                    </div>
                  </div>
                </form>
              </div>
              <button @click="addOrder" v-if="buyNow" class="buy-now">
                Оформить заказ
              </button>
            </el-col>
            <el-col :span="8">
              <div class="sum-in-cart">
                <h3 v-if="allProductSum" class="sum-in-cart-title">
                  Итого:{{ allProductSum }} $
                </h3>
                <div class="prices-window-line"></div>
                <div class="promo">
                  <input
                    v-model="promo"
                    class="input-in-cart"
                    type="text"
                    placeholder="Введите промокод"
                  />
                  <button @click="countPromo()" class="button-in-cart">
                 Оплатить
                  </button>
                </div>
                <h4 v-if="promoRed" class="promo-text">
                  Такого промокода не существует
                </h4>
                <h4 v-if="promoGreen" class="promo-suc">
                  Промокод успешно введен
                </h4>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Стоимость:</h4>
                  <p class="number-in-cart">{{ grandTotal }} $</p>
                </div>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Скидка:</h4>
                  <p class="number-in-cart">{{ sale }}</p>
                </div>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Стоимость доставки:</h4>
                  <p class="number-in-cart">0</p>
                </div>
                <div class="prices-window-line"></div>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Доставка:</h4>
                  <p class="number-in-cart">Доставка курьером</p>
                </div>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Тип заказа:</h4>
                  <p class="number-in-cart">Покупка</p>
                </div>
                <div class="sum-in-cart-container">
                  <h4 class="text-in-cart">Способ оплаты:</h4>
                  <p class="number-in-cart">{{ paid }}</p>
                </div>
                <button @click="openModal" class="buy-now">
                  Перейти к оформлению
                </button>
              </div>
              <div class="sum-in-cart">
                <h3 class="SaleText">Акция!</h3>
                <p class="SaleText-two">
                  Введите промокод <span class="sale20">SALE20</span> и получите
                  скидку 20%
                </p>
              </div>
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
import CreditCard from "../components/CreditCard.vue";
import { ElButton } from "element-plus";
import { ElRow, ElCol } from "element-plus";
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      promo: "",
      promoRed: false,
      promoGreen: false,
      sale: "",
      visibleModalReg: false,
      visibleError: false,
      modalName: "",
      modalPhone: "",
      modalNameOk: "",
      modalPhoneOk: "",
      region: "",
      street: "",
      house: "",
      room: "",
      porch: "",
      floor: "",
      dataTable: false,
      paid: "Наличный расчет",
      addressVis: false,
      buttonAddress: true,
      yourAddress: false,
      buyNow: false,
      modalBuyNow: false,
      PaymentByCard:false
    };
  },
  components: {
    Navbar,
    Footer,
    CreditCard
  },
  methods: {
    ...mapMutations(["DELETE_PRODUCT_CART", "SET_SUM_WITH_PROMO"]),
    ...mapActions(["fetchProductsByCart"]),
    getProductsByCart() {
      this.fetchProductsByCart();
    },
    plus(product) {
      product.value++;
    },
    minus(product) {
      if (product.value > 1) {
        product.value--;
      }
    },
    changePaid(ells) {
      console.log(ells);
      this.paid = ells;
    },
    showAddress() {
      this.addressVis = true;
    },
    saveAddress() {
      if (
        this.region &&
        this.street &&
        this.house &&
        this.room &&
        this.porch &&
        this.floor
      ) {
        this.addressVis = false;
        this.visibleError = false;
        this.buttonAddress = false;
        this.yourAddress = true;
        this.buyNow = true;
      } else {
        this.visibleError = true;
      }
    },
    openModal() {
      this.visibleModalReg = true;
      this.modalName = this.modalNameOk;
      this.modalPhone = this.modalPhoneOk;
      this.dataTable = false;
    },
    closePayment(){
      this.PaymentByCard = false;
    },
    closeModal() {
      this.visibleModalReg = false;
      this.addressVis = false;
    },
    checkoutProduct() {
      if (this.modalName && this.modalPhone) {
        this.visibleModalReg = false;
        this.visibleError = false;
        this.modalNameOk = this.modalName;
        this.modalPhoneOk = this.modalPhone;
        this.modalName = "";
        this.modalPhone = "";
        this.dataTable = true;
      } else {
        this.visibleError = true;
      }
    },
    addOrder2(){
      this.dataTable=false
      this.PaymentByCard = false
      this.modalBuyNow = true;
        setTimeout(() => {
          this.modalBuyNow = false;
        }, 2000);
    },
    addOrder() {
      if (
        this.paid == "Наличный расчет" ||
        this.paid == "Оплата по терминалу"
      ) {
        this.modalBuyNow = true;
        setTimeout(() => {
          this.modalBuyNow = false;
        }, 2000);
      }else{
        this.PaymentByCard = true
      }
    },
    countPromo() {
      this.promoRed = false;
      this.promoGreen = false;
      if (this.promo == "sale20" || this.promo == "SALE20") {
        this.promoGreen = true;
        this.SET_SUM_WITH_PROMO(20);
        this.sale = Math.floor(this.grandTotal - this.allProductSum);
      } else {
        this.promoRed = true;
      }
      this.promo = "";
    },
    deleteCart(product) {
      this.DELETE_PRODUCT_CART({
        id: product.id,
      });
      this.getProductsByCart();
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
    ...mapGetters(["buyProducts", "allProductSum", "grandTotal"]),
  },
  mounted() {
    this.getProductsByCart();
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
.prices-window-title-new {
  margin-left: 40px;
  font-weight: 300;
  font-size: 32px;
  line-height: 40px;
  margin-top: 10px;
}
.checkout-modal-order {
  position: fixed;
  display: flex;
  z-index: 3;
  top: 30px;
  left: 10px;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(3px);
  justify-content: center;
  align-items: center;
}
.buyOrder {
  display: block;
  width: 70%;
  height: 50px;
  background: #da002b;
  color: white;
  font-size: 20px;
  border: 2px solid #da002b;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 20px;
  transition: 0.5s;
  cursor: pointer;
}
.your-address {
  color: #111;
  margin-left: 20px;
  margin-top: 20px;
}
.address-title {
  color: #111;
  margin-left: 20px;
  margin-top: 10px;
}
.titleAddress {
  color: #818181;
  font-size: 16px;
  font-weight: 300;
  margin-top: 10px;
}
.adress-container {
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  justify-content: space-around;
}
.modal-input-adr {
  width: 200px;
  display: block;
  margin: auto;
  height: 40px;
  margin-top: 10px;
  padding-left: 10px;
  border: 2px solid #111;
  border-radius: 8px;
}
.addAddress {
  width: 45%;
  height: 470px;
  background: white;
  border-radius: 10px;
  border: 5px solid #da002b;
  position: fixed;
  z-index: 3;
  left: 25%;
  top: 80px;
}
.radio-container {
  display: flex;
  justify-content: space-around;
}
.radio-button-mini {
  width: 100%;
  height: 50px;
  border: 2px solid rgb(177, 176, 176);
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  font-size: 25px;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.radio-img {
  width: 100px;
}
.radio-button:has(input:checked) {
  border: 2px solid #da002b;
}
.radio-button-mini:has(input:checked) {
  border: 2px solid #da002b;
}
.radio-button {
  width: 90%;
  height: 50px;
  border: 2px solid rgb(177, 176, 176);
  margin: auto;
  margin-top: 20px;
  padding: 10px;
  font-size: 25px;
  border-radius: 10px;
  cursor: pointer;
}
.addAdress-button {
  display: block;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 90%;
  height: 100px;
  background: transparent;
  font-size: 20px;
  border: 2px solid grey;
  border-radius: 10px;
  color: #da002b;
  cursor: pointer;
  transition: 0.5s;
}
.show-address {
  margin: auto;
  margin-top: 30px;
  margin-bottom: 50px;
  width: 90%;
  height: 200px;
  background: transparent;
  font-size: 20px;
  border: 2px solid grey;
  border-radius: 10px;
  color: #da002b;
  cursor: pointer;
  transition: 0.5s;
}
.addAdress-button:hover {
  border: 2px solid #da002b;
}
.delivery-button {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  text-transform: uppercase;
  border: none;
  color: white;
  background: black;
  cursor: pointer;
  margin-left: 40px;
}
.your-data-text {
  font-size: 20px;
  text-align: center;
  margin: auto;
  margin-bottom: 10px;
}
.your-data-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.your-data-button {
  width: 100px;
  height: 50px;
  background: white;
  border: 2px solid #da002b;
  color: #da002b;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 10px;
  transition: 0.5s;
  margin-right: 30px;
  margin-top: 10px;
}
.your-data-button:hover {
  background: #da002b;
  color: white;
}
.modal-registration {
  width: 40%;
  height: 300px;
  background: white;
  border-radius: 10px;
  border: 5px solid #da002b;
  position: fixed;
  z-index: 3;
  left: 25%;
  top: 180px;
}
.modal-payByCard {
  width: 70%;
  height: 480px;
  background: white;
  border-radius: 10px;
  border: 5px solid #da002b;
  position: fixed;
  z-index: 3;
  left: 15%;
  top: 140px;
}
.modal-registration-title {
  text-transform: uppercase;
  text-align: center;
  margin-top: 40px;
}
.delete {
  display: block;
  width: 20px;
  cursor: pointer;
  margin: auto;
  margin-top: 80px;
}
.sum-in-cart-title {
  margin-top: 20px;
  margin-left: 5%;
  text-transform: uppercase;
  font-size: 24px;
}
.cart-window {
  margin-top: 30px;
  width: 100%;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  margin-bottom: 50px;
}
.card-in-cart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.image-in-cart {
  width: 150px;
  margin-top: 15px;
  margin-left: 4%;
}
.product-title-in-cart {
  font-size: 20px;
}
.text-in-cart {
  width: 20%;
}
.count-in-cart {
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
}
.price-in-cart {
  font-size: 20px;
  margin-right: 40px;
}
.sum-in-cart {
  margin-top: 30px;
  margin-left: 20px;
  width: 88%;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  position: relative;
  margin-bottom: 40px;
}
.input-in-cart {
  width: 55%;
  height: 50px;
  background: transparent;
  border: none;
  font-size: 13px;
  text-transform: uppercase;
  padding-left: 10px;
  border-radius: 10px 0px 0px 10px;
}
.button-in-cart {
  width: 41.8%;
  height: 50px;
  background: #da002b;
  color: white;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 0px 10px 10px 0px;
  transition: 0.5s;
}
.button-in-cart:hover {
  background: white;
  color: #da002b;
}
.card-form__button{
  width: 140px;
  height: 50px;
  background: #da002b;
  color: white;
  border: none;
  border: 1px solid #da002b;
  text-transform: uppercase;
  cursor: pointer;
  border-radius:10px;
  transition: 0.5s;
  margin-left: 800px;
  margin-top: 30px;
}
.card-form__button:hover{
  background: white;
  color: #da002b;
}
.promo-text {
  font-size: 10px;
  text-transform: uppercase;
  color: #da002b;
  margin-left: 20px;
}
.promo-suc {
  font-size: 10px;
  text-transform: uppercase;
  color: green;
  margin-left: 20px;
}
.promo {
  display: flex;
  margin-left: 5%;
  width: 80%;
  border: 1px solid black;
  border-radius: 10px;
  margin-top: 20px;
}
.sum-in-cart-container {
  display: flex;
  justify-content: space-between;
}
.SaleText {
  margin-top: 10px;
  margin-bottom: 10px;
  text-transform: uppercase;
  text-align: center;
  color: #da002b;
}
.SaleText-two {
  width: 70%;
  margin: auto;
  padding-bottom: 30px;
  font-size: 20px;
}
.sale20 {
  color: green;
}
.text-in-cart {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
  margin-left: 5%;
}
.number-in-cart {
  font-size: 18px;
  margin-right: 5%;
  margin-top: 10px;
}
.buy-now {
  display: block;
  width: 70%;
  height: 50px;
  background: #da002b;
  color: white;
  font-size: 20px;
  border: 2px solid #da002b;
  border-radius: 10px;
  margin: auto;
  margin-bottom: 20px;
  transition: 0.5s;
  cursor: pointer;
}
.buy-now:hover {
  background: white;
  color: #da002b;
}

</style>