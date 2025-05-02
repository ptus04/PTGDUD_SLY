import { useCallback } from "react";
import { useNavigate } from "react-router";

const useProductQuery = () => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const query = new FormData(e.currentTarget).get("query") as string;
      if (!query.trim()) {
        return;
      }

      navigate(`/products?query=${encodeURIComponent(query)}`);
    },
    [navigate],
  );

  return handleSubmit;
};

export default useProductQuery;
