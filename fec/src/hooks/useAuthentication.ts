import { useCallback, useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AppContext, { AppActionTypes, AppState } from "../AppContext";

const useAuthentication = () => {
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ redirectTo?: string }>();

  const checkAuthentication = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/api/users/me", { method: "GET", credentials: "include", signal });
        if (res.status === 401) {
          return;
        }

        const user: NonNullable<AppState["session"]> = await res.json();
        dispatch({ type: AppActionTypes.SET_SESSION, payload: user });
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        dispatch({ type: AppActionTypes.SET_ERROR, payload: (error as Error).message });
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    checkAuthentication(controller.signal);

    return () => controller.abort();
  }, [checkAuthentication]);

  useEffect(() => {
    const isAuthRoute = /\/(login|register)/.test(location.pathname);
    if (isAuthRoute && state.session) {
      navigate(params.redirectTo ?? "/", { replace: true });
    }
  }, [location.pathname, state.session, params.redirectTo, navigate]);
};

export default useAuthentication;
