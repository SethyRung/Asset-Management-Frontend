<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import Pagination from "~/components/Inputs/Pagination.vue";

const UButton = resolveComponent("UButton");

const toast = useToast();

const columns: TableColumn<History>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "asset.id",
    header: "Asset Id",
  },
  {
    accessorKey: "asset.name",
    header: "Asset Name",
  },
  {
    accessorKey: "asset.serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "action",
    header: "Action",
  },
  {
    accessorKey: "details",
    header: "Action Details",
  },
  {
    accessorKey: "actionDate",
    header: "Action Date",
    cell: ({ row }) => formatDate(row.original.actionDate, "DD/MM/YYYY"),
  },
  {
    accessorKey: "userId",
    header: "Action By",
  },
];

const search = ref<string>();
const page = ref<number>(0);
const size = ref<number>(10);
const total = ref<number>(0);

const data = ref<Category[]>([]);

const handleSuccess = (
  response: ResponseBody<PaginationResponse<Category>>,
) => {
  if (response.status.code === ResponseStatusCode.OK) {
    const {
      content,
      page: newPage,
      size: newSize,
      totalElements,
    } = response.data;
    data.value = content;
    page.value = newPage;
    size.value = newSize;
    total.value = totalElements;
  } else {
    toast.add({
      title: "Error",
      description: response.status.message,
      color: "error",
    });
  }
};

const {
  data: response,
  status,
  execute: getCategory,
} = await useFetchApi<PaginationResponse<Category>>("/api/history", {
  method: "GET",
  query: {
    search: search,
    page: page,
    size: size,
  },
  watch: false,
  lazy: true,
});
if (status.value === "success" && response.value) {
  handleSuccess(response.value);
}

watch([page, size], () => {
  getCategory();
});

watch(response, (newResponse) => {
  if (newResponse) {
    handleSuccess(newResponse);
  }
});
</script>

<template>
  <div class="w-full h-full p-4 relative">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">History</h1>
    </div>
    <UButtonGroup
      class="w-full mobile:w-64 mb-6 left-[100%] translate-x-[-100%]"
    >
      <UInput
        v-model="search"
        color="neutral"
        variant="outline"
        placeholder="Search ..."
        :ui="{ root: 'grow' }"
      />

      <UTooltip text="Search">
        <UButton color="neutral" icon="i-lucide-search" @click="getCategory" />
      </UTooltip>
    </UButtonGroup>
    <UTable :columns="columns" :data="data" class="flex-1" />
    <Pagination
      v-model:page="page"
      v-model:items-per-page="size"
      :total="total"
    />
  </div>
</template>
