<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'min-w-[280px] w-full flex justify-start text-left font-normal',
            !modelValue && 'text-muted-foreground',
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{
          modelValue
            ? df.format(modelValue.toDate(getLocalTimeZone()))
            : placeholder || "Pick a date"
        }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="modelValue" initial-focus />
    </PopoverContent>
  </Popover>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { Calendar as CalendarIcon } from "lucide-vue-next";

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const modelValue = defineModel<DateValue>();
defineProps<{
  placeholder?: string;
}>();
</script>
