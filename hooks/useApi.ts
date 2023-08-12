import createClient from "openapi-fetch";
import { paths } from "@/generate/openapi-type";
import { useNotificationStore } from "@/stores/notification";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { nextAuthOptions } from "@/config/next-auth/options";
import type { components } from "@/generate/openapi-type";

type ErrorBase = components["schemas"]["ErrorBase"];

const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

// モジュールスコープで一度作成したProxyを保持するための変数
let clientProxiedApi: typeof api | null = null;
let serverProxiedApi: typeof api | null = null;

class ApiError extends Error {
  constructor(error: ErrorBase) {
    super(error.detail);
    this.name = "ApiError";
    this.cause = error;
  }
}

export function useClientApi() {
  const { open } = useNotificationStore();

  const interceptHandler = {
    apply: async function (
      target: any,
      thisArg: any,
      argArray: Parameters<typeof api.POST>,
    ) {
      const session = await getSession();

      if (session?.user?.token) {
        argArray[1].headers = {
          ...argArray[1].headers,
          Authorization: `Bearer ${session.user.token}`,
        };
      }

      const response: { data?: any; error?: ErrorBase; response: any } =
        await target.apply(thisArg, argArray);

      if (response.error) {
        open(response.error.detail);
        throw new ApiError(response.error);
      }

      return response;
    },
  };

  // Proxyがまだ作成されていない場合にのみ新しいProxyを作成
  if (clientProxiedApi == null) {
    clientProxiedApi = {
      ...api,
      GET: new Proxy(api.GET, interceptHandler),
      POST: new Proxy(api.POST, interceptHandler),
      PUT: new Proxy(api.PUT, interceptHandler),
      PATCH: new Proxy(api.PATCH, interceptHandler),
      DELETE: new Proxy(api.DELETE, interceptHandler),
    };
  }

  return clientProxiedApi;
}

export function serverApi() {
  const interceptHandler = {
    apply: async function (
      target: any,
      thisArg: any,
      argArray: Parameters<typeof api.GET>,
    ) {
      const session = await getServerSession(nextAuthOptions);

      if (session?.user?.token) {
        argArray[1].headers = {
          ...argArray[1].headers,
          Authorization: `Bearer ${session.user.token}`,
        };
      }

      const response: { data?: any; error?: ErrorBase; response: any } =
        await target.apply(thisArg, argArray);

      if (response.error) {
        throw new ApiError(response.error);
      }

      return response;
    },
  };

  if (serverProxiedApi == null) {
    serverProxiedApi = {
      ...api,
      GET: new Proxy(api.GET, interceptHandler),
      POST: new Proxy(api.POST, interceptHandler),
      PUT: new Proxy(api.PUT, interceptHandler),
      PATCH: new Proxy(api.PATCH, interceptHandler),
      DELETE: new Proxy(api.DELETE, interceptHandler),
    };
  }

  return serverProxiedApi;
}
