<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <UFormField label="Asset" name="asset">
      <USelectMenu
        v-model="state.asset"
        placeholder="Select Asset"
        size="xl"
        label-key="name"
        value-key="id"
        :items="assetList"
        :search-input="false"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Maintenance Date" name="maintenanceDate">
      <DatePicker
        v-model="state.maintenanceDate"
        variant="outline"
        placeholder="Warranty Expiry Date"
        size="xl"
        :ui="{ base: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Description" name="description">
      <UInput v-model="state.description" size="xl" :ui="{ root: 'w-full' }" />
    </UFormField>

    <UFormField label="Cost" name="cost">
      <UInput v-model="state.cost" size="xl" :ui="{ root: 'w-full' }" />
    </UFormField>

    <UFormField label="Performed By" name="performedBy">
      <USelectMenu
        v-model="state.performedBy"
        placeholder="Select User"
        size="xl"
        label-key="username"
        value-key="id"
        :items="userList"
        :search-input="false"
        class="w-full"
      />
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
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import DatePicker from "../Inputs/DatePicker.vue";
import type { Asset } from "~/types/Asset";
import type { User } from "~/types/User";

const toast = useToast();

const schema = z.object({
  asset: z.number(),
  maintenanceDate: z.date(),
  description: z.string().min(8, "Must be at least 8 characters"),
  cost: z.number(),
  performedBy: z.number(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  asset: undefined,
  maintenanceDate: undefined,
  description: undefined,
  cost: undefined,
  performedBy: undefined,
});

const assetList = ref<Asset[]>([
  {
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
]);

const userList = ref<User[]>([
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
]);

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
