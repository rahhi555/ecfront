import { NavbarBottom } from "@/components/navbar-bottom";
import { $path } from "@/generate/path";

export default function VendorProductsEditPage({
  params,
}: {
  params: { id: number };
}) {
  const items = [
    { label: "商品一覧", href: "/authed/vendor/products" },
    {
      label: "商品詳細",
      href: $path("/authed/vendor/products/[id]", { params }),
    },
    { label: "商品編集", href: "#" },
  ];

  return (
    <div>
      <NavbarBottom items={items} title="商品編集" />
      VendorProductsEditPage
    </div>
  );
}
