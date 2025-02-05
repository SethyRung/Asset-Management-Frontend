<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput
        v-model="state.name"
        :disabled="isDisabled"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Description" name="description">
      <UInput
        v-model="state.description"
        :disabled="isDisabled"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <div v-if="!isDisabled" class="flex justify-between">
      <UButton
        size="xl"
        color="neutral"
        variant="outline"
        class="w-20 justify-center"
        :disabled="isSubmitting"
        @click="emit('onCancel')"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        size="xl"
        color="neutral"
        class="w-20 justify-center"
        :disabled="isSubmitting"
      >
        Save
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import { ResponseStatusCode } from "~/enums/base";
import type { FormAction } from "~/types/FormAction";
import type { Category } from "~/types//Category";

const props = withDefaults(
  defineProps<{
    action: FormAction;
    initialData?: Category;
  }>(),
  { initialData: undefined },
);

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const isDisabled = computed(() => props.action === "View");

const schema = z.object({
  name: z.string({ message: "Name is required" }),
  description: z.string({ message: "Description is required" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  description: undefined,
});

// set initial form data
if (props.action !== "Create" && props.initialData) {
  const data = props.initialData;
  state.name = data.name;
  state.description = data.description;
}

const isSubmitting = ref<boolean>(false);

const handleCreateCategory = async (data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Category>("/api/categories", {
    method: "POST",
    body: {
      name: data.name,
      description: data.description,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Category has been successfully created.",
      color: "success",
    });
    emit("onSubmitted");
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }

  isSubmitting.value = false;
  finish();
};

const handleUpdateCategory = async (id: number, data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Category>(`/api/categories/${id}`, {
    method: "PUT",
    body: {
      name: data.name,
      description: data.description,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Category has been successfully updated.",
      color: "success",
    });
    emit("onSubmitted");
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }

  isSubmitting.value = false;
  finish();
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (props.action === "Create") {
    handleCreateCategory(event.data);
  } else if (props.action === "Edit" && props.initialData) {
    handleUpdateCategory(props.initialData.id, event.data);
  }
};

const emit = defineEmits(["onCancel", "onSubmitted"]);
</script>
