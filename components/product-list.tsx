import { serverApi } from "@/hooks/useApi";

async function getProducts() {
  const { data } = await serverApi().GET("/products", {});

  return data;
}

export async function ProductList() {
  const products = await getProducts();

  return (
    <ul>
      {products?.map((product) => <li key={product.id}>{product.name}</li>)}
    </ul>
  );
}
