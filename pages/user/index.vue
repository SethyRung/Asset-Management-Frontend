<template>
  <div class="w-full h-full p-4 relative">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">User</h1>
      <UButton
        color="neutral"
        variant="outline"
        icon="i-lucide-circle-plus"
        label="Add User"
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
      :title="`${action} User`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <UserForm
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
      title="Delete User"
      content="Are you sure to delete this user?"
      @update:open="action = 'Create'"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { User } from "~/types/User";
import UserForm from "~/components/Forms/UserForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const columns: TableColumn<User>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => formatDate(row.original.joinDate, "DD/MM/YYYY"),
  },
  {
    accessorKey: "role",
    header: "Role",
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

const getRowItems = (row: Row<User>) => {
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

const data = ref<User[]>([]);
data.value = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    joinDate: "2021-01-01",
    status: true,
    role: "Admin",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    joinDate: "2021-02-01",
    status: true,
    role: "User",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    username: "alicejohnson",
    email: "alice.johnson@example.com",
    joinDate: "2021-03-01",
    status: true,
    role: "Audit",
  },
];
const action = ref<"Create" | "Edit" | "Delete" | "View">("Create");
const isModalOpen = ref<boolean>(false);
</script>
