import { useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const useProductQuery = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const queryStr = formData.get("query") as string;
      if (queryStr.trim() === "") {
        return;
      }

      const category = params.get("category") ? `&category=${params.get("category")}` : "";
      const query = `&query=${encodeURIComponent(queryStr)}`;
      const limit = params.get("limit") ? `&limit=${params.get("limit")}` : "";
      navigate(`/products/?${category}${query}${limit}`);
    },
    [navigate, params],
  );

  return handleSubmit;
};

export default useProductQuery;
