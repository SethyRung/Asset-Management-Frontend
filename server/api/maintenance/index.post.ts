export default defineEventHandler(async (event) => {
  const requestBody = await readBody(event);
  return await api("/maintenance", { method: "POST", body: requestBody }, event);
});
