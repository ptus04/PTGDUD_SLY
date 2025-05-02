import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import usePagination from "../hooks/usePagination";
import useStore from "../store/useStore";

const ProductsPage = () => {
  const { dispatch } = useStore();
  const [products, setProducts] = useState<ProductWithIdString[]>([]);
  const { pages, currentPage, paginatedProducts, handlePageChange } = usePagination<ProductWithIdString>(products, 12);

  const handleSortSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const sortBy = formData.get("sortBy") as string;
      const sortedProducts = [...products];

      switch (sortBy) {
        case "0":
          sortedProducts.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
          break;
        case "1":
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case "2":
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case "3":
          sortedProducts.sort((a, b) => (a.discount ?? 0) - (b.discount ?? 0));
          break;
        case "4":
          sortedProducts.sort((a, b) => (b.discount ?? 0) - (a.discount ?? 0));
          break;
        default:
          break;
      }

      setProducts(sortedProducts);
    },
    [products],
  );

  const fetchProducts = useCallback(async () => {
    try {
      const response = await fetch("/api/products?limit=100");
      if (!response.ok) {
        throw new Error("Có lỗi xảy ra khi tải sản phẩm");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="container mx-auto gap-4 p-4">
      {/* Breadcrumbs navigation */}
      <nav className="text-sm text-gray-500">
        <ol className="flex gap-1">
          <li>
            <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/products">Cửa hàng</NavLink>
          </li>
        </ol>
      </nav>

      <div>
        <p className="text-sm text-gray-500">Đã tìm thấy {products.length} sản phẩm</p>
        <form className="flex gap-3" onSubmit={handleSortSubmit}>
          <div className="flex grow items-center justify-end gap-2">
            <label htmlFor="sortBy">Sắp xếp</label>
            <select
              className="rounded-md border border-gray-300 px-3 py-1 hover:border-red-500 focus:outline-red-500"
              name="sortBy"
              id="sortBy"
            >
              <option value="0">Mới nhất</option>
              <option value="1">Giá: tăng dần</option>
              <option value="2">Giá: giảm dần</option>
              <option value="3">Giảm giá: tăng dần</option>
              <option value="4">Giảm giá: giảm dần</option>
            </select>
          </div>
          <div>
            <button
              className="flex h-full cursor-pointer items-center gap-2 rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-400 active:bg-red-600"
              type="submit"
            >
              <i className="fa fa-filter"></i>
              <span className="hidden md:inline">Lọc</span>
            </button>
          </div>
        </form>
      </div>
      <Pagination className="w-fit" pages={pages} currentPage={currentPage} handlePageChange={handlePageChange} />
      <div className="flex flex-wrap">
        {paginatedProducts.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      <Pagination pages={pages} currentPage={currentPage} handlePageChange={handlePageChange} />
    </main>
  );
};

export default memo(ProductsPage);
