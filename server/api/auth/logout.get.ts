export default defineEventHandler(async (event) => {
  return await api<{ accessToken: string; refreshToken: string }>(
    "/auth/logout",
    { method: "GET" },
    event,
  );
});
