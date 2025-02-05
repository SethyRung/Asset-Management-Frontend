<template>
  <div :class="containerClass">
    <USelect v-model="itemsPerPage" :items="[10, 25, 50, 100]" class="w-20" />
    <UPagination
      v-model:page="page"
      color="neutral"
      variant="outline"
      :sibling-count="1"
      :items-per-page="itemsPerPage"
      :total="total"
      @update:page="
        (value) => {
          modelPage = value - 1;
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { twMerge } from "tailwind-merge";

const props = withDefaults(defineProps<{ class?: string; total?: number }>(), {
  class: "",
  total: 0,
});

const containerClass = ref<string>(
  twMerge("w-full flex items-center justify-end gap-1", props.class),
);

const itemsPerPage = defineModel("itemsPerPage", { type: Number, default: 10 });

const modelPage = defineModel("page", { type: Number, required: true });
const page = ref<number>(modelPage.value + 1);

watch(modelPage, (newValue) => {
  page.value = newValue + 1;
});
</script>
