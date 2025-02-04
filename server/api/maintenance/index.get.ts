export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await api(
    "/maintenance",
    {
      method: "GET",
      query: { search: query.search, page: query.page, size: query.size },
    },
    event,
  );
});
