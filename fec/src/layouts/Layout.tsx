import { memo } from "react";
import { Outlet } from "react-router-dom";
import GlobalNotification from "../components/GlobalNotification";
import useAuthentication from "../hooks/useAuthentication";
import useDocument from "../hooks/useDocument";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

const Layout = () => {
  useDocument();
  useAuthentication();

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
