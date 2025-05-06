import { OrderWithIdString } from "@be/src/models/Order.model";
import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useEffect, useState } from "react";
import { NavLink, useLocation, useSearchParams } from "react-router";
import RenderIf from "./RenderIf";

type BreadCrumbsProps = {
  product?: ProductWithIdString;
  order?: OrderWithIdString;
};

const Breadcrumbs = (props: BreadCrumbsProps) => {
  const location = useLocation();
  const [params] = useSearchParams();
  const [category, setCategory] = useState(params.get("category"));
  const [query, setQuery] = useState(params.get("query"));

  useEffect(() => {
    setCategory(params.get("category"));
    setQuery(params.get("query"));
  }, [params]);

  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex gap-1">
        <li>
          <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/">
            Trang chủ
          </NavLink>
        </li>

        <RenderIf condition={/\/products/.test(location.pathname)}>
          <li>
            <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/products" end>
              Cửa hàng
            </NavLink>
          </li>

          <RenderIf condition={!!props.product}>
            <li>
              <NavLink to={`/products/${props.product?._id}`}>{props.product?.title}</NavLink>
            </li>
          </RenderIf>

          <RenderIf condition={!!category}>
            <li>
              <NavLink
                className={`after:text-gray-500 after:content-['_/_'] hover:text-red-500`}
                to={`/products/?category=${category}`}
              >
                Phân loại: {category?.toUpperCase()}
              </NavLink>
            </li>
          </RenderIf>

          <RenderIf condition={!!query}>
            <li>
              <NavLink to={`/products/?${category ? "category=" + category : ""}&query=${query}`}>
                Tìm kiếm: {query}
              </NavLink>
            </li>
          </RenderIf>
        </RenderIf>

        <RenderIf condition={/\/about-us/.test(location.pathname)}>
          <li>
            <NavLink to="/about-us">Hệ thống cửa hàng</NavLink>
          </li>
        </RenderIf>

        <RenderIf condition={/\/privacy-policy/.test(location.pathname)}>
          <li>
            <NavLink to="/privacy-policy">Chính sách bảo mật</NavLink>
          </li>
        </RenderIf>

        <RenderIf condition={/\/refund-policy/.test(location.pathname)}>
          <li>
            <NavLink to="/refund-policy">Chính sách đổi trả</NavLink>
          </li>
        </RenderIf>

        <RenderIf condition={/\/user/.test(location.pathname)}>
          <li className="after:text-gray-500 after:content-['_/_'] hover:text-red-500">
            <NavLink to="/user" end>
              Thông tin tài khoản
            </NavLink>
          </li>

          <RenderIf condition={/\/user\/order-history/.test(location.pathname)}>
            <li className="after:text-gray-500 after:content-['_/_'] hover:text-red-500">
              <NavLink to="/user/order-history" end>
                Quản lý đơn hàng
              </NavLink>
            </li>
          </RenderIf>

          <RenderIf condition={/\/user\/order-history\/.+/.test(location.pathname)}>
            <li>
              <NavLink to={`/user/order-history/${props.order?._id}`}>Thông tin đơn hàng: {props.order?._id}</NavLink>
            </li>
          </RenderIf>
        </RenderIf>

        <RenderIf condition={/\/cart/.test(location.pathname)}>
          <li className="after:text-gray-500 after:content-['_/_'] hover:text-red-500">
            <NavLink to="/cart">Giỏ hàng</NavLink>
          </li>

          <RenderIf condition={/\/cart\/checkout/.test(location.pathname)}>
            <li>
              <NavLink to="/cart">Thanh toán</NavLink>
            </li>
          </RenderIf>
        </RenderIf>
      </ol>
    </nav>
  );
};

export default memo(Breadcrumbs);
