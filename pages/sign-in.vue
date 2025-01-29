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
          Sign in to your account
        </h1>
        <UForm
          :schema="schema"
          :state="state"
          class="space-y-4 md:space-y-6"
          @submit="onSubmit"
        >
          <UFormField label="Your email" name="email">
            <UInput v-model="state.email" size="xl" :ui="{ root: 'w-full' }" />
          </UFormField>
          <UFormField label="Password" name="password">
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
          <div class="flex items-center justify-end">
            <NuxtLink
              to="forgot-password"
              class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </NuxtLink>
          </div>
          <UButton type="submit" size="xl" class="w-full justify-center">
            Sign in
          </UButton>
          <p
            class="text-sm text-center font-light text-gray-500 dark:text-gray-400"
          >
            Don’t have an account yet?
            <NuxtLink
              to="/sign-up"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
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

definePageMeta({
  layout: "blank",
});

const toast = useToast();

const schema = z.object({
  email: z.string({ message: "Email is required" }).email("Invalid email"),
  password: z.string({ message: "Password is required" }),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const isShowPassword = ref<boolean>(false);

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
};
</script>
