export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  return await api("/users", { method: "POST", body: requestBody }, event);
});
