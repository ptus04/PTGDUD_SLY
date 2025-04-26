import { memo } from "react";
import { Link, NavLink } from "react-router";

const AboutUsPage = () => {
  return (
    <main className="container mx-auto p-4">
      {/* Breadcrumbs navigation */}
      <nav className="text-sm text-gray-500">
        <ol className="flex gap-1">
          <li>
            <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/about-us">Hệ thống cửa hàng</NavLink>
          </li>
        </ol>
      </nav>

      {/* About Us content */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-bold">Hệ thống cửa hàng</h1>

        <hr className="self-stretch" />
        <Link to="/products" className="rounded-full border-2 border-black bg-white px-4 py-2">
          Cửa hàng
        </Link>
        <p>182/13 Lê Văn Sỹ, P10, Phú Nhuận, TP. HCM</p>
        <Link className="hover:text-red-500" to="mailto:slyclothing.vn@gmail.com">
          slyclothing.vn@gmail.com
        </Link>

        <Link to="/products" className="rounded-full border-2 border-black bg-white px-4 py-2">
          Kho hàng
        </Link>
        <p>112/23B Bạch Đằng, Phường 2, Tân Bình, Thành Phố Hồ Chí Minh</p>
        <p>09h00 đến 17h30 tất cả các ngày trong tuần</p>
        <Link className="hover:text-red-500" to="mailto:info@slyclothing.vn">
          info@slyclothing.vn
        </Link>
      </div>
    </main>
  );
};

export default memo(AboutUsPage);
