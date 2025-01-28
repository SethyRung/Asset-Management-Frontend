<template>
  <div class="w-full h-full p-4 relative">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">History / Maintenance</h1>
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-circle-plus"
        label="Add Maintenance"
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
      :title="`${action} Maintenance`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <MaintenanceForm
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
      title="Delete Maintenance"
      content="Are you sure to delete this category?"
      @update:open="action = 'Create'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import MaintenanceForm from "~/components/Forms/MaintenanceForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";
import type { Maintenance } from "~/types/Maintenance";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const columns: TableColumn<Maintenance>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "asset.name",
    header: "Asset",
  },
  {
    accessorKey: "maintenanceDate",
    header: "Maintenance Date",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "cost",
    header: "Cost",
  },
  {
    accessorKey: "performedBy",
    header: "Performed By",
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

const getRowItems = (row: Row<Maintenance>) => {
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

const data = ref<Maintenance[]>([
  {
    id: 1,
    asset: {
      id: 1,
      name: "Computer",
      serialNumber: "12345",
      categoryId: 1,
      status: "Active",
      acquisitionDate: "2023-01-01",
      warrantyExpiryDate: "2024-01-01",
      location: "Office",
      assignedTo: 1,
      documents: ["invoice.pdf"],
    },
    maintenanceDate: "2025-10-01",
    description: "Computer for all user",
    cost: 100,
    performedBy: 1,
  },
]);

const action = ref<"Create" | "Edit" | "Delete" | "View">("Create");
const isModalOpen = ref<boolean>(false);
</script>
