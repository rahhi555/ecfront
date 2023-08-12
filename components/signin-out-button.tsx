"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@nextui-org/button";
import React from "react";

export function SignInOutButton({ className }: { className?: string }) {
  const session = useSession();

  return (
    <>
      {session.status === "loading" && (
        <Button variant="light" className={className}>
          Loading
        </Button>
      )}
      {session.status === "authenticated" && (
        <Button
          variant="light"
          color="danger"
          className={className}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      )}
      {session.status === "unauthenticated" && (
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
