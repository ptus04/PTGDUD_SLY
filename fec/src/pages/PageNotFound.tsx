import { memo } from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex h-96 items-center justify-center gap-4">
      <h2 className="text-center text-6xl font-bold text-gray-500">
        <i className="fa fa-warning text-red-500"></i> 404
      </h2>
      <div className="text-center">
        <h1 className="text-center text-2xl font-bold">Không tìm thấy trang!</h1>
        <p>
          <span>Vui lòng quay lại </span>
          <Link className="text-red-500" to="/products">
            cửa hàng
          </Link>
          <span> hoặc </span>
          <Link className="text-red-500" to="/">
            trở về trang chủ
          </Link>
        </p>
      </div>
    </div>
  );
};

export default memo(PageNotFound);
