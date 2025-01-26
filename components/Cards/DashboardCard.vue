<template>
  <div
    class="min-h-28 basis-80 grow p-4 border border-zinc-300 rounded-lg space-y-2"
  >
    <div class="flex justify-between items-center">
      <h2 class="text-zinc-700 text-base font-bold">{{ label }}</h2>
      <Icon :name="icon" size="24" />
    </div>
    <p class="text-3xl text-zinc-700 font-bold">{{ value }}</p>
    <p class="text-xs text-zinc-500">{{ factor }} from last month</p>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ label: string; icon: string; value: number; factor: string }>();
</script>
