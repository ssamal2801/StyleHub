export default {
  getCurrentProduct: (state) => state.currentProduct,
  getProductFromWishlist: (state) => (productId) => 
    state.wishList.filter((product) => {return product.id == productId}),
  getCartCount: (state) => state.carts.length,
  getCartItems: (state) => state.carts,
  getWishlistCount: (state) => state.wishList.length,
  getWishlistItems: (state) => state.wishList,
  totalCart: (state) =>
    state.carts.reduce(
      (currentQuantity, cart) => currentQuantity + cart.quantity,
      0
    ),
  totalAmount: (state) =>
    state.carts.reduce(
      (currentAmount, cart) => currentAmount + cart.quantity * cart.price,
      0
    ),
};
