import { memo } from "react";
import { Link, NavLink } from "react-router";

const PrivacyPolicyPage = () => {
  return (
    <main className="container mx-auto gap-4 p-4">
      {/* Breadcrumbs navigation */}
      <nav className="text-sm text-gray-500">
        <ol className="flex gap-1">
          <li>
            <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/">
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink to="/privacy-policy">Chính sách bảo mật</NavLink>
          </li>
        </ol>
      </nav>

      {/* Privacy Policy content */}
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-3xl font-bold">CHÍNH SÁCH BẢO MẬT</h1>
        <hr />
        <h2 className="text-xl font-bold">Mục đích và phạm vi thu thập</h2>
        <p>
          &#8722; Việc thu thập dữ liệu chủ yếu trên website{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>{" "}
          bao gồm: họ tên, email, điện thoại, địa chỉ khách hàng trong mục liên hệ. Đây là các thông tin mà SLY cần
          thành viên cung cấp bắt buộc khi gửi thông tin nhờ tư vấn hay muốn mua sản phẩm và để{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>{" "}
          liên hệ xác nhận lại với khách hàng trên website nhằm đảm bảo quyền lợi cho cho người tiêu dùng.{" "}
        </p>
        <p>
          &#8722; Các thành viên sẽ tự chịu trách nhiệm về bảo mật và lưu giữ mọi hoạt động sử dụng dịch vụ dưới thông
          tin mà mình cung cấp và hộp thư điện tử của mình. Ngoài ra, thành viên có trách nhiệm thông báo kịp thời cho
          webiste{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>{" "}
          về những hành vi sử dụng trái phép, lạm dụng, vi phạm bảo mật, lưu giữ tên đăng ký và mật khẩu của bên thứ ba
          để có biện pháp giải quyết phù hợp.
        </p>

        <h2 className="text-xl font-bold">Phạm vi sử dụng thông tin</h2>
        <ul>
          <li>&#8722; Công ty sử dụng thông tin thành viên cung cấp để:</li>
          <li>
            <ul className="list-inside list-disc ps-4">
              <li>Liên hệ xác nhận đơn hàng và giao hàng cho thành viên khi nhận được yêu cầu từ thành viên.</li>
              <li>Gửi email tiếp thị, khuyến mại về hàng hóa do chúng tôi bán.</li>
              <li>
                Gửi các thông báo về các hoạt động trao của website{" "}
                <Link className="hover:text-red-500" to="/">
                  sly.vn
                </Link>
                .
              </li>
              <li>Liên lạc và giải quyết với người dùng trong những trường hợp đặc biệt.</li>
              <li>
                Không sử dụng thông tin cá nhân của người dùng ngoài mục đích xác nhận và liên hệ có liên quan đến giao
                dịch tại Cửa hàng.
              </li>
            </ul>
          </li>
          <li>
            &#8722; Khi có yêu cầu của cơ quan tư pháp bao gồm: Viện kiểm sát, tòa án, cơ quan công an điều tra liên
            quan đến hành vi vi phạm pháp luật nào đó của khách hàng.
          </li>
        </ul>

        <h2 className="text-xl font-bold">Thời gian lưu trữ</h2>
        <p>
          Dữ liệu cá nhân của thành viên sẽ được lưu trữ cho đến khi có yêu cầu ban quản trị hủy bỏ. Còn lại trong mọi
          trường hợp thông tin cá nhân thành viên sẽ được bảo mật trên máy chủ của{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>
        </p>
        <address>
          <p className="font-semibold">Công ty TNHH Thương Mại và Dịch Vụ SLY</p>
          <p>123 Đường ABC, Phường XYZ, Quận 123, TP. HCM</p>
          <p>
            Điện thoại:{" "}
            <Link className="hover:text-red-500" to="tel:+84868635209">
              +84 68635209
            </Link>
          </p>
          <p>
            Email:{" "}
            <Link className="hover:text-red-500" to="mailto:cs@sly.vn">
              cs@sly.vn
            </Link>
          </p>
        </address>

        <h2 className="text-xl font-bold">
          Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân của mình.
        </h2>
        <p>
          Thành viên có quyền tự kiểm tra, cập nhật, điều chỉnh hoặc hủy bỏ thông tin cá nhân của mình bằng cách liên hệ
          với ban quản trị website{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>{" "}
          thực hiện việc này. <br />
          Thành viên có quyền gửi khiếu nại về nội dung bảo mật thông tin đề nghị liên hệ Ban quản trị của website{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>
          . Khi tiếp nhận những phản hồi này,{" "}
          <Link className="hover:text-red-500" to="/">
            sly.vn
          </Link>{" "}
          sẽ xác nhận lại thông tin, trường hợp đúng như phản ánh của thành viên tùy theo mức độ, SLY sẽ có những biện
          pháp xử lý kịp thời.
        </p>

        <h2 className="text-xl font-bold">Cam kết bảo mật thông tin cá nhân khách hàng</h2>
        <ul>
          <li>
            &#8722; Thông tin cá nhân của thành viên trên{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>{" "}
            được{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>{" "}
            cam kết bảo mật tuyệt đối theo chính sách bảo vệ thông tin cá nhân của khách hàng. Việc thu thập và sử dụng
            thông tin của mỗi thành viên chỉ được thực hiện khi có sự đồng ý của khách hàng đó trừ những trường hợp pháp
            luật có quy định khác.
          </li>
          <li>
            Không sử dụng, không chuyển giao, cung cấp hay tiết lộ cho bên thứ 3 nào về thông tin cá nhân của thành viên
            khi không có sự cho phép đồng ý từ thành viên.
          </li>
          <li>
            &#8722; Trong trường hợp máy chủ lưu trữ thông tin bị hacker tấn công dẫn đến mất mát dữ liệu cá nhân thành
            viên,{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>{" "}
            sẽ có trách nhiệm thông báo vụ việc cho cơ quan chức năng điều tra xử lý kịp thời và thông báo cho thành
            viên được biết.
          </li>
          <li>
            Bảo mật tuyệt đối mọi thông tin giao dịch trực tuyến của thành viên bao gồm thông tin hóa đơn kế toán chứng
            từ số hóa trên{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>
          </li>
          <li>
            {" "}
            &#8722; Ban quản lý{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>{" "}
            yêu cầu các cá nhân khi đăng ký/mua hàng phải cung cấp đầy đủ thông tin cá nhân có liên quan như: Họ và tên,
            địa chỉ liên lạc, email, điện thoại,…., và chịu trách nhiệm về tính pháp lý của những thông tin trên. Ban
            quản lý{" "}
            <Link className="hover:text-red-500" to="/">
              sly.vn
            </Link>{" "}
            không chịu trách nhiệm cũng như không giải quyết mọi khiếu nại có liên quan đến quyền lợi của thành viên đó
            nếu xét thấy tất cả thông tin cá nhân của thành viên đó cung cấp khi đăng ký ban đầu là không chính xác.
          </li>
        </ul>
      </div>
    </main>
  );
};

export default memo(PrivacyPolicyPage);
