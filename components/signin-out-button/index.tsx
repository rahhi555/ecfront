"use client";

import { useSession } from "next-auth/react";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

export function SignInOutButton({ className }: { className?: string }) {
  const session = useSession();

  return (
    <>
      {session.status === "authenticated" ? (
        <SignOutButton className={className} />
      ) : (
        <SignInButton className={className} />
      )}
    </>
  );
}
