import { memo, useCallback, useContext, useState } from "react";
import { Link } from "react-router";
import AppContext, { AppActionTypes } from "../AppContext";
import InputWithLabel from "../components/InputWithLabel";
import PrimaryButton from "../components/PrimaryButton";
import RenderIf from "../components/RenderIf";

const LoginPage = () => {
  const context = useContext(AppContext);

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      if (res.status === 401) {
        setError("Thông tin đăng nhập không chính xác");
        return;
      }

      const session = await res.json();
      if ("errors" in session) {
        setError("Có lỗi xảy ra trong quá trình đăng nhập");
        return;
      }

      context.dispatch({ type: AppActionTypes.SET_SESSION, payload: session });
    },
    [password, phone, context],
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <form
        className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center text-2xl font-semibold">ĐĂNG NHẬP</h1>

        <RenderIf condition={!!error}>
          <p className="flex w-full items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-2 text-red-600">
            <i className="fa fa-exclamation-triangle"></i>
            <span>{error}</span>
          </p>
        </RenderIf>

        <InputWithLabel
          id="phone"
          type="tel"
          label="Số điện thoại đã đăng ký *"
          autoComplete="tel"
          autoFocus
          required
          error="Số điện thoại không hợp lệ"
          pattern="^0[2-9]\d{8}$"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <InputWithLabel
          id="password"
          type="password"
          label="Mật khẩu *"
          autoComplete="current-password"
          required
          error="Mật khẩu không hợp lệ"
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton className="justify-center" type="submit">
          ĐĂNG NHẬP
        </PrimaryButton>

        <div className="flex flex-wrap justify-between">
          <Link className="duration-100 hover:text-red-500" to="/register">
            Đăng ký tài khoản
          </Link>
          <Link className="duration-100 hover:text-red-500" to="/password-recovery">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </main>
  );
};

export default memo(LoginPage);
