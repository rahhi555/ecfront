"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormAuthenticate } from "@/generate/openapi-zod";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

type Schema = z.infer<typeof FormAuthenticate>;

export function LoginForm() {
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

  function onSubmit(data: Schema) {
    console.log(data);
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
