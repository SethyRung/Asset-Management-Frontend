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
        color="neutral"
        variant="outline"
        placeholder="Search ..."
        :ui="{ root: 'grow' }"
      />

      <UTooltip text="Search">
        <UButton color="neutral" icon="i-lucide-search" />
      </UTooltip>
    </UButtonGroup>
    <UTable :columns="columns" :data="data" class="flex-1" />
    <UModal
      v-model:open="isModalOpen"
      :title="`${action} Asset`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <AssetForm
          @on-cancel="
            () => {
              isModalOpen = true;
              action = 'Create';
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
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Asset } from "~/types/Asset";
import AssetForm from "~/components/Forms/AssetForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

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
    accessorKey: "categoryId",
    header: "Category ID",
  },
  {
    accessorKey: "status",
    header: "Status",
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

const getRowItems = (row: Row<Asset>) => {
  return [
    {
      label: "View",
      icon: "i-lucide-eye",
    },
    {
      label: "Edit",
      icon: "i-lucide-file-pen",
    },
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash-2",
      onSelect: () => {
        action.value = "Delete";
      },
    },
  ];
};

const data = ref<Asset[]>([
  {
    id: 1,
    name: "Laptop",
    serialNumber: "SN123456",
    categoryId: 1,
    status: "Active",
    location: "Office",
    acquisitionDate: "2022-01-15",
    assignedTo: 101,
    warrantyExpiryDate: "2023-01-15",
    documents: ["invoice.pdf", "warranty.pdf"],
  },
  {
    id: 2,
    name: "Projector",
    serialNumber: "SN654321",
    categoryId: 2,
    status: "Repair",
    location: "Repair Center",
    acquisitionDate: "2021-05-20",
    assignedTo: 102,
    warrantyExpiryDate: "2023-05-20",
    documents: ["invoice.pdf", "warranty.pdf"],
  },
  {
    id: 3,
    name: "Printer",
    serialNumber: "SN789012",
    categoryId: 3,
    status: "Active",
    location: "Office",
    acquisitionDate: "2020-11-10",
    assignedTo: 103,
    warrantyExpiryDate: "2022-11-10",
    documents: ["invoice.pdf", "warranty.pdf"],
  },
]);
const action = ref<"Create" | "Edit" | "Delete" | "View">("Create");
const isModalOpen = ref<boolean>(false);
</script>
