import { memo, useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

type CustomizedHeaderTagProps = {
  children: React.ReactNode;
};

const CustomizedHeaderTag = ({ children }: CustomizedHeaderTagProps) => {
  const location = useLocation();
  const [className, setClassName] = useState("fixed z-10 flex w-full items-center justify-between px-4 py-2");

  const handleScroll = useCallback(() => {
    if (window.scrollY >= window.innerHeight) {
      setClassName("fixed z-10 flex w-full items-center justify-between px-4 py-2 bg-white shadow-md");
    } else {
      setClassName("fixed z-10 flex w-full items-center justify-between px-4 py-2");
    }
  }, [setClassName]);

  useEffect(() => {
    if (location.pathname === "/") {
      window.addEventListener("scroll", handleScroll);
    } else {
      setClassName("sticky top-0 z-10 flex w-full items-center justify-between px-4 py-2 bg-white shadow-md");
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setClassName("fixed z-10 flex w-full items-center justify-between px-4 py-2");
    };
  }, [location.pathname, handleScroll]);

  return <header className={className}>{children}</header>;
};

export default memo(CustomizedHeaderTag);
