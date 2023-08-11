import { api } from "@/fetch";

async function getProducts() {
  const { data } = await api.GET("/products", {});

  return data;
}

export default async function ProductList() {
  const products = await getProducts();

  return (
    <ul>
      {products?.map((product) => <li key={product.id}>{product.name}</li>)}
    </ul>
  );
}
