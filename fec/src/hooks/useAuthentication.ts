import User from "@be/src/models/User.model";
import { useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useStore from "../store/useStore";

const useAuthentication = () => {
  const { state, dispatch } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ redirectTo?: string }>();

  const getUser = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/api/users/me", { method: "GET", credentials: "include", signal });
        if (res.status === 401) {
          return;
        }

        const user: NonNullable<User> = await res.json();
        dispatch({ type: "SET_USER", payload: user });
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    getUser(controller.signal);

    return () => controller.abort();
  }, [getUser]);

  useEffect(() => {
    const isAuthRoute = /\/(login|register)/.test(location.pathname);
    if (isAuthRoute && state.user) {
      navigate(params.redirectTo ?? "/", { replace: true });
    }

    const isAccountOrCartRoute = /\/(account|checkout)/.test(location.pathname);
    if (isAccountOrCartRoute && !state.user) {
      navigate("/login", { replace: true });
    }
  }, [location.pathname, state.user, params.redirectTo, navigate]);
};

export default useAuthentication;
