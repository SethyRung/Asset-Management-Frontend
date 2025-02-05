export default defineEventHandler(async (event) => {
  return await api(
    "/maintenance/items",
    {
      method: "GET",
    },
    event,
  );
});
