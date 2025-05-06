import { memo, useCallback, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import BreadCrumbs from "../components/BreadCrumbs";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import InputWithLabel from "../components/InputWithLabel";
import RadioSelector from "../components/RadioSelector";
import RenderIf from "../components/RenderIf";
import SelectWithLabel from "../components/SelectWithLabel";
import useAddress from "../hooks/useAddress";
import useStore from "../store/useStore";

const UserPage = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const addresses = useAddress();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [name, setName] = useState("");
  const [gender, setGender] = useState(0);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  }, []);

  const handleGenderChange = useCallback((_selected: string, index: number) => {
    setGender(index);
  }, []);

  const handleDateOfBirthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  }, []);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  }, []);

  const handleCityChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
    setDistrict("");
    setWard("");
  }, []);

  const handleDistrictChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setDistrict(e.target.value);
    setWard("");
  }, []);

  const handleWardChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setWard(e.target.value);
  }, []);

  const handleAddressChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  }, []);

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        const res = await fetch("/api/users/me", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            gender: gender === 1,
            dateOfBirth,
            phone,
            city,
            district,
            ward,
            address,
          }),
        });

        if (!res.ok) {
          dispatch({ type: "SET_ERROR", payload: "Cập nhật thông tin thất bại" });
          return;
        }

        const data = await res.json();
        dispatch({ type: "SET_USER", payload: data.user });
        dispatch({ type: "SET_SUCCESS", payload: "Cập nhật thông tin thành công" });

        setIsEditing((prev) => !prev);
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: (error as Error).message });
      }
    },
    [dispatch, name, gender, dateOfBirth, phone, city, district, ward, address],
  );

  const handleEdit = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, []);

  const handleLogout = useCallback(async () => {
    setShowLogoutModal(false);
    const res = await fetch("/api/users/logout", {
      method: "GET",
      credentials: "include",
    });
    if (!res.ok) {
      dispatch({ type: "SET_SUCCESS", payload: "Đăng xuất thành công" });
      return;
    }

    dispatch({ type: "SET_USER", payload: undefined });
    navigate("/", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    if (state.user) {
      setName(state.user.name);
      setGender(state.user.gender ? 1 : 0);
      setDateOfBirth(state.user.dateOfBirth ?? "");
      setPhone(state.user.phone);
      setCity(state.user.city ?? "");
      setDistrict(state.user.district ?? "");
      setWard(state.user.ward ?? "");
      setAddress(state.user.address ?? "");
    }
  }, [state.user]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      <ConfirmModal
        title="Xác nhận Đăng xuất"
        content="Bạn có chắc chắn muốn đăng xuất không?"
        open={showLogoutModal}
        cancelText="Hủy bỏ"
        acceptText="Đăng xuất"
        onClose={() => setShowLogoutModal(false)}
        onCancel={() => setShowLogoutModal(false)}
        onAccept={handleLogout}
      />

      <BreadCrumbs />

      <div className="flex flex-wrap gap-4">
        <nav className="flex flex-col gap-2 lg:border-e lg:border-gray-300 lg:pe-4">
          <NavLink className="flex items-center gap-2 px-4 py-2 hover:text-red-500" to="/user">
            <i className="fa fa-user"></i> Thông tin tài khoản
          </NavLink>
          <NavLink className="flex items-center gap-2 px-4 py-2 hover:text-red-500" to="/order-history">
            <i className="fa fa-receipt"></i> Quản lý đơn hàng
          </NavLink>
          <NavLink className="flex items-center gap-2 px-4 py-2 hover:text-red-500" to="/password-recovery">
            <i className="fa fa-key"></i> Đổi mật khẩu
          </NavLink>
          <Button className="w-full" type="button" preset="secondary" onClick={() => setShowLogoutModal(true)}>
            <i className="fa fa-sign-out"></i> Đăng xuất
          </Button>
        </nav>

        <form className="flex grow flex-wrap justify-center gap-2" onSubmit={handleFormSubmit}>
          <div className="grow basis-full lg:basis-1/3">
            <h1 className="text-xl font-bold">THÔNG TIN CƠ BẢN</h1>
            <div className="flex flex-col gap-2 px-3 py-2">
              <InputWithLabel
                id="name"
                label="Họ và Tên"
                type="text"
                autoComplete="name"
                value={name}
                onChange={handleNameChange}
                readOnly={!isEditing}
                required
                error="Tên không được để trống"
              />
            </div>

            <div className="flex w-full flex-col gap-2 px-3 py-2">
              <label className="font-semibold" htmlFor="gender">
                Giới tính
              </label>
              <RadioSelector
                className="px-4 py-2"
                groupName="gender"
                options={["Nam", "Nữ"]}
                selectedIndex={gender}
                onChange={handleGenderChange}
                disabled={!isEditing}
                required
              />
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <InputWithLabel
                id="dateOfBirth"
                label="Ngày sinh"
                type="date"
                autoComplete="bday-day"
                value={dateOfBirth}
                onChange={handleDateOfBirthChange}
                readOnly={!isEditing}
                required
                error="Ngày sinh không được để trống"
              />
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <InputWithLabel
                id="phone"
                label="Số điện thoại"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={handlePhoneChange}
                readOnly={!isEditing}
                required
                pattern="^0[2-9]\d{8}$"
                error="Sai định dạng số điện thoại"
              />
            </div>
          </div>

          <div className="grow basis-full lg:basis-1/3">
            <h4 className="text-xl font-bold">THÔNG TIN LIÊN HỆ</h4>

            <div className="flex flex-col gap-2 px-3 py-2">
              <SelectWithLabel
                id="city"
                label="Thành phố/Tỉnh"
                required
                value={city}
                onChange={handleCityChange}
                disabled={!isEditing}
              >
                <option value="">Chọn thành phố/tỉnh</option>
                {Object.keys(addresses ?? {})
                  .sort((a, b) => a.localeCompare(b))
                  .map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
              </SelectWithLabel>
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <SelectWithLabel
                id="district"
                label="Quận/Huyện"
                required
                value={district}
                onChange={handleDistrictChange}
                disabled={!isEditing}
              >
                <option value="">Chọn quận/huyện</option>
                {addresses &&
                  city &&
                  Object.values(addresses[city] ?? {})
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </SelectWithLabel>
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <SelectWithLabel
                id="ward"
                label="Phường/Xã"
                required
                value={ward}
                onChange={handleWardChange}
                disabled={!isEditing}
              >
                <option value="">Chọn phường/xã</option>
                {addresses &&
                  district &&
                  Object.values(
                    Object.values(addresses[city] ?? {}).filter((item) => item.name === district)[0]?.wards ?? {},
                  )
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item) => (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    ))}
              </SelectWithLabel>
            </div>

            <div className="flex flex-col gap-2 px-3 py-2">
              <InputWithLabel
                id="address"
                label="Địa chỉ"
                type="text"
                autoComplete="street-address"
                readOnly={!isEditing}
                value={address}
                onChange={handleAddressChange}
                required
                error="Địa chỉ không được để trống"
              />
            </div>
          </div>

          <div className="mt-4 flex basis-full justify-between">
            <RenderIf condition={!isEditing}>
              <Button type="button" preset="tertiary" onClick={handleEdit}>
                <i className="fa fa-edit"></i> Cập nhật thông tin
              </Button>
            </RenderIf>

            <RenderIf condition={isEditing}>
              <Button type="button" preset="tertiary" onClick={handleEdit}>
                <i className="fa fa-cancel"></i> Hủy bỏ
              </Button>
              <Button type="submit">
                <i className="fa fa-save"></i> Lưu thay đổi
              </Button>
            </RenderIf>
          </div>
        </form>
      </div>
    </main>
  );
};

export default memo(UserPage);
