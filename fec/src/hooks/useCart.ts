import Cart from "@be/src/models/Cart.model";
import { ProductWithIdString } from "@be/src/models/Product.model";
import { useCallback, useEffect } from "react";
import useStore from "../store/useStore";

// TODO: Optimize this hook to avoid unnecessary re-renders
// TODO: Update prices when navigate to cart page
// TODO: Convert cart to hash to compare versions from server and localStorage

const useCart = () => {
  const { state, dispatch } = useStore();

  const getCart = useCallback(
    async (signal: AbortSignal) => {
      const defaultCart = '{"items": [], "updatedAt": "1970-01-01T00:00:00.000Z"}';
      const cart: Cart = JSON.parse(localStorage.getItem("cart") ?? defaultCart);

      if (state.user) {
        try {
          const res = await fetch("/api/cart", { credentials: "include", signal });
          const data: Cart = await res.json();

          const localTime = new Date(cart["updatedAt"]).getTime();
          const serverTime = new Date(data["updatedAt"]).getTime();
          cart.items = localTime < serverTime ? [...data.items, ...cart.items] : [...cart.items, ...data.items];

          const uniqueItems = new Set(cart.items.map((item) => JSON.stringify([item._id, item.size])));
          const parsedItems = Array.from(uniqueItems).map((item) => JSON.parse(item));
          cart.items = parsedItems.map((item) =>
            cart.items.find((i) => (i.size ? i._id === item[0] && i.size === item[1] : i._id === item[0])),
          ) as Cart["items"];

          cart["updatedAt"] = new Date();

          localStorage.setItem("cart", JSON.stringify(cart));
        } catch (error) {
          dispatch({ type: "SET_ERROR", payload: (error as Error).message });
        }
      }

      dispatch({ type: "SET_CART", payload: cart });
    },
    [state.user, dispatch],
  );

  const syncCart = useCallback(async () => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
    dispatch({ type: "SET_CART", payload: state.cart });

    if (state.user) {
      try {
        const res = await fetch("/api/cart", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(state.cart?.items),
        });
        if (!res.ok) {
          throw new Error("Không thể đồng bộ giỏ hàng với máy chủ.");
        }
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    }
  }, [dispatch, state.cart, state.user]);

  const handleUpdateCart = useCallback(
    async (product: ProductWithIdString, quantity: number, size?: string) => {
      const existingProduct = state.cart?.items.find((item) => item._id === product._id && item.size === size);
      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.cart?.items.push({
          _id: product._id,
          quantity,
          size,
          title: product.title,
          price: product.discount ? product.price * (1 - product.discount) : product.price,
          image: product.images[0],
        });
      }

      syncCart();
    },
    [state.cart, syncCart],
  );

  const handleRemoveFromCart = useCallback(
    async (productId: string, size?: string) => {
      const cart = state.cart;
      if (!cart) {
        return;
      }

      cart.items = state.cart?.items.filter((item) => item._id !== productId || item.size !== size) ?? [];

      syncCart();
    },
    [state.cart, syncCart],
  );

  useEffect(() => {
    const controller = new AbortController();
    getCart(controller.signal);

    return () => controller.abort();
  }, [getCart]);

  return { handleUpdateCart, handleRemoveFromCart, syncCart };
};

export default useCart;
