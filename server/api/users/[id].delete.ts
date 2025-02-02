export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await api(`/users/${id}`, { method: "DELETE" }, event);
});
