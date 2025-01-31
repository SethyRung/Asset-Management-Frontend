import type { H3Event } from "h3";

export const setAuthCookie = (
  accessToken: string,
  refreshToken: string,
  event: H3Event,
) => {
  setCookie(event, "access_token", accessToken, {
    maxAge: 15 * 60, // 15 minutes
    secure: true,
    sameSite: "strict",
  });
  setCookie(event, "refresh_token", refreshToken, {
    maxAge: 60 * 60 * 24, // 1 days
    secure: true,
    sameSite: "strict",
  });
};
