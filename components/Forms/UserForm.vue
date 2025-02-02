<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <div class="w-full flex gap-2">
      <UFormField label="First name" name="firstName" :ui="{ root: 'w-full' }">
        <UInput
          v-model="state.firstName"
          :disabled="isDisabled"
          size="xl"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>
      <UFormField label="Last name" name="lastName" :ui="{ root: 'w-full' }">
        <UInput
          v-model="state.lastName"
          :disabled="isDisabled"
          size="xl"
          :ui="{ root: 'w-full' }"
        />
      </UFormField>
    </div>

    <UFormField label="Username" name="username">
      <UInput
        v-model="state.username"
        :disabled="isDisabled"
        placeholder="Username"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        :disabled="isDisabled"
        placeholder="Email"
        size="xl"
        :ui="{ root: 'w-full' }"
      />
    </UFormField>

    <UFormField label="Role" name="role">
      <USelect
        v-model="state.role"
        :disabled="isDisabled"
        placeholder="Select role"
        size="xl"
        label-key="label"
        value-key="value"
        :ui="{ base: 'w-full' }"
        :items="roleOptions"
      />
    </UFormField>

    <UFormField label="Profile" name="profile">
      <UInput
        :disabled="isDisabled"
        type="file"
        placeholder="Profile"
        size="xl"
        :ui="{ root: 'w-full' }"
        @change="handleFileUpload"
      />
      <div v-if="state.profile" class="w-full mt-2 flex flex-wrap gap-1">
        <UBadge variant="outline" class="rounded-full">
          {{ state.profile }}
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
        :loading="isSubmitting"
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
import type { User } from "~/types/User";

const props = withDefaults(
  defineProps<{
    action: FormAction;
    initialData?: User;
  }>(),
  { initialData: undefined },
);

const toast = useToast();
const { start, finish } = useLoadingIndicator();
const isDisabled = computed(() => props.action === "View");

const roleOptions = ref([
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
  { label: "Audit", value: "AUDIT" },
]);

const schema = z.object({
  firstName: z.string({ message: "First name is required" }),
  lastName: z.string({ message: "Last name is required" }),
  username: z.string({ message: "Username is required" }),
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  role: z.string({ message: "Role is required" }),
  profile: z.string({ message: "Profile is required" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  email: undefined,
  role: undefined,
  profile: undefined,
});

if (props.action !== "Create" && props.initialData) {
  const data = props.initialData;
  state.firstName = data.firstName;
  state.lastName = data.lastName;
  state.username = data.username;
  state.email = data.email;
  state.role = data.role;
  state.profile = data.email;
}

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
      state.profile = response.data;
    } else {
      toast.add({
        title: "Upload File",
        description: response.status.errorMessage,
        color: "error",
      });
      state.profile = undefined;
    }
  }
};

const isSubmitting = ref<boolean>(false);

const handleCreateUser = async (data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<User>("/api/users", {
    method: "POST",
    body: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      profile: data.profile,
      role: data.role,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "User has been successfully created.",
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

const handleUpdateUser = async (id: number, data: Schema) => {
  start();
  isSubmitting.value = true;

  const response = await useApi<User>(`/api/users/${id}`, {
    method: "PUT",
    body: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      profile: data.profile,
      role: data.role,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "User has been successfully updated.",
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
    handleCreateUser(event.data);
  } else if (props.action === "Edit" && props.initialData) {
    handleUpdateUser(props.initialData.id, event.data);
  }
};

const emit = defineEmits(["onCancel", "onSubmitted"]);
</script>
