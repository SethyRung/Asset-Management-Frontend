export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const requestBody = await readBody(event);
  return await api(
    `/assets/${id}`,
    { method: "PUT", body: requestBody },
    event,
  );
});
