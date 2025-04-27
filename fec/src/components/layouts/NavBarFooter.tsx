import { memo } from "react";
import { Link } from "react-router";

const NavBarFooter = () => {
  return (
    <div className="mt-auto">
      <ul className="text-sm">
        <li>
          <Link className="duration-200 hover:text-red-500" to="/refund-policy">
            CHÍNH SÁCH ĐỔI TRẢ
          </Link>
        </li>
        <li>
          <Link className="duration-200 hover:text-red-500" to="/privacy-policy">
            CHÍNH SÁCH BẢO MẬT
          </Link>
        </li>
        <li>
          <Link className="duration-200 hover:text-red-500" to="/about-us">
            HỆ THỐNG CỬA HÀNG
          </Link>
        </li>
        <li>
          <Link className="duration-200 hover:text-red-500" to="/sitemap">
            SƠ ĐỒ WEBSITE
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-center gap-2">
        <Link className="duration-200 hover:text-red-500" to="#" title="Facebook">
          <i className="fa-brands fa-facebook"></i>
        </Link>
        <Link className="duration-200 hover:text-red-500" to="#" title="TikTok">
          <i className="fa-brands fa-tiktok"></i>
        </Link>
        <Link className="duration-200 hover:text-red-500" to="#" title="Instagram">
          <i className="fa-brands fa-instagram"></i>
        </Link>
      </div>
      <p className="text-center">Copyright 2025&copy; SLY</p>
    </div>
  );
};

export default memo(NavBarFooter);
