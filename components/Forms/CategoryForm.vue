<template>
  <UForm
    :schema="schema"
    :state="state"
    class="w-full h-full space-y-6"
    @submit="onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" size="xl" :ui="{ root: 'w-full' }" />
    </UFormField>

    <UFormField label="Description" name="description">
      <UInput v-model="state.description" size="xl" :ui="{ root: 'w-full' }" />
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

const schema = z.object({
  name: z.string().email("Invalid email"),
  description: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  name: undefined,
  description: undefined,
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
