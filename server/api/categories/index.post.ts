export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  return await api("/categories", { method: "POST", body: requestBody }, event);
});
