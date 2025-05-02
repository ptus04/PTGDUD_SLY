import { useEffect } from "react";
import { useLocation } from "react-router";

const TITLE_MAP: Record<string, string> = {
  "/": "Trang chủ | SLY",
  "/register": "Đăng ký tài khoản | SLY",
  "/login": "Đăng nhập | SLY",
  "/products": "Cửa hàng | SLY",
};

const useDocumentTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = TITLE_MAP[pathname] || "SLY";
  }, [pathname]);
};

export default useDocumentTitle;
