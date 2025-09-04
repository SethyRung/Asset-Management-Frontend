<template>
  <div class="w-full h-full p-4 relative">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">Asset</h1>
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-circle-plus"
        label="Add Asset"
        @click="
          () => {
            isModalOpen = true;
            action = 'Create';
          }
        "
      />
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
        <UButton color="neutral" icon="i-lucide-search" @click="getAsset" />
      </UTooltip>
    </UButtonGroup>
    <UTable
      :loading="status === 'pending'"
      :columns="columns"
      :data="data"
      class="flex-1"
    />
    <Pagination
      v-model:page="page"
      v-model:items-per-page="size"
      :total="total"
    />
    <UModal
      v-model:open="isModalOpen"
      :title="`${action} Asset`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <AssetForm
          :action="action"
          :initial-data="seletedAsset"
          @on-cancel="clearData()"
          @on-submitted="
            () => {
              clearData();
              getAsset();
            }
          "
        />
      </template>
    </UModal>
    <DeleteDialog
      :open="action === 'Delete'"
      title="Delete Asset"
      content="Are you sure to delete this asset?"
      @update:open="action = 'Create'"
      @on-confirm="handleDeleteAsset(seletedAsset!.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import Pagination from "~/components/Inputs/Pagination.vue";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UBadge = resolveComponent("UBadge");

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const categoryList = ref<Category[]>([]);
const userList = ref<User[]>([]);

const { data: resItems, status: statusItems } = await useFetchApi<{
  categories: Category[];
  users: User[];
}>("/api/assets/items", { method: "GET" });

if (
  statusItems.value === "success" &&
  resItems.value &&
  resItems.value.status.code === ResponseStatusCode.OK
) {
  categoryList.value = resItems.value.data.categories;
  userList.value = resItems.value.data.users;
}

const columns: TableColumn<Asset>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => {
      return categoryList.value.find(({ id }) => id === row.original.categoryId)
        ?.name;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return h(
        UBadge,
        {
          color:
            row.original.status === "Active"
              ? "success"
              : row.original.status === "Repair"
                ? "primary"
                : "error",
          variant: "outline",
        },
        row.original.status,
      );
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "acquisitionDate",
    header: "Acquisition Date",
    cell: ({ row }) => formatDate(row.original.acquisitionDate, "DD/MM/YYYY"),
  },
  {
    accessorKey: "warrantyExpiryDate",
    header: "Warranty Expiry Date",
    cell: ({ row }) =>
      formatDate(row.original.warrantyExpiryDate, "DD/MM/YYYY"),
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }) => {
      return userList.value.find(({ id }) => id === row.original.assignedTo)
        ?.username;
    },
  },
  {
    accessorKey: "documents",
    header: "Documents",
    cell: ({ row }) => row.original.documents.join(", "),
  },
  {
    id: "actions",
    header: () => h("div", { class: "text-center" }, "Actions"),
    cell: ({ row }) => {
      return h(
        "div",
        { class: "text-center" },
        h(
          UDropdownMenu,
          {
            content: {
              align: "end",
            },
            items: getRowItems(row),
          },
          () =>
            h(UButton, {
              icon: "i-lucide-ellipsis-vertical",
              color: "neutral",
              variant: "ghost",
              class: "ml-auto",
            }),
        ),
      );
    },
    meta: {
      class: {
        th: "w-12",
      },
    },
  },
];

const seletedAsset = ref<Asset>();

const getRowItems = (row: Row<Asset>) => {
  return [
    {
      label: "View",
      icon: "i-lucide-eye",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "View";
        seletedAsset.value = row.original;
      },
    },
    {
      label: "Edit",
      icon: "i-lucide-file-pen",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "Edit";
        seletedAsset.value = row.original;
      },
    },
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash-2",
      onSelect: () => {
        action.value = "Delete";
        seletedAsset.value = row.original;
      },
    },
  ];
};

const action = ref<FormAction>("Create");
const isModalOpen = ref<boolean>(false);

const search = ref<string>();
const page = ref<number>(0);
const size = ref<number>(10);
const total = ref<number>(0);

const data = ref<Asset[]>([]);

const handleSuccess = (response: ResponseBody<PaginationResponse<Asset>>) => {
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
      description: response.status.errorMessage,
      color: "error",
    });
  }
};

const {
  data: response,
  status,
  execute: getAsset,
} = await useFetchApi<PaginationResponse<Asset>>("/api/assets", {
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
  getAsset();
});

watch(response, (newResponse) => {
  if (newResponse) {
    handleSuccess(newResponse);
  }
});

const handleDeleteAsset = async (id: number) => {
  start();

  const response = await useApi<Asset>(`/api/assets/${id}`, {
    method: "DELETE",
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Asset has been successfully deleted.",
      color: "success",
    });
    getAsset();
    clearData();
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }

  finish();
};

const clearData = () => {
  isModalOpen.value = false;
  action.value = "Create";
  seletedAsset.value = undefined;
};
</script>
