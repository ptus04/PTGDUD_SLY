import { memo } from "react";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";

const AboutUsPage = () => {
  return (
    <main className="container mx-auto p-4">
      <BreadCrumbs />

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-center text-3xl font-bold">Hệ thống cửa hàng</h1>

        <hr className="self-stretch text-gray-300" />
        <p className="rounded-full border-2 border-gray-500 bg-white px-4 py-2">Cửa hàng</p>
        <p>182/13 Lê Văn Sỹ, P10, Phú Nhuận, TP. HCM</p>
        <Link className="hover:text-red-500" to="mailto:slyclothing.vn@gmail.com">
          slyclothing.vn@gmail.com
        </Link>

        <p className="mt-4 rounded-full border-2 border-gray-500 bg-white px-4 py-2">Kho hàng</p>
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
