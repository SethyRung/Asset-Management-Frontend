<template>
  <UPopover v-model:open="open">
    <UButton
      :color="color"
      :variant="variant"
      :size="size"
      icon="i-lucide-calendar"
      :disabled="disabled"
      :ui="ui"
      @click="open = true"
    >
      {{ df.format(value.toDate(getLocalTimeZone())) }}
    </UButton>

    <template #content>
      <UCalendar v-model="value" class="p-2" />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const open = ref(false);

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = defineModel<Date>();

const value = ref<CalendarDate>(
  modelValue.value
    ? new CalendarDate(
        modelValue.value.getFullYear(),
        modelValue.value.getMonth() + 1, //because Date().getMonth() start from 0 instead of 1
        modelValue.value.getDate(),
      )
    : new CalendarDate(
        new Date().getFullYear(),
        new Date().getMonth() + 1, //because Date().getMonth() start from 0 instead of 1
        new Date().getDate(),
      ),
);

watch(value, (newValue) => {
  modelValue.value = newValue.toDate(getLocalTimeZone());
});

withDefaults(
  defineProps<{
    color?:
      | "primary"
      | "secondary"
      | "tertiary"
      | "info"
      | "success"
      | "warning"
      | "error"
      | "neutral";
    variant?: "link" | "solid" | "outline" | "soft" | "subtle" | "ghost";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean;
    ui?: {
      base?: string;
      label?: string;
      leadingIcon?: string;
      leadingAvatar?: string;
      leadingAvatarSize?: string;
      trailingIcon?: string;
    };
  }>(),
  {
    color: "neutral",
    variant: "subtle",
    size: "sm",
    disabled: false,
    ui: undefined,
  },
);
</script>
