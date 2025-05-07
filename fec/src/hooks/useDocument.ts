import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useStore from "../store/useStore";

const TITLE_MAP: Record<string, string> = {
  "/": "Trang chủ | SLY",
  "/register": "Đăng ký tài khoản | SLY",
  "/login": "Đăng nhập | SLY",
  "/password-recovery": "Khôi phục mật khẩu | SLY",
  "/products": "Cửa hàng | SLY",
  "/user": "Thông tin người dùng | SLY",
  "/cart": "Giỏ hàng | SLY",
  "/about-us": "Hệ thống cửa hàng | SLY",
  "/privacy-policy": "Chính sách bảo mật | SLY",
  "/refund-policy": "Chính sách đổi trả | SLY",
  "/sitemap": "Sitemap | SLY",
};

const useDocument = () => {
  const location = useLocation();
  const { dispatch } = useStore();

  useEffect(() => {
    document.title = TITLE_MAP[location.pathname] || "SLY";
  }, [location.pathname]);

  useEffect(() => {
    dispatch({ type: "SET_SUCCESS", payload: undefined });
    dispatch({ type: "SET_WARNING", payload: undefined });
    dispatch({ type: "SET_ERROR", payload: undefined });
  }, [dispatch, location.pathname]);
};

export default useDocument;
