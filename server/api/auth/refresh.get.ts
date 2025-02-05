export default defineEventHandler(async (event) => {
  return await api<{ accessToken: string; refreshToken: string }>(
    "/auth/refresh",
    { method: "GET" },
    event,
  );
});
