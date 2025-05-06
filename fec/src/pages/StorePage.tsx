import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import BreadCrumbs from "../components/BreadCrumbs";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";
import RenderIf from "../components/RenderIf";
import usePagination from "../hooks/usePagination";
import useProductsSort from "../hooks/useProductsSort";
import useStore from "../store/useStore";

const StorePage = () => {
  const [params] = useSearchParams();
  const { dispatch } = useStore();
  const [products, setProducts] = useState<ProductWithIdString[]>([]);
  const handleProductsSortSubmit = useProductsSort(products, setProducts);
  const { pages, currentPage, paginatedProducts, handlePageChange } = usePagination<ProductWithIdString>(products, 12);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = useCallback(
    async (signal: AbortSignal) => {
      try {
        const categoryStr = params.get("category") ?? "";
        const queryStr = params.get("query") ?? "";
        const limitStr = params.get("limit") ?? "150";

        const category = categoryStr ? `&category=${categoryStr}` : "";
        const query = queryStr ? `&query=${queryStr}` : "";
        const limit = `&limit=${limitStr}`;
        const res = await fetch(`/api/products/?${category}${query}${limit}`, { signal });
        if (!res.ok) {
          setProducts([]);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch, params],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(controller.signal);

    return () => controller.abort();
  }, [fetchProducts]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <BreadCrumbs />

      <div>
        <p className="text-sm text-gray-500">Đã tìm thấy {products.length} sản phẩm</p>
        <form className="flex gap-3" onSubmit={handleProductsSortSubmit}>
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

      <Loading isLoading={isLoading} />

      <RenderIf condition={!isLoading && products.length === 0}>
        <div className="flex h-96 items-center justify-center gap-2 text-2xl text-red-500">
          <i className="fa fa-exclamation-circle"></i>
          <span>Không có sản phẩm nào.</span>
        </div>
      </RenderIf>

      <RenderIf condition={products.length > 0}>
        <Pagination className="w-fit" pages={pages} currentPage={currentPage} handlePageChange={handlePageChange} />
        <div className="flex flex-wrap">
          {paginatedProducts.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
        <Pagination pages={pages} currentPage={currentPage} handlePageChange={handlePageChange} />
      </RenderIf>
    </main>
  );
};

export default memo(StorePage);
