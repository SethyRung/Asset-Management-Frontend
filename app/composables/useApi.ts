import type { NitroFetchOptions } from "nitropack";

export const useApi = async <T>(
  url: string,
  options: NitroFetchOptions<
    string,
    | "get"
    | "head"
    | "patch"
    | "post"
    | "put"
    | "delete"
    | "connect"
    | "options"
    | "trace"
  >,
): Promise<ResponseBody<T>> => {
  return useNuxtApp().$api(url, options);
};
