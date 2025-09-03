<template>
  <div class="w-full min-h-screen font-ibmPlexSans">
    <HeaderBar v-model:is-open="isOpen" />
    <SideBar v-model:is-open="isOpen" />
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
const isOpen = ref<boolean>(false);
</script>
