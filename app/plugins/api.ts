import type { NitroFetchOptions } from "nitropack";

export default defineNuxtPlugin((nuxtApp) => {
  const ACCESS_TOKEN_EXPIRED = "Access token is already expired";
  const REFRESH_TOKEN_PATH = "/api/auth/refresh";

  const accessToken = useCookie("access_token", {
    secure: true,
    sameSite: "strict",
  });
  const refreshToken = useCookie("refresh_token", {
    secure: true,
    sameSite: "strict",
  });
  const isAuthenticated = useCookie<boolean>("isAuthenticated");
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
          res.status.message.includes(ACCESS_TOKEN_EXPIRED) &&
          refreshToken.value
        ) {
          try {
            const resRefresh = await $fetch<
              ResponseBody<{ accessToken: string; refreshToken: string }>
            >(REFRESH_TOKEN_PATH, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${refreshToken.value}`,
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
    isAuthenticated.value = false;
    navigateTo("/sign-in");
  };

  nuxtApp.provide("api", api);
});
