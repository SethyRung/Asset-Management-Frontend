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
      <UCalendar v-model="modelValue" class="p-2" :number-of-months="1" range />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import dayjs from "dayjs";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const now = dayjs();

const modelValue = shallowRef({
  start: new CalendarDate(now.year(), now.month(), 1),
  end: new CalendarDate(
    now.year(),
    now.month(),
    now.endOf("month").daysInMonth(),
  ),
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
