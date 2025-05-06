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
    id: "",
    name: "",
    price: 0,
    oldPrice: 0,
    discount: 0,
    soldOut: false,
    image: "",
  });

  // Lấy dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
      setSortedProducts(parsedProducts);

      // Tính giá trị biên cho Price Range
      const prices = parsedProducts.map((product) => product.price);
      const min = Math.floor(Math.min(...prices) / 10000) * 10000;
      const max = Math.ceil(Math.max(...prices) / 10000) * 10000;
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    } else {
      // Fetch dữ liệu từ API nếu localStorage không có dữ liệu
      fetch("https://res.cloudinary.com/dqyqckhcd/raw/upload/product.json")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products);
          setSortedProducts(data.products);

          // Tính giá trị biên cho Price Range
          const prices = data.products.map((product) => product.price);
          const min = Math.floor(Math.min(...prices) / 10000) * 10000;
          const max = Math.ceil(Math.max(...prices) / 10000) * 10000;
          setMinPrice(min);
          setMaxPrice(max);
          setPriceRange([min, max]);

          // Lưu dữ liệu vào localStorage
          localStorage.setItem("products", JSON.stringify(data.products));
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

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm và Price Range
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1],
  );

  // Sự kiện sắp xếp theo giá (Cost)
  const sortByCost = () => {
    const sorted = [...products].sort((a, b) => a.price - b.price);
    setSortedProducts(sorted);
  };

  // Sự kiện sắp xếp theo ID (Newest)
  const sortByNewest = () => {
    const sorted = [...products].sort((a, b) => b.id - a.id);
    setSortedProducts(sorted);
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
                setPriceRange([Number(e.target.value), priceRange[1]])
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
                setPriceRange([priceRange[0], Number(e.target.value)])
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
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="relative flex flex-col justify-between rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    -{product.discount}%
                  </div>
                )}

                {/* Sold Out Badge */}
                {product.soldOut && (
                  <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                    HẾT HÀNG
                  </div>
                )}

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full rounded-lg object-cover"
                />

                {/* Product Name */}
                <h3 className="mt-4 line-clamp-2 h-10 text-sm font-semibold">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="mt-2 flex items-center space-x-2">
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.oldPrice.toLocaleString("vi-VN")} đ
                    </span>
                  )}
                  <span className="text-lg font-bold text-red-500">
                    {product.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => handleEditProduct(product)}
                  className="mt-4 w-full rounded-lg bg-yellow-500 px-4 py-2 text-sm text-white hover:bg-yellow-600"
                >
                  Edit Product
                </button>
              </div>
            ))}
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
                  // Lưu thay đổi
                  const updatedProducts = products.map((product) =>
                    product.id === editingProduct.id ? editingProduct : product,
                  );
                  setProducts(updatedProducts);
                  setSortedProducts(updatedProducts);
                  closeModal();
                }}
              >
                {/* Tên sản phẩm */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Giá gốc */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Original Price
                  </label>
                  <input
                    type="number"
                    value={editingProduct.oldPrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        oldPrice: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Discount */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.discount || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        discount: Number(e.target.value),
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Sold Out */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Sold Out
                  </label>
                  <select
                    value={editingProduct.soldOut ? "true" : "false"}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        soldOut: e.target.value === "true",
                      })
                    }
                    className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {/* Link hình ảnh */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProduct.image || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.value,
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
            {/* Nút đóng */}
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
                // Thêm sản phẩm mới vào danh sách
                setProducts([...products, newProduct]);
                setSortedProducts([...products, newProduct]);
                closeAddModal();
              }}
            >
              {/* Tên sản phẩm */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, name: e.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Giá gốc */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Original Price
                </label>
                <input
                  type="number"
                  value={newProduct.oldPrice}
                  onChange={(e) => {
                    const oldPrice = Number(e.target.value);
                    const discount = newProduct.discount;
                    const price = oldPrice - (oldPrice * discount) / 100;
                    setNewProduct({
                      ...newProduct,
                      oldPrice,
                      price: Math.max(price, 0), // Đảm bảo giá không âm
                    });
                  }}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Discount */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Discount (%)
                </label>
                <input
                  type="number"
                  value={newProduct.discount}
                  onChange={(e) => {
                    const discount = Number(e.target.value);
                    const oldPrice = newProduct.oldPrice;
                    const price = oldPrice - (oldPrice * discount) / 100;
                    setNewProduct({
                      ...newProduct,
                      discount,
                      price: Math.max(price, 0), // Đảm bảo giá không âm
                    });
                  }}
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Giá bán */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price (Auto-calculated)
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  readOnly
                  className="mt-1 w-full rounded-lg border bg-gray-100 px-4 py-2 text-sm focus:outline-none"
                />
              </div>

              {/* Sold Out */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Sold Out
                </label>
                <select
                  value={newProduct.soldOut ? "true" : "false"}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      soldOut: e.target.value === "true",
                    })
                  }
                  className="mt-1 w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              {/* Link hình ảnh */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, image: e.target.value })
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
            {/* Nút đóng */}
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
