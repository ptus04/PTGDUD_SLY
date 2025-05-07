import { Link } from "react-router-dom";
import Button from "../components/Button";
import InputWithLabel from "../components/InputWithLabel";
import useForm from "../hooks/useForm";

const RegisterPage = () => {
  const { handleRegisterSubmit } = useForm();

  return (
    <main className="flex flex-col items-center justify-center">
      <form
        className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12"
        onSubmit={handleRegisterSubmit}
      >
        <h2 className="text-center text-2xl font-semibold">ĐĂNG KÝ TÀI KHOẢN</h2>

        <InputWithLabel
          id="name"
          type="text"
          label="Họ và tên"
          autoComplete="name"
          autoFocus
          required
          error="Tên không được để trống"
        />

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="gender">
            Giới tính
          </label>
          <div className="group inline-flex flex-wrap gap-4">
            <div className="flex items-center gap-1">
              <input
                className="group accent-red-500 focus:outline-red-500 nth-[n+2]:ms-4"
                type="radio"
                id="gender-male"
                name="gender"
                value={0}
                required
                defaultChecked
              />
              <label htmlFor="gender-male">Nam</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                className="group accent-red-500 focus:outline-red-500 nth-[n+2]:ms-4"
                type="radio"
                id="gender-female"
                name="gender"
                value={1}
                required
              />
              <label htmlFor="gender-female">Nữ</label>
            </div>
          </div>
        </div>

        <InputWithLabel
          id="phone"
          type="tel"
          label="Số điện thoại"
          autoComplete="tel"
          required
          pattern="^0[2-9]\d{8}$"
          error="Số điện thoại không hợp lệ"
        />

        <InputWithLabel
          id="password"
          type="password"
          label="Mật khẩu"
          autoComplete="new-password"
          required
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$"
          error="Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt."
        />

        <Button preset="primary" type="submit">
          ĐĂNG KÝ
        </Button>

        <p>
          <span>Đã có tài khoản? </span>
          <Link className="hover:text-red-500" to="/login">
            Đăng nhập
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
