import createClient from "openapi-fetch";
import { paths } from "@/generate/types";

export const api = createClient<paths>({
  fetch: fetch, // Next.js fetch
});
