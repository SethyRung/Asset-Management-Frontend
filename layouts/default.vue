<template>
  <div class="w-full min-h-screen font-ibmPlexSans">
    <HeaderBar v-model:is-open="isOpen" />
    <SideBar v-model:is-open="isOpen" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import HeaderBar from "~/components/HeaderBar.vue";
import SideBar from "~/components/SideBar.vue";

const isOpen = ref<boolean>(false);
</script>
