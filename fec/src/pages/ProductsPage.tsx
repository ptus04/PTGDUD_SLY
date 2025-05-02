import { memo } from "react";

const ProductsPage = () => {
  return (
    <main class="container-lg">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="/">Trang chủ</a>
        </li>
      </ol>
      <div>
        <p class="small text-secondary" id="numOfProduct"></p>
        <form action="./tim-kiem.html" method="GET" id="formSapXep">
          <div class="hstack gap-3">
            <div class="hstack justify-content-end col gap-3">
              <label class="col-form-label" for="sapXep">
                Sắp xếp
              </label>
              <div>
                <select class="form-control" name="sapXep" id="sapXep">
                  <option value="0">Mới nhất</option>
                  <option value="1">Giá: tăng dần</option>
                  <option value="2">Giá: giảm dần</option>
                  <option value="3">Giảm giá: tăng dần</option>
                  <option value="4">Giảm giá: giảm dần</option>
                </select>
              </div>
            </div>
            <div>
              <button class="btn btn-danger" type="submit">
                <i class="fa fa-filter"></i>
                <span class="d-none d-md-inline">Lọc</span>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div class="container-lg hstack justify-content-center flex-wrap" id="productContainer"></div>
    </main>
  );
};

export default memo(ProductsPage);
