"use client";

import { useApi } from "@/hooks/useApi";
import { FormAuthenticate } from "@/generate/openapi-zod";
import { $path } from "@/generate/path";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNotificationStore } from "@/stores/notification";

type Schema = z.infer<typeof FormAuthenticate>;

export function LoginForm() {
  const api = useApi();
  const { open } = useNotificationStore();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Schema>({
    resolver: zodResolver(FormAuthenticate),
    defaultValues: { email: "", password: "", role: "VENDOR" },
  });

  const email = watch("email");
  const password = watch("password");

  async function onSubmit(data: Schema) {
    await api.POST("/auth/authenticate", {
      body: data,
    });

    router.push($path("/auth/vendor/products"));
    open("ログインしました");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="lg:px-6">
      <Input
        type="email"
        label="Email"
        {...register("email")}
        value={email}
        validationState={!!errors.email ? "invalid" : "valid"}
        errorMessage={errors.email?.message}
        variant="bordered"
        color="primary"
        size="sm"
        className="mb-4"
      />
      <Input
        type="password"
        label="Password"
        {...register("password")}
        value={password}
        validationState={!!errors.password ? "invalid" : "valid"}
        errorMessage={errors.password?.message}
        variant="bordered"
        color="primary"
        size="sm"
        className="mb-4"
      />
      <div className="flex justify-center">
        <Button type="submit" className="lg:w-1/3" size="lg" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
}
