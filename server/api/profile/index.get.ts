export default defineEventHandler(async (event) => {
  return await api("/profile", { method: "GET" }, event);
});
