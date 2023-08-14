import createClient from "openapi-fetch";
import { paths } from "@/generate/openapi-type";
import { useNotificationStore } from "@/stores/notification";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { nextAuthOptions } from "@/config/next-auth/options";
import type { components } from "@/generate/openapi-type";

type ErrorBase = components["schemas"]["ErrorBase"];

class ApiError extends Error {
  constructor(error: ErrorBase) {
    super(error.detail);
    this.name = "ApiError";
    this.cause = error;
  }
}

export function useClientApi() {
  const { open } = useNotificationStore();

  const api = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    fetch: async (url, init) => {
      const session = await getSession();

      init!.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
        ...init!.headers,
      };

      const response = await fetch(url, init);

      if (response.status >= 400) {
        const error: ErrorBase = await response.json();
        open(error.detail);
        throw new ApiError(error);
      }

      return response;
    },
  });

  return api;
}

export function serverApi() {
  const api = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    fetch: async (url, init) => {
      const session = await getServerSession(nextAuthOptions);

      init!.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.user.token}`,
        ...init!.headers,
      };

      const response = await fetch(url, init);

      if (response.status >= 400) {
        const error: ErrorBase = await response.json();
        throw new ApiError(error);
      }

      return response;
    },
  });

  return api;
}
