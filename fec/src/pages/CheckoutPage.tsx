import { memo, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import InputWithLabel from "../components/InputWithLabel";
import RenderIf from "../components/RenderIf";
import SelectWithLabel from "../components/SelectWithLabel";
import useAddress from "../hooks/useAddress";
import useCart from "../hooks/useCart";
import useStore from "../store/useStore";
import { formatAsCurrency } from "../utils/formatters";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const addresses = useAddress();
  const { handleClearCart } = useCart();

  const handlePlaceOrder = useCallback(async () => {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress: {
          name: state.user?.name,
          phone: state.user?.phone,
          city: state.user?.city,
          district: state.user?.district,
          ward: state.user?.ward,
          address: state.user?.address,
        },
        paymentMethod: "cash",
        items: state.cart?.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.price,
        })),
      }),
    });

    const data = await res.json();
    if (res.status === 201) {
      handleClearCart();
      navigate(`/user/order-history/${data.orderId}`, { replace: true });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: data.error ?? "Đặt hàng thất bại",
      });
    }
  }, [
    dispatch,
    handleClearCart,
    navigate,
    state.cart?.items,
    state.user?.address,
    state.user?.city,
    state.user?.district,
    state.user?.name,
    state.user?.phone,
    state.user?.ward,
  ]);

  useEffect(() => {
    // if (state.cart?.items.length === 0) {
    //   navigate("/cart", { replace: true });
    // }
  }, [navigate, state.cart?.items.length]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <ConfirmModal
        title="Không thể đặt hàng"
        content="Bạn chưa cập nhật thông tin giao hàng. Vui lòng cập nhật thông tin trước khi đặt hàng."
        onConfirm={() => navigate("/user")}
        confirmText="Xem đơn hàng"
        onClose={() => {}}
        open={!state.user?.ward}
      />

      <BreadCrumbs />

      <h1 className="my-2 text-center text-3xl font-bold">Thông tin đơn hàng</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="grow basis-[50%]">
          <h2 className="text-lg font-bold">Thông tin giao hàng</h2>
          <form className="vstack flex flex-col justify-between gap-3">
            <InputWithLabel id="name" label="Họ và tên" type="text" value={state.user?.name} readOnly />
            <InputWithLabel id="phone" label="Số điện thoại" type="text" value={state.user?.phone} readOnly />

            <div className="flex flex-col gap-2">
              <SelectWithLabel id="city" label="Thành phố/Tỉnh" required value={state.user?.city ?? ""} disabled>
                <option value="">Chọn thành phố/tỉnh</option>
                {Object.keys(addresses ?? {})
                  .sort((a, b) => a.localeCompare(b))
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </SelectWithLabel>
            </div>
            <div className="flex flex-col gap-2">
              <SelectWithLabel id="district" label="Quận/Huyện" required value={state.user?.district ?? ""} disabled>
                <option value="">Chọn quận/huyện</option>
                {addresses &&
                  state.user?.city &&
                  Object.values(addresses[state.user.city] ?? {})
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </SelectWithLabel>
            </div>

            <div className="flex flex-col gap-2">
              <SelectWithLabel id="ward" label="Phường/Xã" required value={state.user?.ward ?? ""} disabled>
                <option value="">Chọn phường/xã</option>
                {addresses &&
                  state.user?.district &&
                  Object.values(
                    Object.values(addresses[state.user.city ?? ""] ?? {}).filter(
                      (item) => item.name === state.user?.district,
                    )[0]?.wards ?? {},
                  )
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </SelectWithLabel>
            </div>

            <div className="flex flex-col gap-2">
              <InputWithLabel
                id="address"
                label="Địa chỉ"
                type="text"
                autoComplete="street-address"
                readOnly
                value={state.user?.address ?? ""}
                required
                error="Địa chỉ không được để trống"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="note">
                Ghi chú
              </label>
              <textarea
                className="rounded-md border border-gray-300 px-4 py-2 hover:border-red-500 focus:outline-red-500"
                name="note"
                id="note"
              ></textarea>
            </div>

            <div className="mt-4">
              <h2 className="text-lg font-bold">Phương thức thanh toán</h2>
              <div className="flex items-center gap-2">
                <input
                  className="group accent-red-500 focus:outline-red-500 nth-[n+2]:ms-4"
                  type="radio"
                  name="cod"
                  id="cod"
                  value="0"
                  defaultChecked
                />
                <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
              </div>
              <p className="text-sm">Trả tiền mặt khi giao hàng</p>
            </div>
          </form>
        </div>

        <div className="flex grow basis-[48%] flex-col gap-2">
          <table>
            <thead className="border-b border-gray-300">
              <tr>
                <th className="text-center">Sản phẩm</th>
                <th className="text-end">Giá</th>
                <th className="text-end">SL</th>
                <th className="text-end">Tạm tính</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <RenderIf condition={!!state.cart?.items.length}>
                {state.cart?.items.map((product) => (
                  <tr key={product.productId + product.size}>
                    <td>
                      <a className="flex flex-row items-center gap-2" href={`/products/${product.productId}`}>
                        <img
                          src={`/img/${product.image}`}
                          loading="lazy"
                          alt={product.image}
                          className="w-[10vw] lg:w-[3vw]"
                        />
                        {product.title} {product.size ? "(" + product.size + ")" : ""}
                      </a>
                    </td>
                    <td className="text-right font-bold">{formatAsCurrency(product.price)}</td>
                    <td className="text-right">
                      <p>x{product.quantity}</p>
                    </td>
                    <td className="text-right font-bold">{formatAsCurrency(product.price * product.quantity)}</td>
                  </tr>
                ))}
              </RenderIf>
            </tbody>
          </table>

          <p className="border-b border-gray-300 font-bold">Cộng giỏ hàng</p>
          <div className="flex justify-between border-b border-gray-300">
            <p className="py-1">Tạm tính</p>
            <p className="py-1 font-bold">
              {formatAsCurrency(state.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0)}
            </p>
          </div>
          <div className="flex justify-between border-b border-gray-300">
            <p className="py-1">Phí giao hàng</p>
            <p className="py-1">Giao hàng miễn phí</p>
          </div>
          <div className="flex justify-between border-b border-black">
            <p className="py-1">Tổng đơn hàng</p>
            <p className="py-1 font-bold">
              {formatAsCurrency(state.cart?.items.reduce((total, item) => total + item.price * item.quantity, 0) ?? 0)}
            </p>
          </div>

          <Button onClick={handlePlaceOrder}>
            <i className="fa fa-truck-fast"></i>
            <span>Đặt hàng</span>
          </Button>

          <div className="hstack mt-3 flex flex-wrap justify-center md:justify-between">
            <Link className="flex items-center gap-2 self-start py-2 hover:text-red-500" to="/products">
              <i className="fa fa-shop"></i>
              <span>Quay lại cửa hàng</span>
            </Link>
            <Link className="flex items-center gap-2 self-start py-2 hover:text-red-500" to="/cart">
              <i className="fa fa-cart-shopping"></i>
              <span>Quay lại giỏ hàng</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(CheckoutPage);
