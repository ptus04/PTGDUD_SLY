import { memo } from "react";
import { Link } from "react-router";

const Footer = () => (
  <footer className="mt-5 px-3 text-center">
    <p className="mb-1 text-2xl">THEO DÕI SLY NGAY</p>
    <ul className="flex justify-center space-x-4">
      <li className="p-2">
        <Link className="text-sm hover:text-red-500" to="#">
          <i className="fa-brands fa-facebook"></i>
          <span> FACEBOOK</span>
        </Link>
      </li>
      <li className="p-2">
        <Link className="text-sm hover:text-red-500" to="#">
          <i className="fa-brands fa-tiktok"></i>
          <span> TIKTOK</span>
        </Link>
      </li>
      <li className="p-2">
        <Link className="text-sm hover:text-red-500" to="#">
          <i className="fa-brands fa-instagram"></i>
          <span> INSTAGRAM</span>
        </Link>
      </li>
    </ul>

    <hr className="my-1" />
    <ul className="flex flex-wrap justify-center">
      <li className="mx-auto p-2">
        <Link className="hover:text-red-500" to="/privacy-policy">
          CHÍNH SÁCH BẢO MẬT
        </Link>
      </li>
      <li className="mx-auto p-2">
        <Link className="hover:text-red-500" to="/refund-policy">
          CHÍNH SÁCH ĐỔI TRẢ
        </Link>
      </li>
      <li className="mx-auto p-2">
        <Link className="hover:text-red-500" to="/about-us">
          HỆ THỐNG CỬA HÀNG
        </Link>
      </li>
      <li className="mx-auto p-2">
        <Link className="hover:text-red-500" to="/sitemap">
          SƠ ĐỒ WEBSITE
        </Link>
      </li>
    </ul>

    <address className="mt-3 text-sm">
      <span>Công ty TNHH Thương Mại và Dịch Vụ SLY</span>
      <br />
      <span>123 Đường ABC, Phường XYZ, Quận 123, TP. HCM</span>
      <br />
      <span>Điện thoại: </span>
      <Link className="hover:text-red-500" to="tel:+84868635209">
        +84 68635209
      </Link>
      <br />
      <span>Email: </span>
      <Link className="hover:text-red-500" to="mailto:cs@sly.vn">
        cs@sly.vn
      </Link>
    </address>
    <p>
      Copyright 2024&copy;{" "}
      <Link className="hover:text-red-500" to="/">
        SLY
      </Link>
    </p>
  </footer>
);

export default memo(Footer);
