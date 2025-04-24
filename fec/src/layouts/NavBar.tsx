import { memo, useContext } from "react";
import { Link } from "react-router";
import AppContext, { AppActionTypes } from "../AppContext";

const NavBar = () => {
  const context = useContext(AppContext);

  return (
    <nav
      className={`fixed top-0 z-30 h-dvh w-full flex-col transition-all duration-200 ${context.state.isExpanded ? "bg-black/50" : "invisible"}`}
    >
      <div
        className={`flex h-full w-full flex-col overflow-auto bg-white/75 px-4 py-2 backdrop-blur-lg duration-200 md:w-2/5 lg:w-1/5 ${context.state.isExpanded ? "" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between">
          <form className="flex">
            <button className="cursor-pointer duration-200 hover:text-red-500" type="submit" title="Tìm kiếm">
              <i className="fa fa-search"></i>
            </button>
            <input
              className="border-b px-2 py-1 outline-none"
              type="search"
              name="tuKhoa"
              placeholder="Nhập từ khóa"
              required
            />
          </form>
          <button
            className="aspect-square w-6 cursor-pointer duration-200 hover:bg-red-500 hover:text-white"
            type="button"
            title="Đóng menu"
            onClick={() => context.dispatch({ type: AppActionTypes.TOGGLE_NAVBAR })}
          >
            <i className="fa fa-close"></i>
          </button>
        </div>

        <ul className="mt-3 flex flex-col gap-4">
          <li>
            <details>
              <summary className="flex cursor-pointer items-center gap-2">
                <a className="font-bold" href="./tim-kiem.html?phanLoai=tops">
                  TOPS
                </a>
                <span>
                  <i className="fa fa-caret-right"></i>
                </span>
              </summary>

              <ul className="m-2 flex flex-row gap-4">
                <li className="text-sm">
                  <a className="transition-colors duration-100 hover:text-red-500" href="./tim-kiem.html?phanLoai=tee">
                    TEE
                  </a>
                </li>
                <li className="text-sm">
                  <a className="transition-colors duration-100 hover:text-red-500" href="./tim-kiem.html?phanLoai=polo">
                    POLO
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="flex cursor-pointer items-center gap-2">
                <a className="font-bold" href="./tim-kiem.html?phanLoai=outwear">
                  OUTWEARS
                </a>
                <span>
                  <i className="fa fa-caret-right"></i>
                </span>
              </summary>

              <ul className="m-2 flex flex-row gap-4">
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=jackets"
                  >
                    JACKETS
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=hoodies"
                  >
                    HOODIES
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="flex cursor-pointer items-center gap-2">
                <a className="font-bold" href="./tim-kiem.html?phanLoai=bottoms">
                  BOTTOMS
                </a>
                <span>
                  <i className="fa fa-caret-right"></i>
                </span>
              </summary>

              <ul className="m-2 flex flex-row gap-4">
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=shorts"
                  >
                    SHORTS
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=pants"
                  >
                    PANTS
                  </a>
                </li>
              </ul>
            </details>
          </li>

          <li>
            <details>
              <summary className="flex cursor-pointer items-center gap-2">
                <a className="font-bold" href="./tim-kiem.html?phanLoai=accessories">
                  ACCESSORIES
                </a>
                <span>
                  <i className="fa fa-caret-right"></i>
                </span>
              </summary>

              <ul className="m-2 flex flex-row gap-4">
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=wallets"
                  >
                    WALLETS
                  </a>
                </li>
                <li className="text-sm">
                  <a className="transition-colors duration-100 hover:text-red-500" href="./tim-kiem.html?phanLoai=caps">
                    CAPS
                  </a>
                </li>
                <li className="text-sm">
                  <a
                    className="transition-colors duration-100 hover:text-red-500"
                    href="./tim-kiem.html?phanLoai=backpacks"
                  >
                    BACKPACKS
                  </a>
                </li>
              </ul>
            </details>
          </li>
        </ul>

        <div className="mt-auto">
          <ul className="text-sm">
            <li className="p-0">
              <a className="transition-colors duration-100 hover:text-red-500" href="./chinh-sach-bao-mat.html">
                CHÍNH SÁCH ĐỔI TRẢ
              </a>
            </li>
            <li className="p-0">
              <a className="transition-colors duration-100 hover:text-red-500" href="./chinh-sach-doi-tra.html">
                CHÍNH SÁCH BẢO MẬT
              </a>
            </li>
            <li className="p-0">
              <a className="transition-colors duration-100 hover:text-red-500" href="./he-thong-cua-hang.html">
                HỆ THỐNG CỬA HÀNG
              </a>
            </li>
            <li className="p-0">
              <a className="transition-colors duration-100 hover:text-red-500" href="./so-do-website.html">
                SƠ ĐỒ WEBSITE
              </a>
            </li>
          </ul>
          <div className="flex items-center justify-center gap-3">
            <Link className="transition-colors duration-100 hover:text-red-500" to="#" title="Facebook">
              <i className="fa-brands fa-facebook"></i>
            </Link>
            <Link className="transition-colors duration-100 hover:text-red-500" to="#" title="TikTok">
              <i className="fa-brands fa-tiktok"></i>
            </Link>
            <Link className="transition-colors duration-100 hover:text-red-500" to="#" title="Instagram">
              <i className="fa-brands fa-instagram"></i>
            </Link>
          </div>
          <p className="mb-0 text-center">
            Copyright 2024&copy;{" "}
            <a className="transition-colors duration-100 hover:text-red-500" href="/">
              SLY
            </a>
          </p>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavBar);
