<template>
  <div>
    <USlideover
      v-model:open="isOpen"
      :ui="{ content: 'max-w-56 p-2 divide-y-0' }"
    >
      <template #content>
        <UNavigationMenu
          orientation="vertical"
          :items="
            items.filter(
              ({ to }) =>
                !!routeList.find(
                  (route) =>
                    route.path === to &&
                    route.permissions.includes(profileStore.profile.role),
                ),
            )
          "
        />
        <p class="mt-auto text-center font-ibmPlexSans text-xs text-zinc-400">
          Version: {{ config.public.appVersion }}
        </p>
      </template>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
import { routeList } from "~/constraints/route";

const profileStore = useProfileStore();

const isOpen = defineModel("isOpen", {
  type: Boolean,
  default: false,
});

const items = ref([
  {
    label: "Home",
    icon: "i-lucide-house",
    to: "/",
  },
  {
    label: "Asset",
    icon: "i-lucide-box",
    to: "/asset",
  },
  {
    label: "Category",
    icon: "i-lucide-layout-dashboard",
    to: "/category",
  },
  {
    label: "User",
    icon: "i-lucide-user",
    to: "/user",
  },
  {
    label: "Report",
    icon: "i-lucide-bar-chart-3",
    to: "/report",
  },
  {
    label: "Maintenance",
    icon: "i-lucide-hammer",
    to: "/maintenance",
  },
  {
    label: "History",
    icon: "i-lucide-history",
    to: "/history",
  },
]);

const config = useRuntimeConfig();
</script>
