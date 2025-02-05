export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await api(`/assets/${id}`, { method: "DELETE" }, event);
});
