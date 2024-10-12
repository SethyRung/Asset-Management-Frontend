<template>
  <div
    class="min-h-16 pr-4 flex justify-between items-center bg-white ring-1 ring-zinc-300"
  >
    <Button
      variant="ghost"
      size="icon"
      class="w-9 h-9 mx-2"
      @click="isSideBarCollapsed = !isSideBarCollapsed"
    >
      <Icon
        :icon="
          isSideBarCollapsed ? 'lucide:sidebar-open' : 'lucide:sidebar-close'
        "
        class="size-4"
      />
    </Button>
    <h1>Asset Management</h1>

    <DropdownMenu>
      <DropdownMenuTrigger as-child>
        <Avatar>
          <AvatarImage src="" alt="" />
          <AvatarFallback>SR</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent class="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon icon="lucide:user" class="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Icon icon="lucide:settings" class="mr-2 h-4 w-4" />
          <span>Setting</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon icon="lucide:log-out" class="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@iconify/vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const isSideBarCollapsed = defineModel<boolean>({ default: true });
</script>
