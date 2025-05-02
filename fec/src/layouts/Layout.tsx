import { memo } from "react";
import { Outlet } from "react-router";
import GlobalNotification from "../components/GlobalNotification";
import useAuthentication from "../hooks/useAuthentication";
import useCart from "../hooks/useCart";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = () => {
  useAuthentication();
  useCart();

  return (
    <>
      <Header />
      <GlobalNotification />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default memo(Layout);
