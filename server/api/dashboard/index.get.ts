export default defineEventHandler(async (event) => {
  return await api(
    "/dashboard",
    {
      method: "GET",
    },
    event,
  );
});
