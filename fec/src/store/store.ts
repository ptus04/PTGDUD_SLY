import CartItem from "@be/src/models/CartItem.model";
import User from "@be/src/models/User.model";

export type State = {
  isExpanded: boolean;
  user?: Omit<User, "password">;
  success?: string;
  warning?: string;
  error?: string;
  cart?: CartItem[];
};

export const initialState: State = {
  isExpanded: false,
};

export type Action =
  | { type: "OPEN_NAV_BAR" }
  | { type: "CLOSE_NAV_BAR" }
  | { type: "SET_USER"; payload: Omit<User, "password"> }
  | { type: "UNSET_USER" }
  | { type: "SET_SUCCESS"; payload: string }
  | { type: "UNSET_SUCCESS" }
  | { type: "SET_WARNING"; payload: string }
  | { type: "UNSET_WARNING" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "UNSET_ERROR" }
  | { type: "SET_CART"; payload: CartItem[] };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "OPEN_NAV_BAR":
      return { ...state, isExpanded: true };
    case "CLOSE_NAV_BAR":
      return { ...state, isExpanded: false };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "UNSET_USER":
      return { ...state, user: undefined };
    case "SET_SUCCESS":
      return { ...state, success: action.payload };
    case "UNSET_SUCCESS":
      return { ...state, success: undefined };
    case "SET_WARNING":
      return { ...state, warning: action.payload };
    case "UNSET_WARNING":
      return { ...state, warning: undefined };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "UNSET_ERROR":
      return { ...state, error: undefined };
    case "SET_CART":
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};
