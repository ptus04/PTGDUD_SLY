import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  // Fetch data from API
  useEffect(() => {
    fetch("https://res.cloudinary.com/dqyqckhcd/raw/upload/product.json")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-sm text-gray-500">Home / Shop</p>
      </div>

      <div className="flex flex-col gap-6 md:flex-row">
        {/* Sidebar */}
        <div className="w-full rounded-lg bg-white p-4 shadow md:w-1/4">
          <h3 className="mb-4 text-lg font-semibold">Product Categories</h3>
          <ul className="space-y-2">
            {[
              { name: "Women's Bag", count: 15 },
              { name: "Men's Accessories", count: 20 },
              { name: "School Bag", count: 33 },
              { name: "Boots", count: 40 },
              { name: "Boy's Dress", count: 44 },
              { name: "Women's Fashion", count: 50 },
              { name: "Fashion Accessories", count: 33 },
              { name: "Leather Bags", count: 31 },
              { name: "Makeup Corner", count: 25 },
            ].map((category, index) => (
              <li
                key={index}
                className="flex justify-between text-sm text-gray-700"
              >
                <span>{category.name}</span>
                <span>({category.count})</span>
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-6 text-lg font-semibold">Price Range</h3>
          <div>
            <p className="text-sm text-gray-500">Range: $100 - $300</p>
            <input type="range" min="100" max="300" className="mt-2 w-full" />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Filter */}
          <div className="mb-6 flex flex-col items-center justify-between md:flex-row">
            <div className="flex w-full items-center space-x-4 md:w-auto">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 md:w-64"
              />
              <p className="text-sm text-gray-500">
                Showing 1–8 of {products.length} results
              </p>
            </div>
            <div className="mt-4 flex items-center space-x-4 md:mt-0">
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                Top Rated
              </button>
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                Popular
              </button>
              <button className="rounded-lg bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200">
                Newest
              </button>
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                Upload Product
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative rounded-lg bg-white p-4 shadow transition hover:shadow-lg"
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
                <h3 className="mt-4 text-sm font-semibold">{product.name}</h3>

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

                {/* Add to Cart Button */}
                {!product.soldOut && (
                  <button className="mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                    Add to Cart
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
