import { memo } from "react";
import useNavBar from "../../hooks/useNavBar";
import useQuery from "../../hooks/useQuery";

const NavBarHeader = () => {
  const { handleToggle } = useNavBar();
  const handleSubmit = useQuery();

  return (
    <div className="flex items-center justify-between">
      <form className="flex gap-2" onSubmit={handleSubmit}>
        <button className="cursor-pointer duration-200 hover:text-red-500" type="submit" title="Tìm kiếm">
          <i className="fa fa-search"></i>
        </button>
        <input className="border-b px-3 py-1" type="search" name="query" placeholder="Nhập từ khóa" required />
      </form>
      <button
        className="aspect-square w-6 cursor-pointer duration-200 hover:bg-red-500 hover:text-white"
        type="button"
        title="Đóng menu"
        onClick={handleToggle}
      >
        <i className="fa fa-close"></i>
      </button>
    </div>
  );
};

export default memo(NavBarHeader);
