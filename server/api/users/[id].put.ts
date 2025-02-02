export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const requestBody = await readBody(event);
  return await api(`/users/${id}`, { method: "PUT", body: requestBody }, event);
});
