import type { User } from "~/types/User";

export const useProfileStore = defineStore(
  "profile",
  () => {
    const profile = reactive<User>({
      id: 0,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      joinDate: "",
      status: false,
      role: "",
    });

    return { profile };
  },
  {
    persist: true,
  },
);
