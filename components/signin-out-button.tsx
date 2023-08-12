"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import React from "react";

export function SignInOutButton({ className }: { className?: string }) {
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <Button
          variant="light"
          color="danger"
          className={className}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      ) : (
        <Button
          variant="light"
          color="primary"
          className={className}
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </>
  );
}
