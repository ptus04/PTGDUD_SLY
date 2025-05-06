import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // Modal thêm sản phẩm
  const [editingProduct, setEditingProduct] = useState(null);
  const [newProduct, setNewProduct] = useState({
    _id: "",
    category: [],
    title: "",
    price: 0,
    images: [],
    size: [],
    description: [],
    careInstructions: [],
    inStock: 0,
  });
  const [currentPage, setCurrentPage] = useState(1); // State cho trang hiện tại
  const itemsPerPage = 12; // Số sản phẩm mỗi trang

  // Tính toán số trang
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Lấy danh sách sản phẩm cho trang hiện tại
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Hàm chuyển trang
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Lấy dữ liệu từ API hoặc localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setSortedProducts(parsedProducts);

      // Tính toán giá trị minPrice và maxPrice từ dữ liệu localStorage
      const prices = parsedProducts.map((product) => product.price);
      const min = Math.floor(Math.min(...prices) / 10000) * 10000; // Làm tròn xuống
      const max = Math.ceil(Math.max(...prices) / 10000) * 10000; // Làm tròn lên
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    } else {
      const apiUrl = "/api/products?limit=1000"; // Đảm bảo tham số limit được truyền đúng
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data); // Ghi log phản hồi API để kiểm tra
          if (data.length < 10) {
            console.warn("API returned fewer products than expected.");
          }
          setProducts(data);
          setSortedProducts(data);

          // Tính toán giá trị minPrice và maxPrice từ dữ liệu API
          const prices = data.map((product) => product.price);
          const min = Math.floor(Math.min(...prices) / 10000) * 10000; // Làm tròn xuống
          const max = Math.ceil(Math.max(...prices) / 10000) * 10000; // Làm tròn lên
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);

          localStorage.setItem("products", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, []);

  // Lưu dữ liệu vào localStorage mỗi khi `products` thay đổi
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setSortedProducts(filtered);
  }, [searchTerm, products]);

  // Hàm xử lý thay đổi giá trị thanh trượt và đảm bảo min không vượt quá max
  const handlePriceRangeChange = (newRange) => {
    const [newMin, newMax] = newRange;
    if (newMin <= newMax) {
      setPriceRange(newRange);
      const filtered = products.filter(
        (product) => product.price >= newMin && product.price <= newMax,
      );
      setSortedProducts(filtered);
    }
  };

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm và Price Range
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  // Sự kiện sắp xếp theo giá (Cost)
  const sortByCost = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  // Sự kiện sắp xếp theo thời gian cập nhật gần nhất (Newest)
  const sortByNewest = () => {
    const sorted = [...products].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt),
    );
    setSortedProducts(sorted);
  };

  // Hàm thêm sản phẩm mới
  const addNewProduct = (newProduct) => {
    const timestamp = new Date().toISOString(); // Lấy thời gian hiện tại
    const productWithTimestamps = {
      ...newProduct,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    const updatedProducts = [...products, productWithTimestamps];
    setProducts(updatedProducts);
    setSortedProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Hàm cập nhật sản phẩm
  const updateProduct = (updatedProduct) => {
    const timestamp = new Date().toISOString(); // Lấy thời gian hiện tại
    const updatedProducts = products.map((product) =>
      product._id === updatedProduct._id
        ? { ...updatedProduct, updatedAt: timestamp }
        : product,
    );
    setProducts(updatedProducts);
    setSortedProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Mở modal chỉnh sửa sản phẩm
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  // Đóng modal chỉnh sửa sản phẩm
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  // Mở modal thêm sản phẩm
  const openAddModal = () => {
    setNewProduct({
      id: Date.now(),
      name: "",
      price: 0,
      oldPrice: 0,
      discount: 0,
      soldOut: false,
      image: "",
    });
    setIsAddModalOpen(true);
  };

  // Đóng modal thêm sản phẩm
  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-sm text-gray-500">Admin / Products</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar */}
        <div className="w-full rounded-lg bg-white p-4 shadow md:w-1/4">
          <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
          <div>
            <p className="text-sm text-gray-500">
              Range: {priceRange[0].toLocaleString("vi-VN")} đ -{" "}
              {priceRange[1].toLocaleString("vi-VN")} đ
            </p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step="10000"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceRangeChange([Number(e.target.value), priceRange[1]])
              }
              className="mt-2 w-full"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step="10000"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceRangeChange([priceRange[0], Number(e.target.value)])
              }
              className="mt-2 w-full"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
            <div className="flex w-full items-center space-x-4 md:w-auto">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64"
              />
              <p className="text-sm text-gray-500">
                Showing {filteredProducts.length} of {products.length} results
              </p>
            </div>
            <div className="mt-4 flex w-full space-x-4 md:mt-0">
              <button
                onClick={sortByCost}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
              >
                Cost
              </button>
              <button
                onClick={sortByNewest}
                className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
              >
                Newest
              </button>
              <button
                onClick={openAddModal}
                className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Add Product
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {currentProducts.map((product) => (
              <div
                key={product._id}
                className="relative flex flex-col justify-between rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
              >
                {/* Hình ảnh sản phẩm */}
                <img
                  src={
                    Array.isArray(product.images) && product.images[0]
                      ? `img/${product.images[0]}`
                      : "img/default-image.webp"
                  } // Kiểm tra và sử dụng hình ảnh mặc định nếu không có hình ảnh
                  alt={product.title || "No Title"} // Kiểm tra tiêu đề
                  className="h-40 w-full rounded-lg object-cover"
                />

                {/* Tên sản phẩm */}
                <h3 className="mt-4 line-clamp-2 h-10 text-sm font-semibold">
                  {product.title || "Untitled Product"}
                </h3>

                {/* Giá sản phẩm */}
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-lg font-bold text-red-500">
                    {product.price
                      ? product.price.toLocaleString("vi-VN") + " đ"
                      : "Price not available"}{" "}
                  </span>
                </div>

                {/* Tồn kho */}
                <p className="mt-2 text-sm text-gray-500">
                  In Stock: {product.inStock || 0}
                </p>

                {/* Danh mục */}
                <p className="mt-2 text-sm text-gray-500">
                  Categories:{" "}
                  {Array.isArray(product.category)
                    ? product.category.join(", ")
                    : "No categories"}{" "}
                </p>

                {/* Nút chỉnh sửa */}
                <button
                  onClick={() => handleEditProduct(product)}
                  className="mt-4 w-full rounded-lg bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
                >
                  Edit Product
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded px-4 py-2 text-sm ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="rounded bg-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Edit Product</h2>
            {editingProduct && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updateProduct(editingProduct);
                  closeModal();
                }}
              >
                {/* Tên sản phẩm */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editingProduct.title}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        title: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Giá sản phẩm */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Price
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Tồn kho */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    In Stock
                  </label>
                  <input
                    type="number"
                    value={editingProduct.inStock}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        inStock: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Danh mục */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Categories
                  </label>
                  <input
                    type="text"
                    value={editingProduct.category.join(", ")}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        category: e.target.value
                          .split(",")
                          .map((cat) => cat.trim()),
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Nút lưu */}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Save Changes
                </button>
              </form>
            )}
            <button
              onClick={closeModal}
              className="mt-4 w-full rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal thêm sản phẩm */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Add Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNewProduct(newProduct);
                closeAddModal();
              }}
            >
              {/* Tên sản phẩm */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, title: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Giá sản phẩm */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Tồn kho */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  In Stock
                </label>
                <input
                  type="number"
                  value={newProduct.inStock}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      inStock: Number(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Danh mục */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Categories
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(newProduct.category)
                      ? newProduct.category.join(", ")
                      : ""
                  }
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      category: e.target.value
                        .split(",")
                        .map((cat) => cat.trim()),
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Nút lưu */}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
              >
                Add Product
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
    </div>
  );
}

export default Product;
