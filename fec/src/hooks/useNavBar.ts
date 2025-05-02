import React, { useCallback, useMemo } from "react";
import useStore from "../store/useStore";

const useNavBar = () => {
  const { state, dispatch } = useStore();

  const handleOpen = useCallback(() => {
    dispatch({ type: "OPEN_NAV_BAR" });
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_NAV_BAR" });
  }, [dispatch]);

  const handleUnsafeClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === e.currentTarget ||
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLButtonElement
      ) {
        dispatch({ type: "CLOSE_NAV_BAR" });
      }
    },
    [dispatch],
  );

  return useMemo(
    () => ({ isOpen: state.isExpanded, handleOpen, handleClose, handleUnsafeClose }),
    [state.isExpanded, handleOpen, handleClose, handleUnsafeClose],
  );
};

export default useNavBar;
