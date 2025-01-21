import { ResponseStatusCode } from "~/enums/base";
import type { ResponseBody } from "~/types/ResponseBody";
import type { NitroFetchOptions } from "nitropack";

export default defineNuxtPlugin((nuxtApp) => {
  const ACCESS_TOKEN_EXPIRED = "Access token is already expired";
  const REFRESH_TOKEN_PATH = "/auth/refresh";

  const accessToken = useCookie("access_token", {
    maxAge: 30 * 60, // 30 minutes
    secure: true,
    sameSite: "strict",
  });
  const refreshToken = useCookie("refresh_token", {
    maxAge: 60 * 60 * 24, // 1 days
    secure: true,
    sameSite: "strict",
  });
  const api = $fetch.create({
    onRequest({ options }) {
      options.headers = {
        ...options.headers,
        ...(accessToken.value && {
          Authorization: `Bearer ${accessToken.value}`,
        }),
      };
    },
    async onResponse({ request, response, options }) {
      if (response.ok) {
        const res = response._data;
        if (
          res &&
          res.status.code === ResponseStatusCode.UNAUTHORIZED &&
          res.status.errorMessage.includes(ACCESS_TOKEN_EXPIRED) &&
          refreshToken.value
        ) {
          try {
            const resRefresh = await $fetch<
              ResponseBody<{ accessToken: string; refreshToken: string }>
            >(REFRESH_TOKEN_PATH, {
              method: "post",
              body: {
                refreshToken: refreshToken.value,
              },
            });

            if (resRefresh.status.code === ResponseStatusCode.OK) {
              accessToken.value = resRefresh.data.accessToken;
              refreshToken.value = resRefresh.data.refreshToken;

              // repeat previous request
              response._data = await $fetch(
                request,
                options as NitroFetchOptions<
                  RequestInfo,
                  | "options"
                  | "get"
                  | "head"
                  | "patch"
                  | "post"
                  | "put"
                  | "delete"
                  | "connect"
                  | "trace"
                >,
              );
            } else handleAuthError();
          } catch {
            handleAuthError();
          }
        }
      }
    },
  });

  const handleAuthError = () => {
    accessToken.value = null;
    refreshToken.value = null;
    navigateTo("/login");
  };

  nuxtApp.provide("api", api);
});
