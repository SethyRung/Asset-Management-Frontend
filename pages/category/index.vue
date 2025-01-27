<template>
  <div class="w-full h-full p-4 relative">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">Category</h1>
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-circle-plus"
        label="Add Category"
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
      :title="`${action} Category`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <CategoryForm
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
      title="Delete Category"
      content="Are you sure to delete this category?"
      @update:open="action = 'Create'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Category } from "~/types/Category";
import CategoryForm from "~/components/Forms/CategoryForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const columns: TableColumn<Category>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
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

const getRowItems = (row: Row<Category>) => {
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

const data = ref<Category[]>([
  {
    id: 1,
    name: "Computer",
    description: "Computer for all user",
  },
]);

const action = ref<"Create" | "Edit" | "Delete" | "View">("Create");
const isModalOpen = ref<boolean>(false);
</script>
