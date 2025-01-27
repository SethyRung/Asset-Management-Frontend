<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <UFormField label="First Name" name="firstName">
      <UInput
        v-model="state.firstName"
        placeholder="First Name"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Last Name" name="lastName">
      <UInput
        v-model="state.lastName"
        placeholder="Last Name"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Username" name="username">
      <UInput
        v-model="state.username"
        placeholder="Username"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        placeholder="Email"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Role" name="role">
      <USelect
        v-model="state.role"
        placeholder="Select role"
        size="xl"
        :ui="{ base: 'w-full' }"
        :items="roleOptions"
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

const toast = useToast();

const roleOptions = ref(["Admin", "User", "Audit"]);

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  joinDate: z.string().min(1, "Join date is required"),
  status: z.boolean(),
  role: z.string().min(1, "Role is required"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  email: undefined,
  joinDate: undefined,
  status: undefined,
  role: undefined,
});

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
