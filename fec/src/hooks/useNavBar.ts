import React, { useCallback, useMemo } from "react";
import useStore from "../store/useStore";

const useNavBar = () => {
  const { state, dispatch } = useStore();

  const handleOpen = useCallback(() => {
    dispatch({ type: "SET_NAV_BAR_STATE", payload: true });
  }, [dispatch]);

  const handleClose = useCallback(() => {
    dispatch({ type: "SET_NAV_BAR_STATE", payload: false });
  }, [dispatch]);

  const handleUnsafeClose = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === e.currentTarget ||
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLButtonElement
      ) {
        dispatch({ type: "SET_NAV_BAR_STATE", payload: false });
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
