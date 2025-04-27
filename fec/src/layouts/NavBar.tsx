import { memo } from "react";
import ListCategory from "../components/layouts/ListCategory";
import NavBarFooter from "../components/layouts/NavBarFooter";
import NavBarHeader from "../components/layouts/NavBarHeader";
import useNavBar from "../hooks/useNavBar";

const NavBar = () => {
  const { isOpen, handleUnsafeToggle } = useNavBar();

  return (
    <nav
      className={`fixed top-0 z-30 h-dvh w-full flex-col duration-200 ${isOpen ? "bg-black/50" : "invisible"}`}
      onClickCapture={handleUnsafeToggle}
    >
      <div
        className={`flex h-full w-full flex-col gap-4 overflow-auto bg-white/75 px-4 py-2 backdrop-blur-md duration-200 md:w-2/5 lg:w-1/5 ${isOpen ? "" : "-translate-x-full"}`}
      >
        <NavBarHeader />
        <ListCategory />
        <NavBarFooter />
      </div>
    </nav>
  );
};

export default memo(NavBar);
