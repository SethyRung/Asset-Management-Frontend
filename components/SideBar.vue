<template>
  <div>
    <USlideover
      v-model:open="isOpen"
      :ui="{ content: 'max-w-56 p-2 divide-y-0' }"
    >
      <template #content>
        <UNavigationMenu orientation="vertical" :items="items" />
        <p class="mt-auto text-center font-ibmPlexSans text-xs text-zinc-400">
          Version: {{ config.public.appVersion }}
        </p>
      </template>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
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
    label: "Assets",
    icon: "i-lucide-box",
    to: "/assets",
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
    label: "History / Maintenance",
    icon: "i-lucide-hammer",
    to: "/history-maintenance",
  },
  {
    label: "Help / support",
    icon: "i-lucide-circle-help",
    to: "/help",
  },
]);

const config = useRuntimeConfig();
</script>
