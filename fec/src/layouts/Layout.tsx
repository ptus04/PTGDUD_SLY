import { memo } from "react";
import { Outlet } from "react-router";
import GlobalNotification from "../components/GlobalNotification";
import useAuthentication from "../hooks/useAuthentication";
import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";
import useDocument from "../hooks/useDocument";

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
