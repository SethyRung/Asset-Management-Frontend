<template>
  <UModal
    v-model:open="isModalOpen"
    :title="title"
    :ui="{ content: 'max-w-96' }"
  >
    <template #body>
      <p>{{ content }}</p>
      <div class="mt-6 flex justify-end gap-2">
        <UButton
          size="xl"
          color="neutral"
          variant="outline"
          class="w-20 justify-center"
          @click="isModalOpen = false"
        >
          No
        </UButton>
        <UButton
          type="submit"
          size="xl"
          color="neutral"
          class="w-20 justify-center"
          @click="emit('onConfirm')"
        >
          Yes
        </UButton>
      </div>
    </template>
  </UModal>
</template>

<script lang="ts" setup>
const isModalOpen = defineModel("open", { type: Boolean, default: true });
defineProps<{ title: string; content: string }>();
const emit = defineEmits(["onConfirm"]);
</script>
