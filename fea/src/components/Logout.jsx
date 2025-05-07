import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [showConfirm, setShowConfirm] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Chuyển hướng đến Login
  };

  useEffect(() => {
    if (!showConfirm) {
      navigate("/"); // Quay lại Dashboard nếu hủy
    }
  }, [showConfirm, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      {showConfirm && (
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <p className="mb-4 text-lg font-medium text-gray-700">
            Bạn có chắc chắn muốn đăng xuất không?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
              onClick={() => setShowConfirm(false)}
            >
              Hủy
            </button>
            <button
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={handleLogout}
            >
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Logout;
