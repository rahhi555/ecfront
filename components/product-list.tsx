import { serverApi } from "@/hooks/useApi";

export async function ProductList() {
  const { data: products } = await serverApi().GET("/products", {});

  return (
    <ul>
      {products?.map((product) => <li key={product.id}>{product.name}</li>)}
    </ul>
  );
}
