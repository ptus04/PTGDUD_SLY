import { memo } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputWithLabel from "../components/InputWithLabel";
import useForm from "../hooks/useForm";

const LoginPage = () => {
  const { handleLoginSubmit } = useForm();

  return (
    <main className="flex flex-col items-center justify-center">
      <form
        className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12"
        onSubmit={handleLoginSubmit}
      >
        <h1 className="text-center text-2xl font-semibold">ĐĂNG NHẬP</h1>

        <InputWithLabel
          id="phone"
          type="tel"
          label="Số điện thoại đã đăng ký"
          autoComplete="tel"
          autoFocus
          required
          error="Số điện thoại không hợp lệ"
          pattern="^0[2-9]\d{8}$"
        />

        <InputWithLabel
          id="password"
          type="password"
          label="Mật khẩu"
          autoComplete="current-password"
          required
          error="Mật khẩu không hợp lệ"
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$"
        />

        <Button preset="primary" type="submit">
          ĐĂNG NHẬP
        </Button>

        <div className="flex flex-wrap justify-between">
          <Link className="hover:text-red-500" to="/register">
            Đăng ký tài khoản
          </Link>
          <Link className="hover:text-red-500" to="/password-recovery">
            Quên mật khẩu?
          </Link>
        </div>
      </form>
    </main>
  );
};

export default memo(LoginPage);
