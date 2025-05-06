import React, { useEffect, useState } from "react";

function User() {
  const [users, setUsers] = useState([]); // State lưu danh sách người dùng
  const [searchTerm, setSearchTerm] = useState(""); // State lưu từ khóa tìm kiếm
  const [selectAll, setSelectAll] = useState(false); // State lưu trạng thái checkbox "Chọn tất cả"
  const [isModalOpen, setIsModalOpen] = useState(false); // State quản lý trạng thái modal chỉnh sửa
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State quản lý trạng thái modal thêm user
  const [editingUser, setEditingUser] = useState(null); // State lưu thông tin người dùng đang chỉnh sửa
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    status: "Inactive",
    avatar: "",
    products: 0,
    totalSell: 0,
    joinOn: new Date().toISOString().split("T")[0], // Ngày hiện tại
  }); // State lưu thông tin người dùng mới

  // Lấy dữ liệu từ localStorage hoặc API
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch(
        "https://res.cloudinary.com/dqyqckhcd/raw/upload/v1746539540/customer.json",
      )
        .then((response) => response.json())
        .then((data) => {
          const usersWithSelection = data.customers.map((user) => ({
            ...user,
            isSelected: false,
          }));
          setUsers(usersWithSelection);
          localStorage.setItem("users", JSON.stringify(usersWithSelection));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  // Lọc người dùng dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Xử lý tick chọn tất cả
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    const updatedUsers = users.map((user) => ({
      ...user,
      isSelected: newSelectAll,
    }));
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Xử lý tick chọn từng người dùng
  const handleSelectUser = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isSelected: !user.isSelected } : user,
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  // Mở modal chỉnh sửa
  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  // Đóng modal chỉnh sửa
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  // Lưu thay đổi người dùng
  const saveUserChanges = () => {
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user,
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    closeModal();
  };

  // Mở modal thêm user
  const openAddModal = () => {
    setNewUser({
      id: Date.now(), // Tạo ID duy nhất
      name: "",
      email: "",
      status: "Inactive",
      avatar: "",
      products: 0,
      totalSell: 0,
      joinOn: new Date().toISOString().split("T")[0], // Ngày hiện tại
    });
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm user
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Lưu user mới
  const saveNewUser = () => {
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    closeAddModal();
  };

  // Hiển thị trạng thái loading nếu chưa có dữ liệu
  if (!users || users.length === 0) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>
      {/* Nội dung chính */}
      <div
        className={`${isModalOpen || isAddModalOpen ? "blur-sm" : ""} bg-gray-50 p-6`}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Users</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={openAddModal}
              className="rounded-lg bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600"
            >
              Add User
            </button>
            <select className="rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="10">Showing 10</option>
              <option value="20">Showing 20</option>
              <option value="50">Showing 50</option>
            </select>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                Search
              </button>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto rounded-lg bg-white shadow">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-4 py-2">Profile</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Products</th>
                <th className="px-4 py-2">Total Sell</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Join On</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={user.isSelected}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-4 py-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.products}</td>
                  <td className="px-4 py-2">{user.totalSell}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.joinOn}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="rounded bg-green-100 p-2 text-green-600 hover:bg-green-200"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="rounded bg-red-100 p-2 text-red-600 hover:bg-red-200"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Edit User
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, name: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">Inactive</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={editingUser.status === "Active"}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        status: e.target.checked ? "Active" : "Inactive",
                      })
                    }
                    className="peer sr-only"
                  />
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
                <span className="text-sm text-gray-700">Active</span>
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveUserChanges}
                className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal thêm user */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Add User
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveNewUser();
              }}
            >
              {/* Tên */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={newUser.name}
                  onChange={(e) =>
                    setNewUser({ ...newUser, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Avatar */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Avatar URL
                </label>
                <input
                  type="text"
                  value={newUser.avatar}
                  onChange={(e) =>
                    setNewUser({ ...newUser, avatar: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser({ ...newUser, status: e.target.value })
                  }
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option value="Inactive">Inactive</option>
                  <option value="Active">Active</option>
                </select>
              </div>

              {/* Nút lưu */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={closeAddModal}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring focus:ring-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
