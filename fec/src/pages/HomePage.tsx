import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useCallback, useEffect, useState } from "react";
import FeaturedCarousel from "../components/FeaturedCarousel";
import Loading from "../components/Loading";
import ProductCard from "../components/ProductCard";
import RenderIf from "../components/RenderIf";
import useStore from "../store/useStore";

const HomePage = () => {
  const { dispatch } = useStore();
  const [products, setProducts] = useState<ProductWithIdString[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/api/products/?isNew=true", { signal });
        const products: ProductWithIdString[] = await res.json();

        setProducts(products);
      } catch (error) {
        if (!(error instanceof DOMException)) {
          dispatch({ type: "SET_ERROR", payload: (error as Error).message });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);

    return () => controller.abort();
  }, [loadProducts]);

  return (
    <>
      <FeaturedCarousel />

      <RenderIf condition={!!products.length}>
        <main className="container mx-auto px-3 pt-5">
          <h1 className="text-2xl">Sản phẩm mới</h1>
          <Loading isLoading={isLoading} />
          <div className="flex flex-wrap">{products?.map((p) => <ProductCard key={p._id} product={p} />)}</div>
        </main>
      </RenderIf>
    </>
  );
};

export default memo(HomePage);
