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
          Reset Password
        </h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 md:space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="New Password" name="password">
            <UInput
              v-model="state.password"
              :type="isShowPassword ? 'text' : 'password'"
              size="xl"
              :ui="{ root: 'w-full', trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="isShowPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="
                    isShowPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="isShowPassword"
                  aria-controls="password"
                  @click="isShowPassword = !isShowPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UFormField label="Confirm password" name="confirmPassword">
            <UInput
              v-model="state.confirmPassword"
              :type="isShowConfirmPassword ? 'text' : 'password'"
              size="xl"
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
                  :aria-label="
                    isShowConfirmPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="isShowConfirmPassword"
                  aria-controls="password"
                  @click="isShowConfirmPassword = !isShowConfirmPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton
            type="submit"
            size="xl"
            :disabled="isSubmitting"
            class="w-full justify-center"
          >
            Reset Password
          </UButton>
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
const route = useRoute();

const schema = z
  .object({
    password: z.string({ message: "Password is required" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  password: undefined,
  confirmPassword: undefined,
});

const isShowPassword = ref<boolean>(false);
const isShowConfirmPassword = ref<boolean>(false);

const isSubmitting = ref<boolean>(false);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  start();
  isSubmitting.value = true;

  const response = await useApi("/api/auth/reset-password", {
    method: "POST",
    body: {
      resetId: route.query.resetId,
      newPassword: event.data.password,
      confirmPassword: event.data.confirmPassword,
    },
  });
  if (response.status.code === ResponseStatusCode.OK) {
    toast.add({
      title: "Reset password",
      description: "Password has been reset successfully.",
      color: "success",
    });
    navigateTo("/sign-in", { replace: true });
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
