export default {
  addProductToCart({ commit }, product) {
    commit("ADD_PRODUCT_TO_CART", product);
  },
  removeProductFromCart({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_CART", productId);
  },
  addProductToWishlist({ commit }, product) {
    commit("ADD_PRODUCT_TO_WISHLIST", product);
  },
  removeProductFromWishlist({ commit }, productId) {
    commit("REMOVE_PRODUCT_FROM_WISHLIST", productId);
  },
  removeAllProductsFromWishlist({ commit }) {
    commit("REMOVE_ALL_PRODUCTS_FROM_WISHLIST");
  },
  currentProduct: ({ commit }, product) => {
    commit("CURRENT_PRODUCT", product);
  },
  updateProduct: ({ commit }, { productId, key, value }) => {
    commit("UPDATE_PRODUCT", { productId, key, value });
  },
  placeOrder: ({ commit }, order) => {
    commit("PLACE_ORDER", order);
  },
};
