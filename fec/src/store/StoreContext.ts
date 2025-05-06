import { createContext, Dispatch } from "react";
import { Action, initialState, State } from "./store";

type StoreContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const StoreContext = createContext<StoreContextType>({
  state: initialState,
  dispatch: () => undefined,
});
