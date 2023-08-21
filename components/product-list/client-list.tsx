"use client";

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
import { $path } from "@/generate/path";
import { useRouter } from "next/navigation";

type DTOProduct = components["schemas"]["DTOProduct"];

const columns = [
  { key: "id", label: "id" },
  { key: "name", label: "商品名" },
  { key: "price", label: "価格" },
  { key: "stock", label: "在庫数" },
  { key: "createdAt", label: "作成日" },
];

export function ClientList({
  products,
}: {
  products: DTOProduct[] | undefined;
}) {
  const { push } = useRouter();

  return (
    <Table>
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>

      <TableBody items={products}>
        {(product) => (
          <TableRow
            key={product.id}
            className="cursor-pointer hover:bg-slate-100"
            onClick={() =>
              push(
                $path("/authed/vendor/products/[id]", {
                  params: { id: product.id },
                }),
              )
            }
          >
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
