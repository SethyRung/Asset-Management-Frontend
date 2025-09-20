<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <UFormField label="Serial Number" name="serialNumber">
      <UInput
        v-model="state.serialNumber"
        :disabled="isDisabled"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Maintenance Date" name="maintenanceDate">
      <DatePicker
        v-model="state.maintenanceDate"
        :disabled="isDisabled"
        variant="outline"
        placeholder="Warranty Expiry Date"
        size="xl"
        :ui="{ base: 'w-full' }"
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

    <UFormField label="Cost" name="cost">
      <UInput
        v-model="state.cost"
        type="number"
        :disabled="isDisabled"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Performed By" name="performedBy">
      <USelectMenu
        v-model="state.performedBy"
        :disabled="isDisabled"
        placeholder="Select User"
        size="xl"
        label-key="username"
        value-key="id"
        :items="userList"
        :search-input="false"
        class="w-full"
        :loading="statusItems === 'pending'"
      />
    </UFormField>

    <div v-if="!isDisabled" class="flex justify-between">
      <UButton
        size="xl"
        color="neutral"
        variant="outline"
        class="w-20 justify-center"
        @click="emit('onCancel')"
      >
        Cancel
      </UButton>
      <UButton
        type="submit"
        size="xl"
        color="neutral"
        class="w-20 justify-center"
      >
        Save
      </UButton>
    </div>
  </UForm>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import DatePicker from "../Inputs/DatePicker.vue";

const props = withDefaults(
  defineProps<{
    action: FormAction;
    initialData?: Maintenance;
  }>(),
  { initialData: undefined },
);

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const isDisabled = computed(() => props.action === "View");

const schema = z.object({
  serialNumber: z.string(),
  maintenanceDate: z.date(),
  description: z.string(),
  cost: z.number(),
  performedBy: z.number(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  serialNumber: undefined,
  maintenanceDate: undefined,
  description: undefined,
  cost: undefined,
  performedBy: undefined,
});

// set initial form data
if (props.action !== "Create" && props.initialData) {
  const data = props.initialData;
  state.serialNumber = data.asset.serialNumber;
  state.maintenanceDate = convertStringToDate(data.maintenanceDate);
  state.description = data.description;
  state.cost = data.cost;
  state.performedBy = data.performedBy.id;
}

const userList = ref<User[]>([]);
const { data: resItems, status: statusItems } = await useFetchApi<{
  users: User[];
}>("/api/maintenance/items", { method: "GET", lazy: true });

watch(statusItems, (newValue) => {
  if (
    newValue === "success" &&
    resItems.value &&
    resItems.value.status.code === ResponseStatusCode.OK
  ) {
    userList.value = resItems.value.data.users;
  }
});

const isSubmitting = ref<boolean>(false);

const handleCreateMaintenance = async (data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Maintenance>("/api/maintenance", {
    method: "POST",
    body: {
      serialNumber: data.serialNumber,
      maintenanceDate: data.maintenanceDate,
      description: data.description,
      cost: data.cost,
      performedBy: data.performedBy,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Maintenance has been successfully created.",
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

const handleUpdateMaintenance = async (id: number, data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Maintenance>(`/api/maintenance/${id}`, {
    method: "PUT",
    body: {
      serialNumber: data.serialNumber,
      maintenanceDate: data.maintenanceDate,
      description: data.description,
      cost: data.cost,
      performedBy: data.performedBy,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Maintenance has been successfully updated.",
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
    handleCreateMaintenance(event.data);
  } else if (props.action === "Edit" && props.initialData) {
    handleUpdateMaintenance(props.initialData.id, event.data);
  }
};

const emit = defineEmits(["onCancel", "onSubmitted"]);
</script>
