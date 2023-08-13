"use client";

import { Button } from "@nextui-org/button";
import { signOut } from "next-auth/react";

type Props = {
  className?: string;
};

export function SignOutButton({ className }: Props) {
  return (
    <Button
      variant="light"
      color="danger"
      className={className}
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
