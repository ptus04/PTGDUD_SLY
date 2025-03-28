import { Outlet } from "react-router";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
