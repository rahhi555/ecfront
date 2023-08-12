import { ProductList } from "@/components/product-list";
import { $path } from "@/generate/path";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { MdAdd } from "react-icons/md";
import { Title } from "@/components/title";

export default function VendorProductsPage() {
  return (
    <div>
      <Title title="商品一覧" />

      <Button
        href={$path("/authed/vendor/products/new")}
        as={Link}
        color="primary"
        startContent={<MdAdd />}
        className="mb-4"
      >
        商品追加
      </Button>
      <ProductList />
    </div>
  );
}
