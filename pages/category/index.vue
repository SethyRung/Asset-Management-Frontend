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
    <UModal
      v-model:open="isModalOpen"
      :title="`${action} Category`"
      :ui="{ content: 'max-w-96' }"
    >
      <template #body>
        <CategoryForm
          :action="action"
          :initial-data="seletedCategory"
          @on-cancel="clearData()"
          @on-submitted="
            () => {
              clearData();
              getCategory();
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
      @on-confirm="handleDeleteCategory(seletedCategory!.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { TableColumn } from "@nuxt/ui";
import type { Row } from "@tanstack/vue-table";
import type { Category } from "~/types/Category";
import CategoryForm from "~/components/Forms/CategoryForm.vue";
import DeleteDialog from "~/components/Dialogs/DeleteDialog.vue";
import Pagination from "~/components/Inputs/Pagination.vue";
import { ResponseStatusCode } from "~/enums/base";
import type { ResponseBody } from "~/types/ResponseBody";
import type { PaginationResponse } from "~/types/PaginationResponse";
import type { FormAction } from "~/types/FormAction";

const UButton = resolveComponent("UButton");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const toast = useToast();
const { start, finish } = useLoadingIndicator();

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

const seletedCategory = ref<Category>();

const getRowItems = (row: Row<Category>) => {
  return [
    {
      label: "View",
      icon: "i-lucide-eye",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "View";
        seletedCategory.value = row.original;
      },
    },
    {
      label: "Edit",
      icon: "i-lucide-file-pen",
      onSelect: () => {
        isModalOpen.value = true;
        action.value = "Edit";
        seletedCategory.value = row.original;
      },
    },
    {
      label: "Delete",
      color: "error",
      icon: "i-lucide-trash-2",
      onSelect: () => {
        action.value = "Delete";
        seletedCategory.value = row.original;
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
      description: response.status.errorMessage,
      color: "error",
    });
  }
};

const {
  data: response,
  status,
  execute: getCategory,
} = await useFetchApi<PaginationResponse<Category>>("/api/categories", {
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

const handleDeleteCategory = async (id: number) => {
  start();

  const response = await useApi<Category>(`/api/categories/${id}`, {
    method: "DELETE",
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Category has been successfully deleted.",
      color: "success",
    });
    getCategory();
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
  seletedCategory.value = undefined;
};
</script>
