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
          class="space-y-4 md:space-y-6"
          @submit="onSubmit"
        >
          <div class="w-full flex gap-2">
            <UFormField label="First name" name="firstName">
              <UInput
                v-model="state.firstName"
                size="xl"
                :ui="{ root: 'w-full' }"
              />
            </UFormField>
            <UFormField label="Last name" name="lastName">
              <UInput
                v-model="state.lastName"
                size="xl"
                :ui="{ root: 'w-full' }"
              />
            </UFormField>
          </div>
          <UFormField label="Username" name="username">
            <UInput
              v-model="state.username"
              size="xl"
              :ui="{ root: 'w-full' }"
            />
          </UFormField>
          <UFormField label="Email" name="email">
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
          <UButton type="submit" size="xl" class="w-full justify-center">
            Sign up
          </UButton>
          <p
            class="text-sm text-center font-light text-gray-500 dark:text-gray-400"
          >
            Already have an account?
            <NuxtLink
              to="/sign-in"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
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

const schema = z
  .object({
    firstName: z.string({ message: "First name is required" }),
    lastName: z.string({ message: "Last name is required" }),
    username: z.string({ message: "Username is required" }),
    email: z.string({ message: "Email is required" }).email("Invalid email"),
    password: z.string({ message: "Password is required" }),
    confirmPassword: z.string({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Schema = z.output<typeof schema>;

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

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
};
</script>
