import { memo } from "react";
import BreadCrumbs from "../components/BreadCrumbs";

const RefundPolicyPage = () => {
  return (
    <main className="container mx-auto p-4">
      <BreadCrumbs />

      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">CHÍNH SÁCH ĐỔI &#8722; TRẢ HÀNG</h1>
        <hr className="text-gray-300" />

        <h2 className="text-xl font-bold">Các sản phẩm giảm giá</h2>
        <ul>
          <li>&#8722; Quý khách vui lòng kiểm tra sản phẩm trực tiếp trước khi thanh toán</li>
          <li>&#8722; Kiểm tra size chart kỹ trước khi đặt hàng</li>
          <li>&#8722; Sản phẩm giảm giá sẽ không được hỗ trợ đổi &#8722; trả (trừ lỗi của nhà sản xuất)</li>
          <li>
            &#8722; Quý khách nên quay video unbox khi khui hàng, SLY chỉ hỗ trợ giải quyết khi có video để tránh mất
            thời gian 2 bên
          </li>
        </ul>

        <h2 className="text-xl font-bold">Các sản phẩm nguyên giá</h2>
        <p className="italic">
          <span className="font-bold">Quý khách</span> vui lòng kiểm tra trước khi thanh toán SLY hỗ trợ đổi size trong
          vòng <span className="font-bold">7 ngày</span>
        </p>
        <ul>
          <li>
            &#8722; Khoản phí trên lệch sẽ không được hoàn lại, trường hợp sản phẩm đổi có giá cao hơn, quý khách chỉ
            cần thanh toán thêm giá trị chênh lệch
          </li>
          <li>&#8722; Vui lòng quay video unbox như ghi chú trên đơn hàng.</li>
          <li>&#8722; Hàng phải còn mới, chưa qua sử dụng và còn tag sản phẩm.</li>
          <li>&#8722; Sản phẩm bị lỗi do vận chuyển và do nhà sản xuất.</li>
          <li>&#8722; Trường hợp đổi hàng từ phía khách hàng, quý khách vui lòng hỗ trợ phần phí giao hàng 2 chiều</li>
          <li>
            &#8722; Quý khách gởi lại hàng vui lòng quay lại quá trình đóng gói, để sản phẩm còn mới 100% khi SLY nhận
            hàng để hỗ trợ đổi &#8722; trả nhanh nhất
          </li>
        </ul>

        <h2 className="text-xl font-bold">
          Việc vận chuyển sẽ qua nhiều khâu trung gian hoặc có vấn đề phát sinh từ bên vận chuyển, để đảm bảo quyền lợi
          tốt nhất cho bạn. Nên quay video trong quá trình mở hàng khi túi niêm phong SLY chưa bị khui, để SLY có thể
          giải quyết đơn của bạn nhanh nhất.
        </h2>
      </div>
    </main>
  );
};

export default memo(RefundPolicyPage);
