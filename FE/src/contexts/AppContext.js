import { createContext } from "react";

const AppContext = createContext({
  isNavBarOpen: false,
  setIsNavBarOpen: () => {},
});

export default AppContext;
