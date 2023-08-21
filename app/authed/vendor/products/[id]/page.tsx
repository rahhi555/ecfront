import { NavbarBottom } from "@/components/navbar-bottom";
import { Product } from "./_component/product";
import { Suspense } from "react";
import { Spinner } from "@nextui-org/spinner";

const items = [
  { label: "商品一覧", href: "/authed/vendor/products" },
  { label: "商品詳細", href: "#" },
];

export default async function VendorProductEditPage({
  params,
}: {
  params: { id: number };
}) {
  return (
    <div>
      <NavbarBottom items={items} title="商品詳細" />

      <Suspense fallback={<Spinner className="mx-auto mt-10 w-full" />}>
        <Product id={params.id} />
      </Suspense>
    </div>
  );
}
