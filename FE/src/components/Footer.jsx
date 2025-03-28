const Footer = () => {
  return (
    <footer className="mt-5 px-3 text-center">
      <p className="mb-1 text-2xl">THEO DÕI SLY NGAY</p>
      <ul className="flex justify-center space-x-4">
        <li className="p-2">
          <a
            className="text-sm transition-colors duration-100 hover:text-red-500"
            href="#"
          >
            <i className="fa-brands fa-facebook"></i>
            <span> FACEBOOK</span>
          </a>
        </li>
        <li className="p-2">
          <a
            className="text-sm transition-colors duration-100 hover:text-red-500"
            href="#"
          >
            <i className="fa-brands fa-tiktok"></i>
            <span> TIKTOK</span>
          </a>
        </li>
        <li className="p-2">
          <a
            className="text-sm transition-colors duration-100 hover:text-red-500"
            href="#"
          >
            <i className="fa-brands fa-instagram"></i>
            <span> INSTAGRAM</span>
          </a>
        </li>
      </ul>
      <hr className="my-1" />
      <ul className="flex flex-wrap justify-center">
        <li className="mx-auto p-2">
          <a
            className="transition-colors duration-100 hover:text-red-500"
            href="./chinh-sach-bao-mat.html"
          >
            CHÍNH SÁCH BẢO MẬT
          </a>
        </li>
        <li className="mx-auto p-2">
          <a
            className="transition-colors duration-100 hover:text-red-500"
            href="./chinh-sach-doi-tra.html"
          >
            CHÍNH SÁCH ĐỔI TRẢ
          </a>
        </li>
        <li className="mx-auto p-2">
          <a
            className="transition-colors duration-100 hover:text-red-500"
            href="./he-thong-cua-hang.html"
          >
            HỆ THỐNG CỬA HÀNG
          </a>
        </li>
        <li className="mx-auto p-2">
          <a
            className="transition-colors duration-100 hover:text-red-500"
            href="./so-do-website.html"
          >
            SƠ ĐỒ WEBSITE
          </a>
        </li>
      </ul>
      <address className="mt-3 text-sm">
        <span>Công ty TNHH Thương Mại và Dịch Vụ SLY</span>
        <br />
        <span>123 Đường ABC, Phường XYZ, Quận 123, TP. HCM</span>
        <br />
        <span>Điện thoại: </span>
        <a
          className="transition-colors duration-100 hover:text-red-500"
          href="tel:+84868635209"
        >
          +84 68635209
        </a>
        <br />
        <span>Email: </span>
        <a
          className="transition-colors duration-100 hover:text-red-500"
          href="mailto:cs@sly.vn"
        >
          cs@sly.vn
        </a>
      </address>
      <p>
        Copyright 2024&copy;{" "}
        <a
          className="transition-colors duration-100 hover:text-red-500"
          href="/"
        >
          SLY
        </a>
      </p>
    </footer>
  );
};

export default Footer;
