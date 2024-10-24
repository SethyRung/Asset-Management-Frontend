<template>
  <div
    class="min-w-64 p-4 flex flex-col gap-4 rounded-xl font-ibmPlexSans bg-white ring-1 ring-inset ring-zinc-300 drop-shadow"
  >
    <div class="flex justify-between items-center">
      <h2 class="font-bold text-base">{{ title }}</h2>
      <Icon :icon="icon" class="size-6" />
    </div>
    <p class="font-medium text-4xl">{{ value }}</p>
    <p class="text-xs text-zinc-500">
      {{
        value - preValue >= 0
          ? `+ ${value - preValue}`
          : `- ${preValue - value}`
      }}
      from last month
    </p>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
  title: string;
  icon: string;
  value: number;
  preValue: number;
}>();
</script>
