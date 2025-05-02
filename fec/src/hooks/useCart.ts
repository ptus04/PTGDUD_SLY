import { useEffect } from "react";
import useStore from "../store/useStore";

const useCart = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    if (!state.user) {
      const cart = localStorage.getItem("cart");

      if (cart) {
        dispatch({ type: "SET_CART", payload: JSON.parse(cart) });
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
  }, [dispatch, state.user]);
};

export default useCart;
