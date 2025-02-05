<template>
  <div
    class="w-full min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900"
  >
    <div
      class="w-full mx-4 md:mt-0 sm:max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1
          class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
        >
          Forgot password
        </h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          No worries, we'll send you reset instructions
        </p>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 md:space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="Email" name="email">
            <UInput
              v-model="state.email"
              placeholder="Enter you email"
              size="xl"
              :ui="{ root: 'w-full' }"
            />
          </UFormField>
          <UButton
            type="submit"
            size="xl"
            :loading="isSubmitting"
            class="w-full justify-center"
          >
            Continue
          </UButton>
          <p
            class="text-sm text-center font-light text-gray-500 dark:text-gray-400"
          >
            <NuxtLink
              to="/sign-in"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Back to login
            </NuxtLink>
          </p>
        </UForm>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as z from "zod";
import { ResponseStatusCode } from "~/enums/base";

definePageMeta({
  layout: "blank",
});

const toast = useToast();
const { start, finish } = useLoadingIndicator();

const schema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
});

const isSubmitting = ref<boolean>(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  start();
  isSubmitting.value = true;

  const response = await useApi("/api/auth/reset-password", {
    method: "GET",
    query: {
      email: event.data.email,
    },
  });
  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Forgot password",
      description:
        "Password reset email sent! Check your inbox for instructions.",
      color: "success",
    });
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
</script>
