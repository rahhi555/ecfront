import { Breadcrumb } from "@/components/breadcrumb";
import { Title } from "@/components/title";

const items = [
  { label: "商品一覧", href: "/authed/vendor/products" },
  { label: "商品編集", href: "#" },
];

export default function VendorProductEditPage() {
  return (
    <div>
      <Breadcrumb items={items} />
      <Title title="商品編集" />
    </div>
  );
}
