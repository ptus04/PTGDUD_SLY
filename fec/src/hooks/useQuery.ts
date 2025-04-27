import { useNavigate } from "react-router";

const useQuery = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = new FormData(e.currentTarget).get("query") as string;
    if (!query.trim()) {
      return;
    }

    navigate(`/products?query=${query}`);
  };

  return handleSubmit;
};

export default useQuery;
