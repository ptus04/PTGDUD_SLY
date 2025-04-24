import React, { useContext, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import AppContext, { AppActionTypes, AppState } from "../AppContext";

const useAuthentication = () => {
  const context = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams<{ redirectTo?: string }>();

  const checkAuthentication = React.useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch("/api/users/me", { method: "GET", credentials: "include", signal });
        if (res.status === 401) {
          return;
        }

        const user: NonNullable<AppState["session"]> = await res.json();
        context.dispatch({ type: AppActionTypes.SET_SESSION, payload: user });
      } catch (error) {
        if (error instanceof DOMException) {
          return;
        }

        context.dispatch({ type: AppActionTypes.SET_ERROR, payload: (error as Error).message });
      }
    },
    [context],
  );

  useEffect(() => {
    const controller = new AbortController();
    checkAuthentication(controller.signal);

    return () => controller.abort();
  }, [checkAuthentication]);

  useEffect(() => {
    const isAuthRoute = /\/(login|register)/.test(location.pathname);
    if (isAuthRoute && context.state.session) {
      navigate(params.redirectTo ?? "/", { replace: true });
    }
  }, [location.pathname, context.state.session, params.redirectTo, navigate]);
};

export default useAuthentication;
