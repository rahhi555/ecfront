import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/config/next-auth/options";
import { SignInButton } from "./sign-in-button";
import { SignOutButton } from "./sign-out-button";

export async function SignInOutButton({ className }: { className?: string }) {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      {!!session?.user.token ? (
        <SignOutButton className={className} />
      ) : (
        <SignInButton className={className} />
      )}
    </>
  );
}
