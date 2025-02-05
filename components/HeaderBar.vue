<template>
  <div
    class="w-full h-16 px-4 sticky top-0 z-50 flex justify-between items-center border-b border-zinc-300 bg-white"
  >
    <UButton
      :icon="isOpen ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
      color="neutral"
      variant="ghost"
      @click="handleSideBarClick"
    />
    <h1 class="text-base font-medium font-ibmPlexSans">Asset Management</h1>
    <UPopover
      mode="click"
      :popper="{ placement: 'bottom-end' }"
      :ui="{ content: 'p-2' }"
    >
      <UAvatar
        size="md"
        :alt="`${profileStore.profile.firstName} ${profileStore.profile.lastName}`"
      />

      <template #content>
        <UNavigationMenu orientation="vertical" :items="items" />
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
import { ResponseStatusCode } from "~/enums/base";

const isOpen = defineModel("isOpen", {
  type: Boolean,
  default: false,
});

const toast = useToast();
const { start, finish } = useLoadingIndicator();

const profileStore = useProfileStore();
const accessToken = useCookie("access_token", {
  secure: true,
  sameSite: "strict",
});
const refreshToken = useCookie("refresh_token", {
  secure: true,
  sameSite: "strict",
});
const isAuthenticated = useCookie<boolean>("isAuthenticated");

const handleSideBarClick = () => {
  isOpen.value = !isOpen.value;
};

const items = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      to: "/profile",
    },
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      onSelect: async () => {
        start();
        const response = await useApi("/api/auth/logout", { method: "GET" });
        finish();
        if (response.status.code === ResponseStatusCode.OK) {
          accessToken.value = null;
          refreshToken.value = null;
          isAuthenticated.value = false;
          profileStore.$reset();
          navigateTo("/sign-in", { replace: true });
        } else {
          toast.add({
            title: "Error",
            description: response.status.errorMessage,
            color: "error",
          });
        }
      },
    },
  ],
];
</script>
