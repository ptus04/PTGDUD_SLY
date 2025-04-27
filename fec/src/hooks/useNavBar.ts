import React, { useCallback, useContext, useMemo } from "react";
import AppContext, { AppActionTypes } from "../AppContext";

const useNavBar = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleUnsafeToggle = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (
        e.target === e.currentTarget ||
        e.target instanceof HTMLAnchorElement ||
        e.target instanceof HTMLButtonElement
      ) {
        dispatch({ type: AppActionTypes.TOGGLE_NAVBAR });
      }
    },
    [dispatch],
  );

  const handleToggle = useCallback(() => {
    dispatch({ type: AppActionTypes.TOGGLE_NAVBAR });
  }, [dispatch]);

  return useMemo(
    () => ({ isOpen: state.isExpanded, handleToggle, handleUnsafeToggle }),
    [state.isExpanded, handleToggle, handleUnsafeToggle],
  );
};

export default useNavBar;
