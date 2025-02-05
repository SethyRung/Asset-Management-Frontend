import type { H3Event } from "h3";

export const setAuthCookie = (
  accessToken: string,
  refreshToken: string,
  event: H3Event,
) => {
  setCookie(event, "access_token", accessToken, {
    secure: true,
    sameSite: "strict",
  });
  setCookie(event, "refresh_token", refreshToken, {
    secure: true,
    sameSite: "strict",
  });
};
