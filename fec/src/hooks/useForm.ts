import { useCallback } from "react";
import useStore from "../store/useStore";

const errorMessages: Record<string, string> = {
  phone: "Số điện thoại không hợp lệ",
  password: "Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt.",
  name: "Tên không được để trống",
  gender: "Giới tính chưa được chọn",
};

const useForm = () => {
  const { dispatch } = useStore();

  const handleErrors = useCallback(
    (errors: Record<string, string>[]) => {
      const errorStrs: string[] = [];
      for (const error of errors) {
        errorStrs.push(errorMessages[error["path"]]);
      }
      dispatch({ type: "SET_ERROR", payload: `Đăng nhập thất bại: ${errorStrs.join(", ")}` });
    },
    [dispatch],
  );

  const handleRegisterSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          password: formData.get("password"),
          gender: !!formData.get("gender"),
        }),
      });

      if (res.status === 409) {
        dispatch({ type: "SET_ERROR", payload: "Số điện thoại đã được sử dụng" });
        return;
      }

      const session = await res.json();
      if ("errors" in session) {
        handleErrors(session["errors"]);
        return;
      }

      dispatch({ type: "SET_USER", payload: session });

      dispatch({ type: "SET_SUCCESS", payload: undefined });
      dispatch({ type: "SET_WARNING", payload: undefined });
      dispatch({ type: "SET_ERROR", payload: undefined });
    },
    [dispatch, handleErrors],
  );

  const handleLoginSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.get("phone"),
          password: formData.get("password"),
        }),
      });

      if (res.status === 401) {
        dispatch({ type: "SET_ERROR", payload: "Số điện thoại hoặc mật khẩu không đúng" });
        return;
      }

      const session = await res.json();
      if ("errors" in session) {
        handleErrors(session["errors"]);
        return;
      }

      dispatch({ type: "SET_USER", payload: session });

      dispatch({ type: "SET_SUCCESS", payload: undefined });
      dispatch({ type: "SET_WARNING", payload: undefined });
      dispatch({ type: "SET_ERROR", payload: undefined });
    },
    [dispatch, handleErrors],
  );

  return { handleRegisterSubmit, handleLoginSubmit };
};

export default useForm;
