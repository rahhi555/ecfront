import { ProductList } from "@/components/product-list";
import { $path } from "@/generate/path";
import { Link } from "@nextui-org/link";
import { Suspense } from "react";

export default function VendorProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <Link href={$path("/authed/vendor/products/new")}>new product</Link>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductList />
      </Suspense>
    </div>
  );
}
