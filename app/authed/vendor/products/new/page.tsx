import { NavbarBottom } from "@/components/navbar-bottom";
import { AddProductForm } from "./_components/add-product-form";

const items = [
  { label: "商品一覧", href: "/authed/vendor/products" },
  { label: "商品追加", href: "#" },
];

export default function VendorProductsNewPage() {
  return (
    <div>
      <NavbarBottom items={items} title="商品追加" />

      <div>
        <AddProductForm />
      </div>
    </div>
  );
}
