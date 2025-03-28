import { useEffect, useState } from "react";
import TopCarousel from "./TopCarousel";

const currencyFmt = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const loadProducts = async () => {
  const res = await fetch("./api/__products.json");
  let products = await res.json();
  products = products.filter((p) => p.isNew);

  return products;
};

const HomePage = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    loadProducts().then((products) => setProducts(products));
  }, []);

  return (
    <>
      <TopCarousel />

      <main className="container mx-auto px-3 pt-5">
        <h3 className="text-2xl">Sản phẩm mới</h3>
        <div className="flex flex-wrap">
          {products?.map((p, i) => (
            <div
              key={i}
              className="w-[100%] p-2 text-center md:w-[25%] lg:w-[20%]"
            >
              <a className="relative" href={`./san-pham.html?sanPham=${p.id}`}>
                <div className="relative">
                  {p.discount && (
                    <span className="absolute left-[10%] top-[10%] rounded-2xl bg-red-600 px-1 py-0.5 text-white">
                      -{p.discount}%
                    </span>
                  )}
                  <img
                    className="w-100"
                    src={`./img/${p.images[0]}`}
                    loading="lazy"
                  />
                  {!p.inStock && <p className="out-of-stock">HẾT HÀNG</p>}
                </div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                  {p.title}
                </p>
              </a>
              {p.discount && (
                <p className="m-0 text-sm text-gray-500 line-through">
                  {p.discount && currencyFmt.format(p.price)}
                </p>
              )}
              <p
                className={`m-0 font-bold ${p.discount ? "text-red-600" : ""}`}
              >
                {currencyFmt.format(
                  p.discount ? p.price * (1 - p.discount / 100) : p.price,
                )}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default HomePage;
