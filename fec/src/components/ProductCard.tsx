import { ProductWithIdString } from "@be/src/models/Product.model";
import { memo } from "react";
import { Link } from "react-router-dom";
import { formatAsCurrency } from "../utils/formatters";
import RenderIf from "./RenderIf";

type ProductCardProps = {
  product: ProductWithIdString;
};

const ProductCard = ({ product }: ProductCardProps) => (
  <div className="w-full p-2 text-center md:w-1/4 lg:w-1/5">
    <Link className="relative" to={`/products/${product._id}`}>
      <div className="relative">
        <RenderIf condition={!!product.discount}>
          <p className="absolute top-1/10 left-1/10 rounded-full bg-red-500 px-3 py-1 text-white">
            {(product.discount ?? 0) * 100}%
          </p>
        </RenderIf>
        <img className="w-full" src={`/img/${product.images[0]}`} alt={product.title} loading="lazy" />
        <RenderIf condition={!product.inStock}>
          <p className="absolute top-1/2 w-full bg-white/75 px-6 py-2 text-2xl font-bold text-red-600">HẾT HÀNG</p>
        </RenderIf>
      </div>
      <p className="overflow-hidden text-nowrap text-ellipsis whitespace-nowrap">{product.title}</p>
    </Link>

    <RenderIf condition={!!product.discount}>
      <p className="m-0 text-sm text-gray-500 line-through">{formatAsCurrency(product.price)}</p>
      <p className="m-0 font-bold text-red-600">{formatAsCurrency(product.price * (1 - (product.discount ?? 0)))}</p>
    </RenderIf>
    <RenderIf condition={!product.discount}>
      <p className="m-0 font-bold">{formatAsCurrency(product.price)}</p>
    </RenderIf>
  </div>
);

export default memo(ProductCard);
