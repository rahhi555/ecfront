import createClient, { FetchResponse } from "openapi-fetch";
import { paths } from "@/generate/openapi-type";

export const api = createClient<paths>({
  baseUrl: "http://localhost:8080",
});

class ApiError extends Error {
  constructor(error: any) {
    super(error.message);
    this.name = "ApiError";
  }
}

const writeErrorHandler = {
  // @ts-ignore
  apply: async function (target, thisArg, argArray) {
    const response: { data?: any; error?: any; response: any } =
      await target.apply(thisArg, argArray);

    if (response.error) {
      throw new ApiError(response.error);
    }

    return response;
  },
};

api.GET = new Proxy(api.GET, writeErrorHandler);
