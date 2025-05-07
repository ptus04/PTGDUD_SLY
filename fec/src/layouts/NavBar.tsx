import { memo } from "react";
import { Link } from "react-router-dom";
import useNavBar from "../hooks/useNavBar";
import useProductQuery from "../hooks/useProductQuery";
import ItemCategory from "./ItemCategory";

const NavBar = () => {
  const { isOpen, handleUnsafeClose, handleClose } = useNavBar();
  const handleSubmit = useProductQuery();

  return (
    <nav
      className={`fixed top-0 z-30 h-dvh w-full flex-col duration-200 ${isOpen ? "bg-black/50" : "invisible"}`}
      onClickCapture={handleUnsafeClose}
    >
      <div
        className={`flex h-full w-full flex-col gap-4 overflow-auto bg-white/75 px-4 py-2 shadow-md backdrop-blur-md duration-200 md:w-2/5 lg:w-1/5 ${isOpen ? "" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <form className="flex gap-2" onSubmit={handleSubmit}>
            <button className="cursor-pointer duration-200 hover:text-red-500" type="submit" title="Tìm kiếm">
              <i className="fa fa-search"></i>
            </button>
            <input className="border-b px-3 py-1" type="search" name="query" placeholder="Nhập từ khóa" required />
          </form>
          <button
            className="aspect-square w-6 cursor-pointer duration-200 hover:bg-red-500 hover:text-white"
            type="button"
            title="Đóng menu"
            onClick={handleClose}
          >
            <i className="fa fa-close"></i>
          </button>
        </div>

        {/* Categories */}
        <ul className="flex flex-col gap-2">
          <ItemCategory name="TOPS" subCategories={["TOPS", "TEE", "POLO"]} />
          <ItemCategory name="OUTWEARS" subCategories={["OUTWEARS", "JACKETS", "HOODIES"]} />
          <ItemCategory name="BOTTOMS" subCategories={["BOTTOMS", "SHORTS", "PANTS"]} />
          <ItemCategory name="ACCESSORIES" subCategories={["ACCESSORIES", "WALLETS", "CAPS", "BACKPACKS"]} />
        </ul>

        {/* Footer */}
        <div className="mt-auto">
          <ul className="text-sm">
            <li>
              <Link className="hover:text-red-500" to="/refund-policy">
                CHÍNH SÁCH ĐỔI TRẢ
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500" to="/privacy-policy">
                CHÍNH SÁCH BẢO MẬT
              </Link>
            </li>
            <li>
              <Link className="hover:text-red-500" to="/about-us">
                HỆ THỐNG CỬA HÀNG
              </Link>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-2">
            <Link className="hover:text-red-500" to="#" title="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link className="0 hover:text-red-500" to="#" title="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </Link>
            <Link className="hover:text-red-500" to="#" title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </div>
          <p className="text-center">
            Copyright {new Date().getFullYear()}&copy;{" "}
            <Link className="hover:text-red-500" to="/">
              SLY
            </Link>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBar);
