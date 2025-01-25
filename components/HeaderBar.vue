<template>
  <div
    class="w-full h-16 px-4 sticky top-0 flex justify-between items-center border-b border-zinc-300 bg-white"
  >
    <UButton
      :icon="isOpen ? 'i-lucide-panel-left-open' : 'i-lucide-panel-left-close'"
      color="white"
      variant="ghost"
      @click="handleSideBarClick"
    />
    <h1 class="text-base font-medium font-ibmPlexSans">Asset Management</h1>
    <UPopover
      mode="click"
      :popper="{ placement: 'bottom-end' }"
      :ui="{ base: 'p-2' }"
    >
      <UAvatar size="md" alt="Benjamin Canac" />

      <template #panel>
        <UVerticalNavigation :links="links" />
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

const links = [
  [
    {
      label: "Profile",
      icon: "i-lucide-user",
      to: "/profile",
    },
    {
      label: "Logout",
      icon: "i-lucide-log-out",
      click: () => {
        console.log("logout");
      },
    },
  ],
];
</script>
