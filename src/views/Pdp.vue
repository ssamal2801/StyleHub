<template>
<div>
        <Header />
</div>
 <div class="product-card-wrapper">
      <div class="image-wrapper">
        <Image :src="currentProduct.image" />
        <HeartButton class="heart-wrapper"
        :isWishListed="isWishListed"
        @handleChange="
          (value) => {
            value.event.stopPropagation();
            handleWishList(value.buttonState);
          }"/> 
      </div>
      <div class="details">
      <div class="title">{{ currentProduct.name }}</div>
      <div class="cost">Ca${{ currentProduct.price }}</div>
      <div class="description"> <b>Description:</b> {{ currentProduct.description }} </div>
      <div class="ratings-section">
        <div class="ratings">
          <FontAwesomeIcon
            v-for="(item, index) in currentProduct.ratings"
            :key="index"
            icon="star"
          />
        </div>
        <div class="comments">({{ currentProduct.comments.length }} reviews)</div>
      </div>
      <div class="buttons">
        <div class="quantityPicker">
          <ProductCounter
          :count="count"
          @increaseCount="increaseCount"
          @decreaseCount="decreaseCount"
          />
        </div>
        <Button buttonText="Order Now"/> &nbsp;
        <Button buttonText="Add to Cart"/>
        </div>
    </div>
 </div>

 <div class="comment-section">
    <h2>Customer Reviews</h2>

    <div class="post-review" >
      <Input :productId="productId" />
    </div>
    {{JSON.stringify(currentProduct)}}
    <div class="my-review" v-if="currentProduct.comments.length > 0">
      <div class="title">({{currentProduct.comments[0].stars}}Stars) {{currentProduct.comments[0].title}} </div>
      <div class="review"> {{currentProduct.comments[0].review}} </div>
      <div class="my-images"> My Image from store </div>
    </div>

    <div class="view-reviews" v-for="item in currentProduct.comments" :key="item">
      {{JSON.stringify(item)}}
      <div class="title">({{item.Stars}} Stars) {{item.title}}</div>
      <div class="review">{{item.comments}}</div>
      <div class="user-images"> (User Image from store) </div>
    </div>

 </div>
</template>

<script>
import { mapActions } from "vuex";
import Header from "../components/Header.vue";
import Image from "../components/Image.vue";
import Button from "../components/Button.vue"
import HeartButton from "../components/HeartButton.vue";
import Input from "../components/Input.vue";
import {productService} from "../services";
import ProductCounter from "../components/ProductCounter.vue";


export default {
  name: "Pdp",
  data() {
    return{
      isWishListed: false,
      currentProduct: {},
      count: 1
    }
  },
  props: {
    productId:{
      type: String,
      default: "men-1",
    },
  },
  components: {
    Header,
    Image,
    Button,
    HeartButton,
    Input,
    ProductCounter,
  },

  methods:{
  handleWishList(flag) {
      console.log("Inside handleWishList : ", this.product);
      if (flag) {
        console.log("Added product to Wishlist : ", this.product);
        this.addProductToWishlist(this.product);
        //this.$store.dispatch("cart/addProductToWishlist", this.product);
      } else {
        this.removeProductFromWishlist(this.product);
      }
    },
  ...mapActions("cart", [
      "addProductToWishlist",
      "removeProductFromWishlist",
      "updateProduct",
      ""
    ]),
  ...mapActions("user", [
      "getUser",
    ]),
    fetchProduct(){
      let category = this.productId.split('-')[0];
      
    productService
        .getProductByCategory(category)
        .then((response) => {
          console.log(response);
          let currentproduct = response.filter((product) => {return product.id === this.productId;});
          this.currentProduct = currentproduct[0];
          if(!this.currentProduct.quantity) this.currentProduct["quantity"] = this.count;
          console.log(this.currentProduct)

        })
        .catch((error) =>
          console.error(
            "Error while fetching products from the product service : ",
            error
          )
        )
    },
    increaseCount() {
      this.count++;
      console.log("increase : ", this.count)
      this.updateProduct({
        productId: this.currentProduct.id,
        key: "quantity",
        value: this.count,
      });
    },
    decreaseCount() {
      if (this.count > 1) {
        this.count--;
        this.updateProduct({
          productId: this.currentProduct.id,
          key: "quantity",
          value: this.count,
        });
      }
    },
  },
  created(){
        this.fetchProduct();
    },
    
};
</script>

<style lang="scss" scoped>

.product-card-wrapper {
  display: flex;
  padding-top: 10px;
  background-color: $theme-silver;
  box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);

  .image-wrapper {
    height: 50vh;
    cursor: pointer;
    position: relative;
    padding: 20px;
    float: left;
    overflow: hidden;
    img {
      width:100%;
      height:auto;
    }
    &:hover{
      overflow: visible
    }
    .heart-wrapper {
      position: absolute;
      top: 5px;
      right: 20px;
    }
  }
  .details {
    padding: 15px;
    width: fit-content;
    .title {
      font-size: $h4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cost {
      font-size: $h5;
      font-weight: 500;
      margin: 10px 0;
    }
    .ratings-section {
      display: flex;
      padding-top:20px;
      .ratings {
        color: $theme-red;
      }
    }
    .description{
      font-size: $h6;
      overflow: hidden;
      max-width: 70%;
      text-overflow: ellipsis;
      padding-top: 8px;
    }
    .buttons {
      padding:40px;
      .quantityPicker{
      display: flex;
      padding: 20px;
      margin-left: 120px;
      }
    }
  }
}

.comment-section{
 padding: 15px;
 .my-review{
   padding: 20px;
   //display:none;
   .title{
     font-size: $h4;
     padding: 5px;
   }
   .review{
      font-size: $h6;
      padding: 5px;
   }
   .my-images{
      padding: 5px;
   }
 }
.view-reviews{
   padding: 20px;
    box-shadow: 4px 0px 12px 0px rgb(0 0 0 / 20%);
   .title{
     font-size: $h4;
     padding: 5px;
   }
   .review{
      font-size: $h6;
      padding: 5px;
   }
   .user-images{
      padding: 5px;
   }
 }

}

</style>
