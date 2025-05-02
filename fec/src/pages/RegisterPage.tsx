import { useCallback, useState } from "react";
import { Link } from "react-router";
import InputWithLabel from "../components/InputWithLabel";
import PrimaryButton from "../components/PrimaryButton";
import RadioSelector from "../components/RadioSelector";
import RenderIf from "../components/RenderIf";
import useStore from "../store/useStore";

const RegisterPage = () => {
  const { dispatch } = useStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, gender }),
      });

      if (res.status === 409) {
        setError("Số điện thoại hoặc Email đã được sử dụng");
        return;
      }

      const session = await res.json();
      if ("errors" in session) {
        setError("Vui lòng nhập đúng thông tin đăng ký");
        return;
      }

      dispatch({ type: "SET_USER", payload: session });
    },
    [name, email, phone, password, gender, dispatch],
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <form
        className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-2xl font-semibold">ĐĂNG KÝ TÀI KHOẢN</h2>

        <RenderIf condition={!!error}>
          <p className="flex w-full items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-2 text-red-600">
            <i className="fa fa-exclamation-triangle"></i>
            <span>{error}</span>
          </p>
        </RenderIf>

        <InputWithLabel
          id="name"
          type="text"
          label="Họ và tên *"
          autoComplete="name"
          autoFocus
          required
          error="Tên không được để trống"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="gender">
            Giới tính *
          </label>
          <RadioSelector
            groupName="gender"
            options={["Nam", "Nữ"]}
            required
            selectedIndex={0}
            onChange={(_selected, index) => setGender(index === 1)}
            error="Giới tính chưa được chọn"
          />
        </div>

        <InputWithLabel
          id="email"
          type="email"
          label="Địa chỉ email"
          autoComplete="email"
          error="Email không hợp lệ"
          pattern="^[\w\d]{5,24}@\w{3,6}\.[A-z]{2,4}$"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputWithLabel
          id="phone"
          type="tel"
          label="Số điện thoại *"
          autoComplete="tel"
          pattern="^0[2-9]\d{8}$"
          required
          error="Số điện thoại không hợp lệ"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <InputWithLabel
          id="password"
          type="password"
          label="Mật khẩu *"
          autoComplete="new-password"
          required
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$"
          error="Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PrimaryButton className="justify-center" type="submit">
          ĐĂNG KÝ
        </PrimaryButton>

        <p>
          <span>Đã có tài khoản? </span>
          <Link className="duration-100 hover:text-red-500" to="/login">
            Đăng nhập
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
