import type { H3Event } from "h3";
import type { NitroFetchOptions } from "nitropack";

export const api = async <T>(
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
  event: H3Event,
) => {
  const config = useRuntimeConfig();
  const baseUrl = config.apiBaseUrl;
  const token = getRequestHeader(event, "Authorization");
  options = {
    ...options,
    baseURL: baseUrl,
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        ...(token && { Authorization: token }),
      };
    },
  };

  try {
    return await $fetch<ResponseBody<T | null>>(url, options);
  } catch (e) {
    console.log(e);
    return {
      status: {
        code: ResponseStatusCode.INTERNAL_SERVER_ERROR,
        errorCode: null,
        errorMessage:
          "Client-server error occurred. Please try again later or contact support.",
        warningMessage: null,
        requestId: "",
        requestTime: 0,
      },
      data: null,
    };
  }
};
