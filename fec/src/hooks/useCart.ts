import { useContext, useEffect } from "react";
import AppContext, { AppActionTypes } from "../AppContext";

const useCart = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.session) {
      const cart = localStorage.getItem("cart");

      if (cart) {
        dispatch({ type: AppActionTypes.SET_CART, payload: JSON.parse(cart) });
      }

      // localStorage.setItem(
      //   "cart",
      //   JSON.stringify([
      //     {
      //       _id: "67fb794847d5b4f92b4f0f62",
      //       title: "Pepper Daily Short",
      //       price: 342000,
      //       image: "short_pepper.webp",
      //       quantity: 2,
      //       size: "L",
      //     },
      //   ]),
      // );
    }
  }, [dispatch, state.session]);
};

export default useCart;
