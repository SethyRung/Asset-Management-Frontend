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
        placeholder="Name of Asset"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Serial Number" name="serialNumber">
      <UInput
        v-model="state.serialNumber"
        :disabled="isDisabled"
        placeholder="Serial Number"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Category" name="categoryId">
      <USelectMenu
        v-model="state.categoryId"
        :disabled="isDisabled"
        placeholder="Select Category"
        size="xl"
        label-key="name"
        value-key="id"
        :items="categoryList"
        :search-input="false"
        :loading="statusItems === 'pending'"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Location" name="location">
      <UInput
        v-model="state.location"
        :disabled="isDisabled"
        placeholder="Location"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Status" name="status">
      <USelectMenu
        v-model="state.status"
        placeholder="Select Status"
        :disabled="isDisabled"
        size="xl"
        :items="statusList"
        :search-input="false"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Acquisition Date" name="acquisitionDate">
      <DatePicker
        v-model="state.acquisitionDate"
        :disabled="isDisabled"
        variant="outline"
        placeholder="Acquisition Date"
        size="xl"
        :ui="{ base: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Warranty Expiry Date" name="warrantyExpiryDate">
      <DatePicker
        v-model="state.warrantyExpiryDate"
        :disabled="isDisabled"
        variant="outline"
        placeholder="Warranty Expiry Date"
        size="xl"
        :ui="{ base: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Assigned To" name="assignedTo">
      <USelectMenu
        v-model="state.assignedTo"
        :disabled="isDisabled"
        placeholder="Assigned To"
        size="xl"
        :items="userList"
        label-key="username"
        value-key="id"
        :search-input="false"
        :loading="statusItems === 'pending'"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Documents" name="documents">
      <UInput
        :disabled="isDisabled"
        type="file"
        placeholder="Documents"
        size="xl"
        :ui="{ root: 'w-full' }"
        @change="handleFileUpload"
      />
      <div class="w-full mt-2 flex flex-wrap gap-1">
        <UBadge
          v-for="document in state.documents"
          :key="document"
          color="neutral"
          variant="outline"
          class="rounded-full"
        >
          {{ document }}
          <template v-if="!isDisabled" #trailing>
            <UButton
              icon="i-lucide-x"
              color="error"
              variant="ghost"
              size="xs"
              class="rounded-full"
              @click="handleRemoveDocument(document)"
            />
          </template>
        </UBadge>
      </div>
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
import DatePicker from "../Inputs/DatePicker.vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import { ResponseStatusCode } from "~/enums/base";
import type { Asset } from "~/types/Asset";
import type { Category } from "~/types/Category";
import type { FormAction } from "~/types/FormAction";
import type { User } from "~/types/User";

const props = withDefaults(
  defineProps<{
    action: FormAction;
    initialData?: Asset;
  }>(),
  { initialData: undefined },
);

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const isDisabled = computed(() => props.action === "View");

const schema = z.object({
  name: z.string({ message: "Name is required" }),
  serialNumber: z.string({ message: "Serial Number is required" }),
  categoryId: z.number({ message: "Category is required" }),
  status: z
    .enum(["Active", "Inactive", "Repair"])
    .refine((val) => val !== undefined, {
      message: "Status is required",
    }),
  location: z.string({ message: "Location is required" }),
  acquisitionDate: z.date({ message: "Acquisition date is reguired" }),
  warrantyExpiryDate: z.date({ message: "Warranty expiry date is reguired" }),
  assignedTo: z.number({ message: "Assigned To is required" }),
  documents: z.array(z.string()).min(1, "At least one document is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  serialNumber: undefined,
  categoryId: undefined,
  status: "Active",
  location: undefined,
  acquisitionDate: undefined,
  warrantyExpiryDate: undefined,
  assignedTo: undefined,
  documents: [],
});

// set initial form data
if (props.action !== "Create" && props.initialData) {
  const data = props.initialData;
  state.name = data.name;
  state.serialNumber = data.serialNumber;
  state.categoryId = data.categoryId;
  state.status = data.status;
  state.location = data.location;
  state.acquisitionDate = convertStringToDate(data.acquisitionDate);
  state.warrantyExpiryDate = convertStringToDate(data.warrantyExpiryDate);
  state.assignedTo = data.assignedTo;
  state.documents = data.documents;
}

const categoryList = ref<Category[]>([]);
const userList = ref<User[]>([]);

const { data: resItems, status: statusItems } = await useFetchApi<{
  categories: Category[];
  users: User[];
}>("/api/assets/items", { method: "GET", lazy: true });

watch(statusItems, (newValue) => {
  if (
    newValue === "success" &&
    resItems.value &&
    resItems.value.status.code === ResponseStatusCode.OK
  ) {
    categoryList.value = resItems.value.data.categories;
    userList.value = resItems.value.data.users;
  }
});

const statusList = ref<("Active" | "Inactive" | "Repair")[]>([
  "Active",
  "Inactive",
  "Repair",
]);

const handleFileUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const formData = new FormData();
    formData.append("file", input.files[0]);
    const response = await useApi<string>("/api/files/upload", {
      method: "POST",
      body: formData,
    });
    if (response.status.code === ResponseStatusCode.OK) {
      toast.add({
        title: "Upload File",
        description: "File uploaded successfully!",
        color: "success",
      });
      state.documents = [...(state.documents || []), response.data];
    } else {
      toast.add({
        title: "Upload File",
        description: response.status.errorMessage,
        color: "error",
      });
    }
  }
};

const handleRemoveDocument = (document: string) => {
  state.documents = state.documents?.filter((doc) => doc !== document);
};

const isSubmitting = ref<boolean>(false);

const handleCreateAsset = async (data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Asset>("/api/assets", {
    method: "POST",
    body: {
      name: data.name,
      serialNumber: data.serialNumber,
      categoryId: data.categoryId,
      status: data.status,
      location: data.location,
      assignedTo: data.assignedTo,
      acquisitionDate: data.acquisitionDate,
      warrantyExpiryDate: data.warrantyExpiryDate,
      documents: data.documents,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Asset has been successfully created.",
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

const handleUpdateAsset = async (id: number, data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<Asset>(`/api/assets/${id}`, {
    method: "PUT",
    body: {
      name: data.name,
      serialNumber: data.serialNumber,
      categoryId: data.categoryId,
      status: data.status,
      location: data.location,
      assignedTo: data.assignedTo,
      acquisitionDate: data.acquisitionDate,
      warrantyExpiryDate: data.warrantyExpiryDate,
      documents: data.documents,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Asset has been successfully updated.",
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
    handleCreateAsset(event.data);
  } else if (props.action === "Edit" && props.initialData) {
    handleUpdateAsset(props.initialData.id, event.data);
  }
};

const emit = defineEmits(["onCancel", "onSubmitted"]);
</script>
