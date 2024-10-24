<template>
  <Popover v-model:open="open">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        role="combobox"
        :aria-expanded="open"
        :class="
          cn(
            'w-full flex font-normal',
            placeholder ? 'justify-between' : 'justify-end',
            !modelValue && 'text-muted-foreground',
          )
        "
        v-bind="$attrs"
      >
        {{
          modelValue
            ? items.find((item) => item.value === modelValue)?.label
            : placeholder
        }}
        <ChevronDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0">
      <Command>
        <CommandInput class="h-9" placeholder="Search..." />
        <CommandEmpty></CommandEmpty>
        <CommandList>
          <CommandGroup>
            <CommandItem
              v-for="item in items"
              :key="item.value"
              :value="item.value"
              @select="
                (ev) => {
                  if (typeof ev.detail.value === 'string') {
                    modelValue = ev.detail.value;
                  }
                  open = false;
                }
              "
            >
              {{ item.label }}
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    modelValue === item.value ? 'opacity-100' : 'opacity-0',
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-vue-next";
import { ref } from "vue";

const open = ref(false);

defineProps<{
  placeholder?: string;
  items: {
    label: string;
    value: string | number;
  }[];
}>();

const modelValue = defineModel<string | number>();
</script>
