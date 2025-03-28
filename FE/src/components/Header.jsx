import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";

const Header = () => {
  const [headerStyle, setHeaderStyle] = useState({});
  const { setIsNavBarOpen } = useContext(AppContext);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= window.innerHeight) {
        setHeaderStyle({
          position: "fixed",
          backgroundColor: "white",
          boxShadow: "0 0 5px gray",
        });
      } else setHeaderStyle({});
    });
  }, []);

  return (
    <header
      className="fixed z-[3] flex w-full items-center justify-between px-4 py-2"
      style={headerStyle}
    >
      <div className="flex shrink grow basis-0 flex-row items-center gap-3">
        <a
          className="cursor-pointer transition-colors duration-100 hover:text-red-500"
          onClick={() => setIsNavBarOpen(true)}
        >
          <i className="fa fa-bars"></i>
        </a>
        <form className="hidden md:flex" action="./tim-kiem.html" method="GET">
          <input
            className="border-b outline-none"
            type="search"
            placeholder="Nhập từ khóa"
            required
          />
          <button
            className="cursor-pointer px-1 py-1 transition-colors duration-100 hover:text-red-500"
            type="submit"
            title="Tìm kiếm"
          >
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <h1 className="mb-0 basis-auto text-center">
        <a href="/">
          <img
            className="h-12"
            src="/SLYLOGO_black-800x298.png"
            alt="LOGO SLY"
          />
        </a>
      </h1>

      <div className="flex shrink grow basis-0 flex-row items-center justify-end gap-3">
        <div className="popup">
          <a className="popup-trigger" href="./gio-hang.html" title="Giỏ hàng">
            <i className="fa fa-bag-shopping"></i>
          </a>
          <div className="popup-content overflow-auto" id="cart"></div>
        </div>
        <a href="./dang-nhap.html">
          <i className="fa fa-user"></i>
          <span className="hidden md:inline" id="tenTaiKhoan">
            Tài khoản
          </span>
        </a>
      </div>
    </header>
  );
};

export default Header;
