import { routeList, whileList } from "~/constraints/route";

export default defineNuxtRouteMiddleware((to, _from) => {
  const isAuthenticated = useCookie("isAuthenticated");

  if (!isAuthenticated.value && !whileList.includes(to.fullPath)) {
    return navigateTo("/sign-in", { replace: true });
  }

  const profileStore = useProfileStore();
  const currentRoute = routeList.find(({ path }) => path === to.fullPath);
  if (
    currentRoute &&
    !whileList.includes(to.fullPath) &&
    !currentRoute.permissions.includes(profileStore.profile.role)
  ) {
    return abortNavigation();
  }
});
