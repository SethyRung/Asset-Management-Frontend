<script lang="ts" setup>
import type { FormSubmitEvent } from "@nuxt/ui";
import * as zod from "zod";

definePageMeta({
  layout: "blank",
});

const toast = useToast();

const schema = zod.object({
  email: zod.string({ message: "Email is required" }).email("Invalid email"),
  password: zod.string({ message: "Password is required" }),
});

type Schema = zod.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const isShowPassword = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const isAuthenticated = useCookie<boolean>("isAuthenticated");
isAuthenticated.value = false;

const profileStore = useProfileStore();

const getProfile = async () => {
  const response = await useApi<User>("/api/profile", { method: "GET" });
  if (response.status.code === ResponseStatusCode.OK) {
    Object.assign(profileStore.profile, response.data);
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }
};

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  isSubmitting.value = true;

  const response = await useApi("/api/auth/sign-in", {
    method: "POST",
    body: {
      email: event.data.email,
      password: event.data.password,
    },
  });
  if (response.status.code === ResponseStatusCode.OK) {
    isAuthenticated.value = true;
    await getProfile();
    navigateTo("/", { replace: true });
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
          class="space-y-4"
          @submit="onSubmit"
        >
          <UFormField label="Your email" name="email" size="xl">
            <UInput v-model="state.email" class="w-full" />
          </UFormField>
          <UFormField label="Password" name="password" size="xl">
            <UInput
              v-model="state.password"
              :type="isShowPassword ? 'text' : 'password'"
              :ui="{ root: 'w-full', trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  :icon="isShowPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  @click="isShowPassword = !isShowPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <div class="flex justify-end">
            <UButton
              label="Forgot password?"
              variant="ghost"
              to="forgot-password"
            />
          </div>
          <UButton type="submit" size="xl" :loading="isSubmitting" block>
            Sign in
          </UButton>
          <p class="text-sm text-center text-gray-500">
            Don’t have an account yet?
            <UButton label="Sign up" variant="link" to="/sign-up" />
          </p>
        </UForm>
      </div>
    </div>
  </div>
</template>
