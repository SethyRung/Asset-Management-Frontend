export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await api(`/maintenance/${id}`, { method: "DELETE" }, event);
});
