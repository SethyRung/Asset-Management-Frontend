export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref<boolean>(false);
  const accessToken = ref<string>();

  return { isAuthenticated, accessToken };
});
