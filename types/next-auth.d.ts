import NextAuth from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";
import { components } from "@/generate/openapi-type";

type DTOLogin = components["schemas"]["DTOLogin"];

declare module "next-auth" {
  interface Session {
    user: DTOLogin;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT, DTOLogin {}
}
