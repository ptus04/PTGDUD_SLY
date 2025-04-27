import CartItem from "@be/src/models/CartItem.model";
import React from "react";

export type AppState = {
  isExpanded?: boolean;
  session?: SessionPayload;
  success?: SuccessPayload;
  warning?: WarningPayload;
  error?: ErrorPayload;
  cart?: CartPayload;
};

export const initialState: AppState = {};

export enum AppActionTypes {
  TOGGLE_NAVBAR,
  SET_SESSION,
  CLEAR_SESSION,
  SET_SUCCESS,
  CLEAR_SUCCESS,
  SET_WARNING,
  CLEAR_WARNING,
  SET_ERROR,
  CLEAR_ERROR,
  SET_CART,
}

type SessionPayload = { _id: string; name: string; role: string };
type SuccessPayload = string | undefined;
type WarningPayload = string | undefined;
type ErrorPayload = string | undefined;
type CartPayload = CartItem[] | undefined;

type AppAction =
  | { type: AppActionTypes.TOGGLE_NAVBAR }
  | { type: AppActionTypes.SET_SESSION; payload: SessionPayload }
  | { type: AppActionTypes.CLEAR_SESSION }
  | { type: AppActionTypes.SET_SUCCESS; payload: SuccessPayload }
  | { type: AppActionTypes.CLEAR_SUCCESS }
  | { type: AppActionTypes.SET_WARNING; payload: WarningPayload }
  | { type: AppActionTypes.CLEAR_WARNING }
  | { type: AppActionTypes.SET_ERROR; payload: ErrorPayload }
  | { type: AppActionTypes.CLEAR_ERROR }
  | { type: AppActionTypes.SET_CART; payload: CartPayload };

export const toggleNavbar = () => ({ type: AppActionTypes.TOGGLE_NAVBAR });
export const setSession = (payload: SessionPayload) => ({
  type: AppActionTypes.SET_SESSION,
  payload,
});
export const clearSession = () => ({ type: AppActionTypes.CLEAR_SESSION });
export const setSuccess = (payload: SuccessPayload) => ({
  type: AppActionTypes.SET_SUCCESS,
  payload,
});
export const clearSuccess = () => ({ type: AppActionTypes.CLEAR_SUCCESS });
export const setWarning = (payload: WarningPayload) => ({
  type: AppActionTypes.SET_WARNING,
  payload,
});
export const clearWarning = () => ({ type: AppActionTypes.CLEAR_WARNING });
export const setError = (payload: ErrorPayload) => ({
  type: AppActionTypes.SET_ERROR,
  payload,
});
export const clearError = () => ({ type: AppActionTypes.CLEAR_ERROR });
export const setCart = (payload: CartPayload) => ({
  type: AppActionTypes.SET_CART,
  payload,
});

export const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case AppActionTypes.TOGGLE_NAVBAR:
      return { ...state, isExpanded: !state.isExpanded };
    case AppActionTypes.SET_SESSION:
      return { ...state, session: action.payload };
    case AppActionTypes.CLEAR_SESSION:
      return { ...state, session: undefined };
    case AppActionTypes.SET_SUCCESS:
      return { ...state, success: action.payload };
    case AppActionTypes.CLEAR_SUCCESS:
      return { ...state, success: undefined };
    case AppActionTypes.SET_WARNING:
      return { ...state, warning: action.payload };
    case AppActionTypes.CLEAR_WARNING:
      return { ...state, warning: undefined };
    case AppActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case AppActionTypes.CLEAR_ERROR:
      return { ...state, error: undefined };
    case AppActionTypes.SET_CART:
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

const AppContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initialState,
  dispatch: () => {},
});

export default AppContext;
