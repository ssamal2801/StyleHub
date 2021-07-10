export default {
  ADD_PRODUCT_TO_CART(state, product) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex !== -1) {
      carts[cartIndex].quantity++;
    } else {
      carts.push({ ...product, quantity: 1 });
    }

    state.carts = [...carts];

    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  REMOVE_PRODUCT_FROM_CART(state, product) {
    const carts = [...state.carts];
    const cartIndex = carts.findIndex((cart) => cart.id === product.id);

    if (cartIndex !== -1) {
      // const item = carts[cartIndex];

      // if (item.quantity === 1) {
      carts.splice(cartIndex, 1);
      // } else {
      //   carts[cartIndex].quantity--;
      // }
    }

    state.carts = [...carts];

    localStorage.setItem("carts", JSON.stringify(state.carts));
  },
  ADD_PRODUCT_TO_WISHLIST(state, product) {
    const wishList = [...state.wishList];
    const wishListIndex = wishList.findIndex((item) => item.id === product.id);

    if (wishListIndex !== -1) {
      wishList[wishListIndex].quantity++;
    } else {
      wishList.push({ ...product, quantity: 1 });
    }

    state.wishList = [...wishList];

    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  REMOVE_PRODUCT_FROM_WISHLIST(state, product) {
    const wishList = [...state.wishList];
    const wishListIndex = wishList.findIndex((item) => item.id === product.id);

    if (wishListIndex !== -1) {
      //const item = wishList[wishListIndex];

      //if (item.quantity === 1) {
      wishList.splice(wishListIndex, 1);
      // } else {
      //   wishList[wishListIndex].quantity--;
      // }
    }

    state.wishList = [...wishList];

    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  REMOVE_ALL_PRODUCTS_FROM_WISHLIST(state) {
    state.wishList = [];
    localStorage.setItem("wishList", JSON.stringify(state.wishList));
  },
  CURRENT_PRODUCT: (state, product) => {
    state.currentProduct = product;
  },
  UPDATE_PRODUCT: (state, { productId, key, value }) => {
    console.log(productId + " " + key + " " + value);
    let product = state.wishList.filter((product) => {
      return product.id === productId;
    });
    if(product.length > 0){
      product[0][key] = value;
      localStorage.setItem("wishList", JSON.stringify(state.wishList));
    }
  },
  PLACE_ORDER: (state, order) => {
    state.orders = [...state.orders, order];
    localStorage.setItem("orders", JSON.stringify(state.orders));
  },
};
