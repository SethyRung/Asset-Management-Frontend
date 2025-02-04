export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await api(
    "/assets",
    {
      method: "GET",
      query: { search: query.search, page: query.page, size: query.size },
    },
    event,
  );
});
