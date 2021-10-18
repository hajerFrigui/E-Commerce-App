//action.type
//action.payload :data that we will work with

import Axios from "axios";

import { ADD_PRODUCT, REMOVE_PRODUCT } from "../reducers/basketReducer";
const addToCart = (productId, qty) => async (dispatch, getState) => {
  /* try {
    const { data } = await Axios.get("/api/products/" + productId);
    dispatch(
      ADD_PRODUCT({
        product: data._id,
        name: data.name,
        image: data.imgUrl,
        price: data.price,
        stockQuantity: data.stockQuantity,
        qty,
      })
    );
    //ne5ou state jdida w n7otha fi cartitems
    const { basket } = getState(); // object destruction
    // w n7ot cart jdida fi cookies bech ithakkarha server dimaaw matetfassa5ech ki refrechi il page
    Cookie.set("basket", JSON.stringify(basket));
  } catch (error) {}*/

  dispatch(
    ADD_PRODUCT({
      product: productId,
      name: "data.name",
      image: "data.imgUrl",
      price: " data.price",
      stockQuantity: "data.stockQuantity",
      qty,
    })
  );
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch(REMOVE_PRODUCT({ productId }));
  const { basket } = getState(); // object destruction
  Cookie.set("basket", JSON.stringify(basket));
};

export { addToCart, removeFromCart };
