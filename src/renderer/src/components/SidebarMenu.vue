<template>
  <div
    class="min-h-screen flex flex-col justify-between gap-4 py-2 bg-white ring-1 ring-zinc-300 rounded-md transition-all duration-300 ease-out"
    :class="isCollapsed ? 'w-[52px]' : 'w-56'"
  >
    <nav class="grid gap-1 px-2">
      <template v-for="(link, index) of links">
        <TooltipProvider v-if="isCollapsed" :key="`1-${index}`">
          <Tooltip>
            <TooltipTrigger as-child>
              <RouterLink
                :to="link.path"
                :active-class="
                  cn(
                    buttonVariants({ variant: 'default', size: 'icon' }),
                    'h-9 w-9 hover:text-white',
                  )
                "
                :class="
                  cn(
                    buttonVariants({ variant: 'ghost', size: 'icon' }),
                    'h-9 w-9',
                  )
                "
              >
                <Icon :icon="link.icon" class="size-4" />
                <span class="sr-only">{{ link.title }}</span>
              </RouterLink>
            </TooltipTrigger>
            <TooltipContent side="right" class="flex items-center gap-4">
              {{ link.title }}
              <span v-if="link.label" class="ml-auto text-muted-foreground">
                {{ link.label }}
              </span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <RouterLink
          v-else
          :key="`2-${index}`"
          :to="link.path"
          :active-class="
            cn(
              buttonVariants({ variant: 'default', size: 'sm' }),
              'hover:text-white',
              'justify-start cursor-pointer',
            )
          "
          :class="
            cn(
              buttonVariants({ variant: 'ghost', size: 'sm' }),
              'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
              'justify-start cursor-pointer',
            )
          "
        >
          <Icon :icon="link.icon" class="mr-2 size-4" />
          {{ link.title }}
          <span
            v-if="link.label"
            class="ml-auto text-background dark:text-white"
          >
            {{ link.label }}
          </span>
        </RouterLink>
      </template>
    </nav>
    <p v-show="!isCollapsed" class="w-fit mx-auto pb-4 text-xs text-zinc-500">
      Version 1.0.0
    </p>
  </div>
  <div></div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavProps {
  links: LinkProp[];
}

defineProps<NavProps>();

const isCollapsed = defineModel<boolean>("isCollapsed");

export interface LinkProp {
  title: string;
  label?: string;
  icon: string;
  path: string;
}
</script>
