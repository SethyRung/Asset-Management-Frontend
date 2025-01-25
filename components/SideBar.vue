<template>
  <div>
    <USlideover v-model="isOpen" :ui="{ width: 'max-w-56', padding: 'p-2' }">
      <UVerticalNavigation
        :links="links"
        :ui="{
          active: 'text-white before:bg-primary-500 dark:before:bg-gray-800',
          inactive:
            'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
          icon: {
            base: 'size-4',
            active: 'text-white',
          },
        }"
      />
      <p class="mt-auto text-center font-ibmPlexSans text-xs">Version: 1.0.0</p>
    </USlideover>
  </div>
</template>

<script lang="ts" setup>
const isOpen = defineModel("isOpen", {
  type: Boolean,
  default: false,
});

const links = [
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
];
</script>
