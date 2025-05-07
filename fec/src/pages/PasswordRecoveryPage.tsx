import { memo, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import InputWithLabel from "../components/InputWithLabel";
import useStore from "../store/useStore";

const PasswordRecoveryPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();
  const [phone, setPhone] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value);
  }, []);

  const handleOTPRequest = useCallback(async () => {
    if (!/^0[2-9]\d{8}$/.test(phone)) {
      return;
    }

    try {
      const res = await fetch("/api/users/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, action: "reset-password" }),
      });
      if (res.status === 404) {
        dispatch({ type: "SET_ERROR", payload: "Số điện thoại không tồn tại" });
        return;
      }
      if (res.status === 400) {
        dispatch({ type: "SET_ERROR", payload: "Vui lòng đợi ít nhất 60 giây trước khi yêu cầu mã mới" });
        return;
      }

      dispatch({ type: "SET_SUCCESS", payload: "Mã OTP đã được gửi đến số điện thoại của bạn" });
      setTimeRemaining(60);

      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: (error as Error).message });
    }
  }, [phone, dispatch]);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const otp = formData.get("otp") as string;
      const password = formData.get("password") as string;

      try {
        const res = await fetch("/api/users/reset-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone, otp, password }),
        });
        if (res.status === 403) {
          dispatch({ type: "SET_ERROR", payload: "Mã OTP không hợp lệ" });
          return;
        }

        setIsModalOpen(true);
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    },
    [phone, dispatch],
  );

  return (
    <main className="flex flex-col items-center justify-center">
      <ConfirmModal
        title="Đặt lại mật khẩu thành công"
        content={`Mật khẩu của tài khoản ${phone} đã được thay đổi thành công!`}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => {
          setIsModalOpen(false);
          navigate("/login", { replace: true });
        }}
      />

      <form
        className="mt-4 flex w-10/12 flex-col gap-4 rounded-md border border-gray-300 p-4 md:w-5/12 lg:w-3/12"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-2xl font-semibold">Quên mật khẩu?</h1>

        <InputWithLabel
          className="grow"
          id="phone"
          label="Số điện thoại"
          type="tel"
          value={phone}
          autoComplete="tel"
          autoFocus
          required
          pattern="^0[2-9]\d{8}$"
          error="Số điện thoại không hợp lệ"
          onChange={handlePhoneChange}
        />
        <Button type="button" preset="secondary" onClick={handleOTPRequest} disabled={timeRemaining > 0}>
          {timeRemaining ? "Gửi mã OTP " + timeRemaining + "s" : "Gửi mã OTP"}
        </Button>

        <InputWithLabel
          id="otp"
          label="Mã OTP"
          type="number"
          autoComplete="one-time-code"
          required
          pattern="^\d{6}$"
          error="Mã OTP không hợp lệ"
        />

        <InputWithLabel
          id="password"
          label="Mật khẩu mới"
          type="password"
          autoComplete="new-password"
          required
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_]).{8,}$"
          error="Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ cái, một số và một ký tự đặc biệt."
        />

        <Button preset="primary" type="submit">
          Đặt lại mật khẩu
        </Button>
      </form>
    </main>
  );
};

export default memo(PasswordRecoveryPage);
