"use client";

import { Button } from "@nextui-org/button";
import { signIn } from "next-auth/react";

type Props = {
  className?: string;
};

export function SignInButton({ className }: Props) {
  return (
    <Button
      variant="light"
      color="primary"
      className={className}
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
