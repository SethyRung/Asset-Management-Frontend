<template>
  <div
    class="flex items-center justify-end flex-wrap gap-6 space-x-2 py-4 font-ibmPlexSans transition-all duration-300 ease-out"
  >
    <div class="text-sm text-zinc-700 flex items-center gap-2">
      Rows per page
      <Select :default-value="itemPerPage.toString()">
        <SelectTrigger class="w-20 h-8">
          <SelectValue :placeholder="itemPerPage.toString()" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="10"> 10 </SelectItem>
          <SelectItem value="25"> 25 </SelectItem>
          <SelectItem value="50"> 50 </SelectItem>
          <SelectItem value="100"> 100 </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <Pagination
      v-slot="{ page }"
      :total="totalItem"
      show-edges
      :default-page="1"
      :items-per-page="itemPerPage"
    >
      <PaginationList class="flex items-center gap-1">
        <PaginationFirst class="size-8" />
        <PaginationPrev class="size-8" />
        <div class="text-sm text-zinc-700">
          {{ 1 + (page - 1) * itemPerPage }} -
          {{
            page * itemPerPage > totalItem
              ? totalItem - (page - 1) * itemPerPage
              : page * itemPerPage
          }}
          of
          {{ totalItem }}
        </div>
        <PaginationNext class="size-8" />
        <PaginationLast class="size-8" />
      </PaginationList>
    </Pagination>
  </div>
</template>
<script setup lang="ts">
import {
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ref } from "vue";

const itemPerPage = ref<number>(10);

withDefaults(
  defineProps<{
    totalItem: number;
  }>(),
  {
    totalItem: 0,
  },
);
</script>
