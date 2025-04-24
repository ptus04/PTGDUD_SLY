import { ProductWithIdString } from "@be/src/models/Product.model";
import { useCallback, useContext, useEffect, useState } from "react";
import AppContext, { AppActionTypes } from "../AppContext";
import ProductCard from "../components/ProductCard";
import RenderIf from "../components/RenderIf";
import FeaturedCarousel from "../components/FeaturedCarousel";

const HomePage = () => {
  const context = useContext(AppContext);
  const [products, setProducts] = useState<ProductWithIdString[]>([]);

  const loadProducts = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/api/products?isNew=true", { signal });
        const products: ProductWithIdString[] = await res.json();

        setProducts(products);
      } catch (error) {
        if (!(error instanceof DOMException)) {
          context.dispatch({ type: AppActionTypes.SET_ERROR, payload: (error as Error).message });
        }
      }
    },
    [context],
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
          <h3 className="text-2xl">Sản phẩm mới</h3>
          <div className="flex flex-wrap">{products?.map((p) => <ProductCard key={p._id} product={p} />)}</div>
        </main>
      </RenderIf>
    </>
  );
};

export default HomePage;
