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
      <UAvatar size="md" alt="Benjamin Canac" />

      <template #content>
        <UNavigationMenu orientation="vertical" :items="items" />
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
const isOpen = defineModel("isOpen", {
  type: Boolean,
  default: false,
});

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
      onSelect: () => {
        console.log("logout");
      },
    },
  ],
];
</script>
