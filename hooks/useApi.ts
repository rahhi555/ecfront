import createClient from "openapi-fetch";
import { paths } from "@/generate/openapi-type";
import { useNotificationStore } from "@/stores/notification";
import type { components } from "@/generate/openapi-type";

type ErrorBase = components["schemas"]["ErrorBase"];

const api = createClient<paths>({
  baseUrl: "http://localhost:8080",
});

// モジュールスコープで一度作成したProxyを保持するための変数
let proxiedApi: typeof api | null = null;

class ApiError extends Error {
  constructor(error: ErrorBase) {
    super(error.detail);
    this.name = "ApiError";
    this.cause = error;
  }
}

export function useApi() {
  const { open } = useNotificationStore();

  const writeErrorHandler = {
    // @ts-ignore
    apply: async function (target, thisArg, argArray) {
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
  if (proxiedApi === null) {
    proxiedApi = {
      ...api,
      POST: new Proxy(api.POST, writeErrorHandler),
      PUT: new Proxy(api.PUT, writeErrorHandler),
      PATCH: new Proxy(api.PATCH, writeErrorHandler),
      DELETE: new Proxy(api.DELETE, writeErrorHandler),
    };
  }

  return proxiedApi;
}
