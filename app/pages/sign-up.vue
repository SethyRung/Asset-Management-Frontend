<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as zod from "zod";

definePageMeta({
  layout: "blank",
});

const toast = useToast();

const schema = zod
  .object({
    firstName: zod.string({ message: "First name is required" }),
    lastName: zod.string({ message: "Last name is required" }),
    username: zod.string({ message: "Username is required" }),
    email: zod.string({ message: "Email is required" }).email("Invalid email"),
    password: zod.string({ message: "Password is required" }),
    confirmPassword: zod.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = zod.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  firstName: undefined,
  lastName: undefined,
  username: undefined,
  email: undefined,
  password: undefined,
  confirmPassword: undefined,
});

const isShowPassword = ref<boolean>(false);
const isShowConfirmPassword = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSubmitting.value = true;

  const response = await useApi("/api/auth/sign-up", {
    method: "POST",
    body: {
      firstName: event.data.firstName,
      lastName: event.data.lastName,
      username: event.data.username,
      email: event.data.email,
      password: event.data.password,
    },
  });

  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Success",
      description: "Your account has been successfully created.",
      color: "success",
    });
    navigateTo("/sign-in");
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }

  isSubmitting.value = false;
};
</script>

<template>
  <div
    class="w-full min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="w-full m-4 md:mt-0 sm:max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Sign up for an account
        </h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4"
          @submit="onSubmit"
        >
          <div class="w-full flex gap-2">
            <UFormField label="First name" size="xl" name="firstName">
              <UInput v-model="state.firstName" class="w-full" />
            </UFormField>
            <UFormField label="Last name" size="xl" name="lastName">
              <UInput v-model="state.lastName" size="xl" class="w-full" />
            </UFormField>
          </div>
          <UFormField label="Username" size="xl" name="username">
            <UInput v-model="state.username" class="w-full" />
          </UFormField>
          <UFormField label="Email" size="xl" name="email">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>
          <UFormField label="Password" size="xl" name="password">
            <UInput
              v-model="state.password"
              :type="isShowPassword ? 'text' : 'password'"
              :ui="{ root: 'w-full', trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="isShowPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  @click="isShowPassword = !isShowPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UFormField label="Confirm password" size="xl" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              :type="isShowConfirmPassword ? 'text' : 'password'"
              :ui="{ root: 'w-full', trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="
                    isShowConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                  "
                  @click="isShowConfirmPassword = !isShowConfirmPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton type="submit" size="xl" :loading="isSubmitting" block>
            Sign up
          </UButton>
          <p class="text-sm text-center text-gray-500">
            Already have an account?
            <UButton label="Login here" variant="link" to="/sign-in" />
          </p>
        </UForm>
      </div>
    </div>
  </div>
</template>
