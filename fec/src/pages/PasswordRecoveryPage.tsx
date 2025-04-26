import { memo, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import PrimaryButton from "../components/PrimaryButton";
import RenderIf from "../components/RenderIf";

const PasswordRecoveryPage = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="flex flex-col items-center justify-center">
      <form className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12">
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu?</h1>
        <p>
          Một liên kết tạo mật khẩu mới sẽ được gửi qua <span className="italic">số điện thoại</span> bên dưới.
        </p>

        <RenderIf condition={!!error}>
          <p className="flex w-full items-center gap-2 rounded-md border border-red-400 bg-red-100 px-4 py-2 text-red-600">
            <i className="fa fa-exclamation-triangle"></i>
            <span>{error}</span>
          </p>
        </RenderIf>

        <InputWithLabel
          id="phone"
          label="Số điện thoại"
          type="tel"
          value={phone}
          autoComplete="tel"
          autoFocus
          required
          pattern="^0[2-9]\d{8}$"
          error="Số điện thoại không hợp lệ"
          onChange={(e) => setPhone(e.target.value)}
        />

        <PrimaryButton className="justify-center" type="submit">
          Đặt lại mật khẩu
        </PrimaryButton>
      </form>
    </main>
  );
};

export default memo(PasswordRecoveryPage);
