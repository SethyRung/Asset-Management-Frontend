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
        placeholder="Name of Asset"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Serial Number" name="serialNumber">
      <UInput
        v-model="state.serialNumber"
        placeholder="Serial Number"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Category" name="categoryId">
      <USelectMenu
        v-model="state.categoryId"
        placeholder="Select Category"
        size="xl"
        label-key="name"
        value-key="id"
        :items="categoryList"
        :search-input="false"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Location" name="location">
      <UInput
        v-model="state.location"
        placeholder="Location"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Status" name="status">
      <USelectMenu
        v-model="state.status"
        placeholder="Select Status"
        size="xl"
        :items="statusList"
        :search-input="false"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Acquisition Date" name="acquisitionDate">
      <DatePicker
        v-model="state.acquisitionDate"
        variant="outline"
        placeholder="Acquisition Date"
        size="xl"
        :ui="{ base: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Warranty Expiry Date" name="warrantyExpiryDate">
      <DatePicker
        v-model="state.warrantyExpiryDate"
        variant="outline"
        placeholder="Warranty Expiry Date"
        size="xl"
        :ui="{ base: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Assigned To" name="assignedTo">
      <UInput
        v-model="state.assignedTo"
        placeholder="Assigned To"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Documents" name="documents">
      <UInput
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
          <template #trailing>
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

    <div class="flex justify-between">
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
import DatePicker from "../Inputs/DatePicker.vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import type { Category } from "~/types/Category";

const toast = useToast();

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  serialNumber: z.string().min(1, "Serial Number is required"),
  categoryId: z.number().min(1, "Category ID is required"),
  status: z
    .enum(["Active", "Inactive", "Repair"])
    .refine((val) => val !== undefined, {
      message: "Status is required",
    }),
  location: z.string().min(1, "Location is required"),
  acquisitionDate: z.date(),
  warrantyExpiryDate: z.date(),
  assignedTo: z.number().min(1, "Assigned To is required"),
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

const categoryList = ref<Category[]>([
  { id: 1, name: "Computer", description: "Electronic device for computing" },
  { id: 2, name: "Printer", description: "Device for printing documents" },
  { id: 3, name: "Router", description: "Device for routing network traffic" },
  { id: 4, name: "Monitor", description: "Display screen for computers" },
  { id: 5, name: "Keyboard", description: "Input device for typing" },
]);

const statusList = ref<("Active" | "Inactive" | "Repair")[]>([
  "Active",
  "Inactive",
  "Repair",
]);

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    const fileNames = Array.from(input.files).map((file) => file.name);
    state.documents = [...(state.documents || []), ...fileNames];
  }
};

const handleRemoveDocument = (document: string) => {
  state.documents = state.documents?.filter((doc) => doc !== document);
};

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
};

const emit = defineEmits(["onCancel"]);
</script>
