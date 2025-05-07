import { memo, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BreadCrumbs from "../components/BreadCrumbs";
import RenderIf from "../components/RenderIf";
import Loading from "../components/Loading";
import { OrderWithIdString } from "@be/src/models/Order.model";
import { formatAsCurrency, formatAsDate } from "../utils/formatters";

const statusMap = {
  pending: "Đang chờ xác nhận",
  accepted: "Người bán đã xác nhận",
  shipping: "Đang giao hàng",
  delivered: "Đã giao hàng",
  cancelled: "Đã hủy",
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState<OrderWithIdString[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = useCallback(async (signal: AbortSignal) => {
    try {
      const response = await fetch("/api/orders", { signal });
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchOrders(controller.signal);

    return () => controller.abort();
  }, [fetchOrders]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <BreadCrumbs />

      <h1 className="text-center text-3xl font-bold">Lịch sử mua hàng</h1>
      <table className="w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">Mã đơn</th>
            <th className="px-4 py-2 text-right">Ngày đặt hàng</th>
            <th className="px-4 py-2 text-right">Ngày nhận hàng</th>
            <th className="px-4 py-2 text-right">Trạng thái</th>
            <th className="px-4 py-2 text-right">Tổng</th>
            <th className="px-4 py-2 text-right">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <RenderIf condition={!orders.length}>
            <tr>
              <td colSpan={7} className="text-center">
                <Loading isLoading={isLoading} />
                <RenderIf condition={!isLoading}>
                  <span className="text-gray-500">Chưa có đơn hàng nào</span>
                </RenderIf>
              </td>
            </tr>
          </RenderIf>

          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-300">
              <td className="px-4 py-2 text-left">{order._id}</td>
              <td className="px-4 py-2 text-right">{formatAsDate(order.createdAt)}</td>
              <td className="px-4 py-2 text-right">
                {order.status === "delivered" ? formatAsDate(order.updatedAt) : "Chưa nhận"}
              </td>
              <td className="px-4 py-2">{statusMap[order.status]}</td>
              <td className="px-4 py-2 text-right">
                {formatAsCurrency(order.items.reduce((total, item) => total + item.price * item.quantity, 0))}
              </td>
              <td className="px-4 py-2">
                <Link
                  to={`/user/order-history/${order._id}`}
                  className="flex items-center justify-end gap-2 hover:text-red-500"
                >
                  <i className="fa fa-eye"></i>
                  <span>Xem chi tiết</span>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link className="flex items-center gap-2 self-start py-2 hover:text-red-500" to="/user">
        <i className="fa fa-user"></i>
        <span>Quay lại thông tin tài khoản</span>
      </Link>
    </main>
  );
};

export default memo(OrderHistoryPage);
