import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router";
import BreadCrumbs from "../components/BreadCrumbs";
import Button from "../components/Button";
import RenderIf from "../components/RenderIf";
import useCart from "../hooks/useCart";
import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";

const CartPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const { syncCart } = useCart();

  const handleQuantityChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, productId: string) => {
      const newQuantity = parseInt(e.target.value);
      const existingProduct = state.cart?.items.find((item) => item._id === productId);
      existingProduct!.quantity = newQuantity;
      dispatch({
        type: "SET_CART",
        payload: state.cart,
      });
      syncCart();
    },
    [dispatch, state.cart, syncCart],
  );

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <BreadCrumbs />

      <h1 className="text-center text-3xl font-bold">Giỏ hàng</h1>

      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex grow basis-[60%] flex-col justify-between gap-4">
          <table className="h-full">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="text-center">Sản phẩm</th>
                <th className="text-end">Đơn giá</th>
                <th className="text-end">Số lượng</th>
                <th className="text-end">Tổng cộng</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <RenderIf condition={!state.cart?.items.length}>
                <tr>
                  <td colSpan={4} className="text-center">
                    Giỏ hàng trống
                  </td>
                </tr>
              </RenderIf>

              <RenderIf condition={!!state.cart?.items.length}>
                {state.cart?.items.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <a className="flex flex-row items-center gap-2" href={`/products/${product._id}`}>
                        <img
                          src={`/img/${product.image}`}
                          loading="lazy"
                          alt={product.image}
                          className="w-[10vw] lg:w-[7vw]"
                        />
                        {product.title} {product.size ? "(" + product.size + ")" : ""}
                      </a>
                    </td>
                    <td className="text-right font-bold">{formatAsCurrency(product.price)}</td>
                    <td className="text-right">
                      <input
                        className="w-12 rounded-md border border-gray-300 px-2 py-1 text-center md:w-20"
                        type="number"
                        name="quantity"
                        id="quantity"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(e, product._id)}
                        min="1"
                        title="Số lượng"
                      />
                    </td>
                    <td className="text-right font-bold">{formatAsCurrency(product.price * product.quantity)}</td>
                    <td>
                      <button
                        className="aspect-square w-6 cursor-pointer text-xs hover:bg-red-500 hover:text-white"
                        type="button"
                        title="Xóa sản phẩm"
                      >
                        <i className="fa fa-remove"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </RenderIf>
            </tbody>
          </table>
          <Link className="flex items-center gap-2 self-start py-2 hover:text-red-500" to="/products">
            <i className="fa fa-shop"></i>
            <span>Quay lại cửa hàng</span>
          </Link>
        </div>

        <div className="grow basis-[38%]">
          <p className="border-b border-gray-300 font-bold">Cộng giỏ hàng</p>
          <div className="flex justify-between border-b border-gray-300 text-sm">
            <p className="py-2">Tạm tính</p>
            <p className="py-2 font-bold">
              {formatAsCurrency(state.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0)}
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-300 text-sm">
            <p className="py-2">Phí giao hàng</p>
            <p className="py-2">Giao hàng miễn phí</p>
          </div>
          <div className="flex justify-between border-b border-black text-sm">
            <p className="py-2">Tổng đơn hàng</p>
            <p className="py-2 font-bold">
              {formatAsCurrency(state.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0)}
            </p>
          </div>
          <div className="mt-3 w-full">
            <Button
              className="w-full"
              preset="primary"
              type="button"
              onClick={() => navigate("/cart/checkout")}
              disabled={!state.cart?.items.length}
            >
              <i className="fa fa-credit-card"></i>
              <span>Tiến hành thanh toán</span>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(CartPage);
