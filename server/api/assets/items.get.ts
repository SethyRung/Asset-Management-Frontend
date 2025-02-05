export default defineEventHandler(async (event) => {
  return await api(
    "/assets/items",
    {
      method: "GET",
    },
    event,
  );
});
