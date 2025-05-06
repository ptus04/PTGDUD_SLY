import { ProductWithIdString } from "@be/src/models/Product.model";
import { useCallback } from "react";

const useProductsSort = (
  products: ProductWithIdString[],
  setProducts: React.Dispatch<React.SetStateAction<ProductWithIdString[]>>,
) => {
  const handleProductsSortSubmit = useCallback(
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
    [products, setProducts],
  );

  return handleProductsSortSubmit;
};

export default useProductsSort;
