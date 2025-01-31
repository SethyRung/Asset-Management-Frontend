export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await api('/auth/reset-password', {method: "GET", query: {usernameOrEmail: query.email}}, event);
})
