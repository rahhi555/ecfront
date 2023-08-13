import { serverApi } from "@/hooks/useApi";
import { ClientList } from "./client-list";

export async function ProductList() {
  const { data: products } = await serverApi().GET("/products", {});

  return <ClientList products={products} />;
}
