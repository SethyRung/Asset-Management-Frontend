export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  const response = await api<{ accessToken: string; refreshToken: string }>(
    "/auth/login",
    { method: "POST", body: requestBody },
    event,
  );

  if (response.status.code === ResponseStatusCode.OK && response.data) {
    setAuthCookie(response.data.accessToken, response.data.refreshToken, event);
  }

  return response;
});
