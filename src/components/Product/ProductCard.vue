<template>
  <div class="product-card-wrapper" @click="handleClick">
    <div class="image-wrapper">
      <Image :source="product.image" :altText="product.name" />
      <HeartButton
        :isWishListed="isWishListed"
        @handleChange="
          (value) => {
            value.event.stopPropagation();
            handleWishList(value.buttonState);
          }
        "
      />
    </div>
    <div class="details">
      <div class="title">{{ product.name }}</div>
      <div class="cost">${{ product.price }}</div>
      <div class="ratings-section">
        <div class="ratings">
          <FontAwesomeIcon
            v-for="(item, index) in product.ratings"
            :key="index"
            icon="star"
          />
        </div>
        <div class="comments">({{ product.comments.length }} reviews)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import HeartButton from "../HeartButton.vue";
import Image from "../Image.vue";

export default {
  name: "ProductCard",
  data() {
    return {
      isWishListed: false,
    };
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  components: {
    HeartButton,
    Image,
  },
  methods: {
    handleWishList(flag) {
      if (flag) {
        this.addProductToWishlist(this.product);
        //this.$store.dispatch("cart/addProductToWishlist", this.product);
      } else {
        this.removeProductFromWishlist(this.product);
      }
    },
    handleClick() {
      //this.currentProduct(this.product);
      this.$router.push("/pdp/"+ this.product.id);
    },
    ...mapActions("cart", [
      "addProductToWishlist",
      "removeProductFromWishlist",
      "currentProduct",
    ]),
  },
  computed: {
    ...mapGetters("cart", ["getProductFromWishlist"]),
  },
  mounted() {
    let products = this.getProductFromWishlist(this.product.id);

    this.isWishListed = products.length > 0 ? true : false;
  },
};
</script>

<style lang="scss" scoped>
.product-card-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: $theme-silver;
  box-shadow: 0 4px 12px 0px rgb(0 0 0 / 10%);
  .image-wrapper {
    height: 250px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    img {
      transition: transform 3s;
      -webkit-transition: transform 3s;
      &:hover {
        transform: translateZ(0) scale(1.15);
      }
    }
    .heart-wrapper {
      position: absolute;
      top: -15px;
      right: 0;
    }
  }
  .details {
    padding: 15px;
    .title {
      font-size: $regular;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .cost {
      font-size: $medium;
      font-weight: 500;
      margin: 10px 0;
    }
    .ratings-section {
      display: flex;
      justify-content: space-between;
      .ratings {
        color: $theme-red;
      }
    }
  }
}
</style>
