<template>
  <UPopover>
    <UButton :color="color" :variant="variant" icon="i-lucide-calendar">
      <template v-if="modelValue.start">
        <template v-if="modelValue.end">
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }} -
          {{ df.format(modelValue.end.toDate(getLocalTimeZone())) }}
        </template>

        <template v-else>
          {{ df.format(modelValue.start.toDate(getLocalTimeZone())) }}
        </template>
      </template>
      <template v-else> Pick a date </template>
    </UButton>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = shallowRef({
  start: new CalendarDate(2022, 1, 20),
  end: new CalendarDate(2022, 2, 10),
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
  }>(),
  { color: "neutral", variant: "subtle" },
);
</script>
