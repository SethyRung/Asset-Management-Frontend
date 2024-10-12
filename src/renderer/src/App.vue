<template>
  <div class="w-full h-screen flex gap-2">
    <SidebarMenu v-model:is-collapsed="isCollapsed" :links="links" />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import SidebarMenu, { LinkProp } from "@/components/SidebarMenu.vue";
import { ref } from "vue";

const links: LinkProp[] = [
  {
    title: "Home",
    label: "",
    icon: "lucide:home",
    path: "/",
  },
  {
    title: "Assets",
    label: "",
    icon: "lucide:box",
    path: "/asset",
  },
  {
    title: "Category",
    label: "",
    icon: "lucide:layout-dashboard",
    path: "/category",
  },
  {
    title: "Users",
    label: "",
    icon: "lucide:users",
    path: "/user",
  },
  {
    title: "Report",
    label: "",
    icon: "lucide:bar-chart-3",
    path: "/report",
  },
  {
    title: "History / Maintenance",
    label: "",
    icon: "lucide:wrench",
    path: "/maintenance",
  },
  {
    title: "Support",
    label: "",
    icon: "lucide:help-circle",
    path: "/support",
  },
];
const isCollapsed = ref<boolean>(false);
</script>
