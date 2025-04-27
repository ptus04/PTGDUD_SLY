import { memo } from "react";
import ItemCategory from "./ItemCategory";

const ListCategory = () => {
  return (
    <ul className="flex flex-col gap-2">
      <ItemCategory name="TOPS" subCategories={["TOPS", "TEE", "POLO"]} />
      <ItemCategory name="OUTWEARS" subCategories={["OUTWEARS", "JACKETS", "HOODIES"]} />
      <ItemCategory name="BOTTOMS" subCategories={["BOTTOMS", "SHORTS", "PANTS"]} />
      <ItemCategory name="ACCESSORIES" subCategories={["ACCESSORIES", "WALLETS", "CAPS", "BACKPACKS"]} />
    </ul>
  );
};

export default memo(ListCategory);
