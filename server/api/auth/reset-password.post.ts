export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  return await api<{ accessToken: string; refreshToken: string }>(
    "/auth/reset-password",
    { method: "POST", body: requestBody },
    event,
  );
});
