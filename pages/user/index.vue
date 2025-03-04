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
        v-model="search"
        color="neutral"
        variant="outline"
        placeholder="Search ..."
        :ui="{ root: 'grow' }"
      />

      <UTooltip text="Search">
        <UButton color="neutral" icon="i-lucide-search" @click="getUsers" />
      </UTooltip>
    </UButtonGroup>
    <UTable
      :columns="columns"
      :data="data"
      :loading="status === 'pending'"
      class="flex-1"
    />
    <Pagination
      v-model:page="page"
      v-model:items-per-page="size"
      :total="total"
    />
    <UModal
      v-model:open="isModalOpen"
      :title="`${action} User`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <UserForm
          :action="action"
          :initial-data="seletedUser"
          @on-cancel="clearData()"
          @on-submitted="
            () => {
              clearData();
              getUsers();
            }
          "
        />
      </template>
    </UModal>
    <DeleteDialog
      :open="action === 'Delete'"
      title="Delete User"
      content="Are you sure to delete this user?"
      @update:open="(action = 'Create')"
      @on-confirm="handleDeleteUser(seletedUser!.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { User } from "~/types/User";
import UserForm from "~/components/Forms/UserForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";
import Pagination from "~/components/Inputs/Pagination.vue";
import type { FormAction } from "~/types/FormAction";
import { ResponseStatusCode } from "~/enums/base";
import type { PaginationResponse } from "~/types/PaginationResponse";
import type { ResponseBody } from "~/types/ResponseBody";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");
const UBadge = resolveComponent("UBadge");

const toast = useToast();
const { start, finish } = useLoadingIndicator();

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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return h(UBadge, {
        color: row.original.status ? "success" : "error",
        variant: "outline",
        label: row.original.status ? "Active" : "Inactive",
      });
    },
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

const seletedUser = ref<User>();

const getRowItems = (row: Row<User>) => {
  return [
    {
      label: "View",
      icon: "i-lucide-eye",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "View";
        seletedUser.value = row.original;
      },
    },
    {
      label: "Edit",
      icon: "i-lucide-file-pen",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "Edit";
        seletedUser.value = row.original;
      },
    },
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash-2",
      onSelect: () => {
        action.value = "Delete";
        seletedUser.value = row.original;
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

const data = ref<User[]>([]);

const handleSuccess = (response: ResponseBody<PaginationResponse<User>>) => {
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
  execute: getUsers,
} = await useFetchApi<PaginationResponse<User>>("/api/users", {
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
  getUsers();
});

watch(response, (newResponse) => {
  if (newResponse) {
    handleSuccess(newResponse);
  }
});

const handleDeleteUser = async (id: number) => {
  start();

  const response = await useApi<User>(`/api/users/${id}`, {
    method: "DELETE",
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "User has been successfully deleted.",
      color: "success",
    });
    getUsers();
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
  seletedUser.value = undefined;
};
</script>
