export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  return await api(`/categories/${id}`, { method: "DELETE" }, event);
});
