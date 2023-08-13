"use client";

import { useClientApi } from "@/hooks/useApi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/table";
import { useState } from "react";
import type { components } from "@/generate/openapi-type";
import { Spinner } from "@nextui-org/spinner";
import { User } from "@nextui-org/user";
import { useAsyncList } from "@react-stately/data";

type DTOProduct = components["schemas"]["DTOProduct"];

const columns = [
  { key: "id", label: "id" },
  { key: "name", label: "商品名" },
  { key: "price", label: "価格" },
  { key: "stock", label: "在庫数" },
  { key: "createdAt", label: "作成日" },
];

export function ProductList() {
  const { GET } = useClientApi();
  const [loading, setIsLoading] = useState(true);

  const products = useAsyncList<DTOProduct>({
    async load({ signal }) {
      const { data } = await GET("/products", { signal });
      setIsLoading(false);
      return {
        items: data || [],
      };
    },
  });

  return (
    <Table>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>

      <TableBody
        items={products.items}
        isLoading={loading}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(product) => (
          <TableRow key={product.id}>
            {(columnKey) => (
              <TableCell>
                {columnKey === "name" && (
                  <User
                    avatarProps={{ radius: "lg", src: product.thumbnailUrl }}
                    description={product.description}
                    name={product.name}
                  ></User>
                )}
                {columnKey !== "name" && getKeyValue(product, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
