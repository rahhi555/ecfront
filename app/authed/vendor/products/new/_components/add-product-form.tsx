"use client";

import { FormProduct } from "@/generate/openapi-zod";
import { $path } from "@/generate/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNotificationStore } from "@/stores/notification";
import { useSession } from "next-auth/react";
import { useClientApi } from "@/hooks/useApi";

type Schema = z.infer<typeof FormProduct>;

export function AddProductForm() {
  const session = useSession();
  const { open } = useNotificationStore();
  const router = useRouter();
  const { POST } = useClientApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(FormProduct),
  });

  const name = watch("name", "");
  const description = watch("description", "");
  const price = watch("price", 0);
  const stock = watch("stock", 0);
  const vendorId = watch("vendorId", session?.data?.user.user.id);

  async function onSubmit(data: Schema) {
    await POST("/products", {
      body: data,
    });

    router.push($path("/authed/vendor/products"));
    open("商品を追加しました");
  }

  return (
    <>
      {session.status === "authenticated" && (
        <form onSubmit={handleSubmit(onSubmit)} className="lg:px-6">
          <input
            type="hidden"
            {...register("vendorId", {
              valueAsNumber: true,
            })}
            value={vendorId}
          />
          <Input
            type="text"
            label="商品名"
            {...register("name")}
            value={name}
            validationState={!!errors.name ? "invalid" : "valid"}
            errorMessage={errors.name?.message}
            variant="bordered"
            color="primary"
            size="sm"
            className="mb-4"
          />
          <Textarea
            label="説明"
            {...register("description")}
            value={description}
            validationState={!!errors.description ? "invalid" : "valid"}
            errorMessage={errors.description?.message}
            variant="bordered"
            color="primary"
            size="sm"
            className="mb-4"
          />
          <Input
            type="number"
            label="価格"
            {...register("price", {
              valueAsNumber: true,
            })}
            value={price.toString()}
            validationState={!!errors.price ? "invalid" : "valid"}
            errorMessage={errors.price?.message}
            variant="bordered"
            color="primary"
            size="sm"
            className="mb-4"
            step="100"
            min="0"
          />
          <Input
            type="number"
            label="在庫"
            {...register("stock", {
              valueAsNumber: true,
            })}
            value={stock.toString()}
            validationState={!!errors.stock ? "invalid" : "valid"}
            errorMessage={errors.stock?.message}
            variant="bordered"
            color="primary"
            size="sm"
            className="mb-4"
            min="0"
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="lg:w-1/3"
              size="lg"
              color="primary"
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
