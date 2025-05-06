import { OrderWithIdString } from "@be/src/models/Order.model";
import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import BreadCrumbs from "../components/BreadCrumbs";
import Button from "../components/Button";
import Loading from "../components/Loading";
import useStore from "../store/useStore";
import { formatAsCurrency, formatAsDate } from "../utils/formatters";

const statusMap = {
  pending: "Đang chờ xác nhận",
  accepted: "Người bán đã xác nhận",
  shipping: "Đang giao hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const paymentMethodMap = {
  cash: "Thanh toán khi nhận hàng",
  momo: "Thanh toán qua Momo",
  bank: "Chuyển khoản ngân hàng",
};

const OrderPage = () => {
  const params = useParams();
  const { state } = useStore();
  const [order, setOrder] = useState<OrderWithIdString | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const handleCancelOrder = useCallback(async () => {
    if (!order) return;
    const orderId = order._id;
    const response = await fetch(`/api/orders`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ orderId, reason: "Khách hàng hủy đơn hàng" }),
    });
    if (response.ok) {
      setOrder((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
    } else {
      console.error("Failed to cancel order");
    }
  }, [order]);

  const fetchOrder = useCallback(
    async (signal: AbortSignal) => {
      const orderId = params["id"];
      const response = await fetch(`/api/orders/${orderId}`, { signal });
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        console.error("Failed to fetch order data");
      }
    },
    [params],
  );

  const fetchProduct = useCallback(async (productId: string, signal: AbortSignal) => {
    const response = await fetch(`/api/products/${productId}`, { signal });
    return (await response.json()) as ProductWithIdString;
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    fetchOrder(abortController.signal);
  }, [fetchOrder]);

  useEffect(() => {
    if (!order || !isLoading) {
      return;
    }

    const controllers: AbortController[] = [];
    const fecths: Promise<ProductWithIdString>[] = [];
    for (const item of order.items) {
      controllers.push(new AbortController());
      fecths.push(fetchProduct(item.productId, controllers[controllers.length - 1].signal));
    }
    Promise.all(fecths)
      .then((result) => {
        setOrder((prev) => {
          if (!prev) return prev;

          return {
            ...prev,
            items: prev.items.map((item, index) => ({
              ...item,
              image: result[index].images[0],
              title: result[index].title,
            })),
          };
        });
      })
      .finally(() => setIsLoading(false));
  }, [fetchProduct, order, isLoading]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <BreadCrumbs order={order} />
      <Loading isLoading={isLoading} />

      <div className="flex flex-col gap-3">
        <h1 className="text-center text-3xl font-bold">Thông tin chi tiết đơn hàng: {order?._id}</h1>
        <div>
          <div className="flex flex-row">
            <p className="mb-0 flex-1">
              Họ và Tên: <span className="fw-bold font-bold">{order?.shippingAddress.name}</span>
            </p>
            <p className="mb-0 flex-1">
              Giới tính: <span>{state.user?.gender ? "Nữ" : "Nam"}</span>
            </p>
            <p className="mb-0 flex-1">
              Ngày sinh: <span>{formatAsDate(state.user?.dateOfBirth ?? "")}</span>
            </p>
          </div>
          <div className="flex flex-row flex-wrap">
            <p className="mb-0 flex-1">
              Số điện thoại: <span className="fw-bold font-bold">{order?.shippingAddress.phone}</span>
            </p>
          </div>
          <div className="flex flex-row flex-wrap">
            <p className="mb-0 flex-1">
              Thành phố/Tỉnh: <span className="fw-bold font-bold">{order?.shippingAddress.city}</span>
            </p>
            <p className="mb-0 flex-1">
              Quận/Huyện: <span className="fw-bold font-bold">{order?.shippingAddress.district}</span>
            </p>
            <p className="mb-0 flex-1">
              Phường/Xã: <span className="fw-bold font-bold">{order?.shippingAddress.ward}</span>
            </p>
          </div>
          <p className="mb-0 flex-1">
            Địa chỉ: <span className="fw-bold font-bold">{order?.shippingAddress.address}</span>
          </p>
        </div>

        <div>
          <div className="flex flex-row flex-wrap">
            <p className="mb-0 flex-1">
              Mã đơn hàng: <span className="fw-bold font-bold">{order?._id}</span>
            </p>
            <p className="mb-0 flex-1">
              Trạng thái: <span className="fw-bold font-bold">{statusMap[order?.status ?? "pending"]}</span>
            </p>
          </div>
          <div className="flex flex-row flex-wrap">
            <p className="mb-0 flex-1">
              Ngày đặt hàng: <span>{formatAsDate(order?.createdAt ?? "")}</span>
            </p>
            <p className="mb-0 flex-1">
              Ngày nhận hàng: <span>{formatAsDate(order?.updatedAt ?? "")}</span>
            </p>
          </div>
          <p className="mb-0 flex-1">
            Phương thức thanh toán: <span>{paymentMethodMap[order?.paymentMethod ?? "cash"]}</span>
          </p>
          <p className="mb-0 flex-1">
            Ghi chú: <span>{order?.note}</span>
          </p>
        </div>

        <table className="divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Sản phẩm</th>
              <th className="px-4 py-2 text-right">Số lượng</th>
              <th className="px-4 py-2 text-right">Đơn giá</th>
              <th className="px-4 py-2 text-right">Thành tiền</th>
            </tr>
          </thead>
          <tbody className="align-middle">
            {order?.items.map((item) => (
              <tr key={item.productId + item.size}>
                <td className="flex flex-row items-center gap-2">
                  <img src={`/img/${item.image}`} loading="lazy" alt={item.image} className="w-[10vw] lg:w-[7vw]" />
                  {item.title} {item.size ? "(" + item.size + ")" : ""}
                </td>
                <td className="text-right">{item.quantity}</td>
                <td className="text-right font-bold">{formatAsCurrency(item.price)}</td>
                <td className="text-right font-bold">{formatAsCurrency(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-row items-center justify-between">
          <Link className="flex items-center justify-end gap-2 hover:text-red-500" to="/order-history">
            <i className="fa fa-history"></i>
            <span>Lịch sử mua hàng</span>
          </Link>
          <Button preset="secondary" type="button" disabled={order?.status !== "pending"} onClick={handleCancelOrder}>
            <i className="fa fa-cancel"></i> Hủy đơn hàng
          </Button>
        </div>
      </div>
    </main>
  );
};

export default memo(OrderPage);
