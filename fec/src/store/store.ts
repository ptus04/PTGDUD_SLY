import Cart from "@be/src/models/Cart.model";
import User from "@be/src/models/User.model";

export type State = {
  isExpanded: boolean;
  user?: Omit<User, "password">;
  success?: string;
  warning?: string;
  error?: string;
  cart?: Cart;
};

export const initialState: State = {
  isExpanded: false,
};

export type Action =
  | { type: "SET_NAV_BAR_STATE"; payload: boolean }
  | { type: "SET_USER"; payload: Omit<User, "password"> | undefined }
  | { type: "SET_SUCCESS"; payload: string | undefined }
  | { type: "SET_WARNING"; payload: string | undefined }
  | { type: "SET_ERROR"; payload: string | undefined }
  | { type: "SET_CART"; payload: (Cart & { _id?: string }) | undefined };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAV_BAR_STATE":
      return { ...state, isExpanded: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "SET_WARNING":
      return { ...state, warning: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};
