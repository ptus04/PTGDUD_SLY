import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router";
import AppContext, { AppActionTypes } from "../AppContext";
import PrimaryButton from "../components/PrimaryButton";
import ProductCarousel from "../components/ProductCarousel";
import RenderIf from "../components/RenderIf";
import { formatAsCurrency } from "../utils/formatters";

const ProductPage = () => {
  const { dispatch } = useContext(AppContext);
  const params = useParams();
  const [product, setProduct] = useState<ProductWithIdString | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = useCallback(
    async (signal: AbortSignal) => {
      try {
        const res = await fetch(`/api/products/${params.id}`, { signal });
        if (res.status === 404) {
          return;
        }

        const product = await res.json();
        setProduct(product);
        document.title = `${product.title} | SLY`;
      } catch (error) {
        if (!(error instanceof DOMException) && error instanceof Error) {
          dispatch({ type: AppActionTypes.SET_ERROR, payload: error.message });
        }
      } finally {
        setIsLoading(false);
      }
    },
    [params.id, dispatch],
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchProduct(controller.signal);

    return () => controller.abort();
  }, [fetchProduct]);

  return (
    <main className="container mx-auto flex flex-col gap-4 p-4">
      {/* Breadcrumbs navigation */}
      <nav className="text-sm text-gray-500">
        <ol className="flex gap-1">
          <li>
            <NavLink className="after:text-gray-500 after:content-['_/_'] hover:text-red-500" to="/">
              Trang chủ
            </NavLink>
          </li>

          <li>
            <NavLink
              className={`after:text-gray-500 hover:text-red-500 ${product ? "after:content-['_/_']" : ""}`}
              to="/products"
              end
            >
              Cửa hàng
            </NavLink>
          </li>

          <RenderIf condition={!!product}>
            <li>
              <NavLink to={`/products/${product?._id}`}>{product?.title}</NavLink>
            </li>
          </RenderIf>
        </ol>
      </nav>

      {/* Product not found */}
      <RenderIf condition={!isLoading && !product}>
        <div className="flex justify-center gap-4">
          <h2 className="text-center text-6xl font-bold text-gray-500">
            <i className="fa fa-warning text-red-500"></i> 404
          </h2>
          <div className="text-center">
            <h1 className="text-center text-2xl font-bold">Không tìm thấy sản phẩm!</h1>
            <p>
              <span>Vui lòng quay lại </span>
              <Link className="text-red-500" to="/products">
                cửa hàng
              </Link>
              <span> hoặc </span>
              <Link className="text-red-500" to="/">
                trở về trang chủ
              </Link>
            </p>
          </div>
        </div>
      </RenderIf>

      {/* Product detail */}
      <RenderIf condition={!!product}>
        <div className="flex flex-wrap justify-center gap-4">
          <ProductCarousel product={product!} />

          <form className="flex grow basis-[50%] flex-col gap-2">
            <h1 className="text-3xl font-bold">{product?.title}</h1>
            <h2 className="text-sm">
              {product?.description.map((line) => (
                <span key={line}>
                  - {line}
                  <br />
                </span>
              ))}
            </h2>
            <div>
              <p>Hướng dẫn bảo quản</p>
              <p className="text-sm">
                {product?.careInstructions.map((line) => (
                  <span key={line}>
                    - {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>

            <RenderIf condition={!!product?.discount}>
              <div>
                <h3 className="me-2 inline text-2xl font-bold text-red-500">
                  {formatAsCurrency((product?.price ?? 0) * (1 - (product?.discount ?? 0)))}
                </h3>
                <p className="inline text-2xl text-gray-500 line-through">{formatAsCurrency(product?.price ?? 0)}</p>
              </div>
            </RenderIf>

            <RenderIf condition={!product?.discount}>
              <h3 className="inline text-2xl">{formatAsCurrency(product?.price ?? 0)}</h3>
            </RenderIf>

            <RenderIf condition={!!product?.size}>
              <div className="flex">
                <label className="min-w-[5rem]" htmlFor="size">
                  Size
                </label>
                {product?.size?.map((s, i) => (
                  <div key={s} className="flex w-20 gap-1">
                    <input
                      className="accent-red-500"
                      type="radio"
                      name="size"
                      value={s}
                      title={s}
                      defaultChecked={i === 0}
                    />
                    <label htmlFor={s}>{s}</label>
                  </div>
                ))}
              </div>
            </RenderIf>

            <div className="flex items-center gap-2">
              <label htmlFor="quantity">Số lượng:</label>
              <input
                className="rounded-sm border border-gray-300 px-3 py-1"
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                defaultValue="1"
                title="Số lượng"
              />
            </div>

            <PrimaryButton type="button" className="mx-auto">
              <i className="fa fa-cart-plus"></i>
              <span>Thêm vào giỏ hàng</span>
            </PrimaryButton>

            <hr />
            <p className="text-center text-sm">
              Đổi hàng miễn phí trong 7 ngày <br />
              Miễn phí giao hàng toàn quốc với hóa đơn trên 500K
            </p>
          </form>
        </div>
      </RenderIf>
    </main>
  );
};

export default memo(ProductPage);
