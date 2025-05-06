import React, { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, pending, accepted, shipping, delivered, cancelled
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);

  const toggleMenu = (orderId) => {
    setOpenMenuId(openMenuId === orderId ? null : orderId);
  };

  const closeMenu = () => {
    setOpenMenuId(null);
  };

  // Fetch dữ liệu từ API thực tế
  useEffect(() => {
    setLoading(true);
    fetch("/api/orders")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setLoading(false);
      });
  }, []);

  // Lọc orders theo trạng thái và tìm kiếm
  const filteredOrders = orders
    .filter((order) => filter === "all" || order.status === filter)
    .filter(
      (order) =>
        searchQuery === "" ||
        order.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shippingAddress.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

  // Hiển thị trạng thái đơn hàng
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-gray-100 text-gray-800",
      accepted: "bg-blue-100 text-blue-800",
      shipping: "bg-yellow-100 text-yellow-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };

    const statusText = {
      pending: "Chờ xử lý",
      accepted: "Đã xác nhận",
      shipping: "Đang giao hàng",
      delivered: "Đã giao hàng",
      cancelled: "Đã hủy",
    };

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]}`}
      >
        {statusText[status]}
      </span>
    );
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  // Xử lý thay đổi trạng thái đơn hàng
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      })
    );
  };

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Quản lý đơn hàng</h1>
        <p className="text-sm text-gray-500">Dashboard / Orders</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar */}
        <div className="w-full rounded-lg bg-white p-4 shadow md:sticky md:top-6 md:w-1/4 md:self-start">
          <div className="mt-1 rounded-lg bg-blue-50 p-4">
            <h4 className="font-medium text-blue-800">Thống kê nhanh</h4>
            <div className="mt-2 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Tổng đơn hàng:</span>
                <span className="font-bold">{orders.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Chờ xử lý:</span>
                <span className="font-bold">
                  {orders.filter((o) => o.status === "pending").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Đang giao:</span>
                <span className="font-bold">
                  {orders.filter((o) => o.status === "shipping").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Đã giao:</span>
                <span className="font-bold">
                  {orders.filter((o) => o.status === "delivered").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Đã hủy:</span>
                <span className="font-bold">
                  {orders.filter((o) => o.status === "cancelled").length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col gap-4">
            <div className="flex flex-col justify-between gap-4 md:flex-row">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:w-64"
                  placeholder="Tìm theo mã đơn, tên khách hàng..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex overflow-x-auto border-b">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-sm ${filter === "all" ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"}`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 text-sm ${filter === "pending" ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"}`}
              >
                Chờ xử lý
              </button>
              <button
                onClick={() => setFilter("shipping")}
                className={`px-4 py-2 text-sm ${filter === "shipping" ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"}`}
              >
                Đang giao
              </button>
              <button
                onClick={() => setFilter("delivered")}
                className={`px-4 py-2 text-sm ${filter === "delivered" ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"}`}
              >
                Đã giao
              </button>
              <button
                onClick={() => setFilter("cancelled")}
                className={`px-4 py-2 text-sm ${filter === "cancelled" ? "border-b-2 border-blue-500 font-medium text-blue-600" : "text-gray-500"}`}
              >
                Đã hủy
              </button>
            </div>
          </div>

          {/* Orders table */}
          {!loading && filteredOrders.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg bg-white shadow">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Mã đơn
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Ngày đặt
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Khách hàng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Tổng tiền
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Trạng thái
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Thanh toán
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-blue-600">
                        {order.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.shippingAddress.name}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        {order.items
                          .reduce(
                            (acc, curr) => acc + curr.price * curr.quantity,
                            0
                          )
                          .toLocaleString("vi-VN")}{" "}
                        đ
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {order.paymentMethod}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => handleViewOrder(order)}
                          >
                            Xem
                          </button>
                          {order.status === "processing" && (
                            <div className="relative">
                              <button
                                className="text-gray-600 hover:text-gray-900"
                                onClick={() => toggleMenu(order.id)}
                              >
                                Trạng thái ▾
                              </button>
                              {openMenuId === order.id && (
                                <div
                                  className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg"
                                  onMouseLeave={closeMenu}
                                >
                                  <div className="py-1">
                                    <button
                                      onClick={() =>
                                        handleStatusChange(order.id, "shipped")
                                      }
                                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Xác nhận
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleStatusChange(order.id, "canceled")
                                      }
                                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                      Hủy
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && filteredOrders.length > 0 && (
            <div className="mt-6 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
              <div className="flex flex-1 justify-between sm:hidden">
                <a
                  href="#"
                  className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Trước
                </a>
                <a
                  href="#"
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Tiếp
                </a>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Hiển thị <span className="font-medium">1</span> đến{" "}
                    <span className="font-medium">{filteredOrders.length}</span>{" "}
                    của{" "}
                    <span className="font-medium">{filteredOrders.length}</span>{" "}
                    đơn hàng
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Trước</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-current="page"
                      className="relative z-10 inline-flex items-center bg-blue-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      1
                    </a>
                    <a
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Tiếp</span>
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Chi tiết đơn hàng</h2>
            <p className="mb-2 text-sm text-gray-600">
              Mã đơn: <span className="font-medium">{selectedOrder.id}</span>
            </p>
            <p className="mb-4 text-sm text-gray-600">
              Khách hàng:{" "}
              <span className="font-medium">{selectedOrder.customer}</span>
            </p>
            <table className="w-full table-auto border-collapse border border-gray-200">
              <thead>
                <tr>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Sản phẩm
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Số lượng
                  </th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-600">
                    Giá
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {item.name}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {item.quantity}
                    </td>
                    <td className="border border-gray-200 px-4 py-2 text-sm">
                      {item.price.toLocaleString("vi-VN")} đ
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end">
              <button
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={() => setIsModalOpen(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
