import { memo } from "react";
import { Link } from "react-router";
import RenderIf from "../components/RenderIf";
import useNavBar from "../hooks/useNavBar";
import useProductQuery from "../hooks/useProductQuery";
import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";
import CustomizedHeaderTag from "./CustomizedHeaderTag";
import useCart from "../hooks/useCart";

const Header = () => {
  const { state } = useStore();
  const { handleOpen } = useNavBar();
  const { handleRemoveFromCart } = useCart();
  const handleSubmit = useProductQuery();

  return (
    <CustomizedHeaderTag>
      <div className="flex shrink grow basis-0 flex-row items-center gap-3">
        <button
          className="cursor-pointer duration-200 hover:text-red-500"
          type="button"
          title="Mở menu"
          onClick={handleOpen}
        >
          <i className="fa fa-bars"></i>
        </button>
        <form className="hidden md:flex" onSubmit={handleSubmit}>
          <input className="border-b px-3 py-1" type="search" name="query" placeholder="Nhập từ khóa" required />
          <button className="cursor-pointer px-1 py-1 duration-100 hover:text-red-500" type="submit" title="Tìm kiếm">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>

      <h1 className="mb-0 basis-auto text-center">
        <Link to="/">
          <img className="h-12" src="/SLYLOGO_black-800x298.png" alt="LOGO SLY" />
        </Link>
      </h1>

      {/* Cart and Account */}
      <div className="flex shrink grow basis-0 flex-row items-center justify-end gap-3">
        <div className="group relative">
          <Link
            className="relative before:absolute before:top-full before:left-[0.15rem] before:z-10 before:hidden before:rotate-45 before:border-t-2 before:border-l-2 before:border-gray-500 before:bg-white before:p-1 group-hover:before:block"
            to="cart"
            title="Giỏ hàng"
          >
            <i className="fa fa-bag-shopping"></i>
            <span className="hidden md:inline"> Giỏ hàng</span>
            {/* Show cart item count if cart is not empty */}
            <RenderIf condition={!!state.cart && state.cart?.items.length > 0}>
              <span className="absolute -top-3/10 left-[0.5rem] w-4 rounded-full bg-red-500 text-center text-xs text-white">
                {state.cart?.items.length}
              </span>
            </RenderIf>
          </Link>

          <div className="absolute top-11/10 -right-8 hidden max-h-[80vh] max-w-[30rem] min-w-[20rem] overflow-auto border-2 border-gray-500 bg-white p-2 shadow group-hover:block">
            <RenderIf condition={!state.cart || state.cart?.items.length === 0}>
              <p className="m-0 text-center">Chưa có sản phẩm trong giỏ hàng.</p>
            </RenderIf>

            <RenderIf condition={!!state.cart && state.cart?.items.length > 0}>
              {state.cart?.items.map((product) => (
                <div key={product.productId + product.size} className="flex items-center p-1">
                  <Link to={`/products/${product.productId}`}>
                    <img className="h-14" src={`/img/${product.image}`} loading="lazy" alt={product.image} />
                  </Link>
                  <div className="ms-2 overflow-hidden">
                    <Link to={`/products/${product.productId}`}>
                      {product.title} {product.size ? `(${product.size})` : ""}
                    </Link>
                    <p>
                      {product.quantity} &times;
                      <span className="font-bold">{formatAsCurrency(product.price)}</span>
                    </p>
                  </div>
                  <button
                    className="ms-auto cursor-pointer"
                    type="button"
                    onClick={() => handleRemoveFromCart(product.productId, product.size)}
                    title="Xóa sản phẩm"
                  >
                    <i className="fa fa-remove"></i>
                  </button>
                </div>
              ))}

              <hr className="my-2" />

              <div className="flex justify-between p-1 text-sm">
                <p className="font-bold">Tạm tính:</p>
                <p className="text-end font-bold">
                  {formatAsCurrency(state.cart?.items.reduce((acc, p) => acc + p.price * p.quantity, 0) ?? 0)}
                </p>
              </div>
            </RenderIf>
          </div>
        </div>

        <Link to={state.user ? "/user" : "/login"} className="cursor-pointer" title="Tài khoản">
          <i className="fa fa-user"></i>
          <span className="hidden md:inline"> {state.user ? state.user.name : "Tài khoản"}</span>
        </Link>
      </div>
    </CustomizedHeaderTag>
  );
};

export default memo(Header);
