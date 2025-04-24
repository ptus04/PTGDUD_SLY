import { memo, useContext } from "react";
import { Outlet } from "react-router";
import AppContext from "../AppContext";
import GlobalError from "../components/GlobalError";
import useAuthentication from "../hooks/useAuthentication";
import useCart from "../hooks/useCart";
import useTitle from "../hooks/useTitle";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = () => {
  useTitle();
  useAuthentication();
  useCart();

  const context = useContext(AppContext);

  return (
    <>
      <Header />
      <GlobalError error={context.state.error ?? ""} type="error" />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default memo(Layout);
