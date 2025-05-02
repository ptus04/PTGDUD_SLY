import { memo } from "react";
import { Link } from "react-router";

type CategoryProps = {
  name: string;
  subCategories: string[];
};

const ItemCategory = ({ name, subCategories }: CategoryProps) => {
  return (
    <li>
      <details>
        <summary className="flex cursor-pointer items-center gap-2">
          <span className="font-bold">
            {name} <i className="fa fa-caret-right"></i>
          </span>
        </summary>
        <ul className="flex gap-4 ms-2">
          {subCategories.map((subCategory) => (
            <li key={subCategory} className="text-sm">
              <Link className="duration-200 hover:text-red-500" to={`./products?category=${subCategory.toLowerCase()}`}>
                {subCategory.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>
      </details>
    </li>
  );
};

export default memo(ItemCategory);
