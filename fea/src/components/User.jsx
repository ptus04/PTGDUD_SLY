import React, { useEffect, useState } from "react";

function User() {
  const [users, setUsers] = useState([]); // State lưu danh sách người dùng
  const [searchTerm, setSearchTerm] = useState(""); // State lưu từ khóa tìm kiếm
  const [selectAll, setSelectAll] = useState(false); // State lưu trạng thái checkbox "Chọn tất cả"
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State quản lý trạng thái modal thêm user
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State quản lý trạng thái modal sửa user
  const [editingUser, setEditingUser] = useState(null); // State lưu thông tin người dùng đang sửa
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    phone: "",
    gender: true,
    address: "",
    city: "",
    district: "",
    ward: "",
    dateOfBirth: "",
    role: "customer",
  }); // State lưu thông tin người dùng mới

  // Lấy dữ liệu từ localStorage hoặc API
  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      fetch("/api/users")
        .then((response) => response.json())
        .then((data) => {
          const usersWithSelection = data.map((userFromApi) => {
            let resolvedId;
            // Check if _id is an object with $oid, otherwise use _id directly
            if (
              userFromApi._id &&
              typeof userFromApi._id === "object" &&
              userFromApi._id.$oid
            ) {
              resolvedId = userFromApi._id.$oid;
            } else {
              resolvedId = userFromApi._id;
            }

            return {
              ...userFromApi, // Spread all properties from the API user object
              id: resolvedId, // Set our consistent 'id' field
              isSelected: false, // Default isSelected to false
              // Handle potential nested date objects safely
              createdAt:
                (
                  userFromApi.createdAt &&
                  typeof userFromApi.createdAt === "object" &&
                  userFromApi.createdAt.$date
                ) ?
                  userFromApi.createdAt.$date
                : userFromApi.createdAt,
              updatedAt:
                (
                  userFromApi.updatedAt &&
                  typeof userFromApi.updatedAt === "object" &&
                  userFromApi.updatedAt.$date
                ) ?
                  userFromApi.updatedAt.$date
                : userFromApi.updatedAt,
            };
          });
          setUsers(usersWithSelection);
          localStorage.setItem("users", JSON.stringify(usersWithSelection));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  // Lọc người dùng dựa trên từ khóa tìm kiếm
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      user.id === id ? { ...user, isSelected: !user.isSelected } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Xử lý xóa người dùng
  const handleDeleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  // Mở modal thêm user
  const openAddModal = () => {
    setNewUser({
      id: Date.now(), // Tạo ID duy nhất
      name: "",
      phone: "",
      gender: true,
      address: "",
      city: "",
      district: "",
      ward: "",
      dateOfBirth: "",
      role: "customer",
    });
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm user
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  // Mở modal sửa user
  const openEditModal = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Đóng modal sửa user
  const closeEditModal = () => {
    setEditingUser(null);
    setIsEditModalOpen(false);
  };

  // Xử lý thay đổi input trong modal sửa user
  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Lưu user mới
  const saveNewUser = () => {
    setUsers([...users, newUser]);
    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    closeAddModal();
  };

  // Lưu user đã sửa
  const saveEditedUser = () => {
    if (!editingUser) return;
    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? editingUser : user
    );
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    closeEditModal();
  };

  // Hiển thị trạng thái loading nếu chưa có dữ liệu
  if (!users || users.length === 0) {
    return <div className="p-6 text-center text-gray-500">Loading...</div>;
  }

  return (
    <div>
      {/* Nội dung chính */}
      <div
        className={`${isAddModalOpen || isEditModalOpen ? "blur-sm" : ""} bg-gray-50 p-6`}
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
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Birth</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id} // Use user.id as the key for consistency
                  className="border-t text-sm text-gray-700 hover:bg-gray-50"
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">
                    {user.gender ? "Male" : "Female"}
                  </td>
                  <td className="px-4 py-2">
                    {user.address}, {user.ward}, {user.district}, {user.city}
                  </td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.dateOfBirth}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="rounded-lg bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal thêm người dùng */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md max-h-screen overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Add User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveNewUser();
              }}
            >
              {/* Tên người dùng */}
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
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Số điện thoại */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Giới tính */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={newUser.gender}
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      gender: e.target.value === "true",
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>

              {/* Địa chỉ */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={newUser.address}
                  onChange={(e) =>
                    setNewUser({ ...newUser, address: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Thành phố */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  value={newUser.city}
                  onChange={(e) =>
                    setNewUser({ ...newUser, city: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quận */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  value={newUser.district}
                  onChange={(e) =>
                    setNewUser({ ...newUser, district: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phường */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ward
                </label>
                <input
                  type="text"
                  value={newUser.ward}
                  onChange={(e) =>
                    setNewUser({ ...newUser, ward: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ngày sinh */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={newUser.dateOfBirth}
                  onChange={(e) =>
                    setNewUser({ ...newUser, dateOfBirth: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Vai trò */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) =>
                    setNewUser({ ...newUser, role: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Nút thêm */}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Add User
              </button>
            </form>
            <button
              onClick={closeAddModal}
              className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal sửa người dùng */}
      {isEditModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md max-h-screen overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveEditedUser();
              }}
            >
              {/* Tên người dùng */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Số điện thoại */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={editingUser.phone}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Giới tính */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={editingUser.gender}
                  onChange={(e) =>
                    setEditingUser({
                      ...editingUser,
                      gender: e.target.value === "true",
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="true">Male</option>
                  <option value="false">Female</option>
                </select>
              </div>

              {/* Địa chỉ */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={editingUser.address || ""}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Thành phố */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={editingUser.city || ""}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quận */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  District
                </label>
                <input
                  type="text"
                  name="district"
                  value={editingUser.district || ""}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phường */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ward
                </label>
                <input
                  type="text"
                  name="ward"
                  value={editingUser.ward || ""}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Ngày sinh */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={
                    editingUser.dateOfBirth ?
                      new Date(editingUser.dateOfBirth)
                        .toISOString()
                        .split("T")[0]
                    : ""
                  }
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Vai trò */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditInputChange}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Nút lưu */}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
            <button
              onClick={closeEditModal}
              className="mt-4 w-full rounded-lg bg-gray-300 px-4 py-2 text-sm text-black hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default User;
