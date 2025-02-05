import type { UseFetchOptions } from "#app";
import type { ResponseBody } from "~/types/ResponseBody";

export const useFetchApi = async <T>(
  url: string | (() => string),
  options: UseFetchOptions<ResponseBody<T>>,
) => {
  return useFetch<ResponseBody<T>>(url, {
    ...options,
    $fetch: useNuxtApp().$api,
  });
};
