<template>
  <Form
    v-slot="{ submitForm }"
    as=""
    :validation-schema="formSchema"
    @submit="onSubmit"
  >
    <Dialog v-model:open="isOpen">
      <DialogContent
        class="w-[calc(100vw_-_32px)] gap-6 sm:max-w-[425px] rounded-md max-h-[calc(100vh_-_32px)] flex flex-col"
      >
        <DialogHeader>
          <DialogTitle>{{ action }} Asset</DialogTitle>
        </DialogHeader>

        <form
          class="px-1 flex flex-col gap-4 overflow-auto grow no-scrollbar"
          @submit="submitForm"
        >
          <FormField v-slot="{ componentField }" name="assetName">
            <FormItem>
              <FormLabel>Asset Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Name of asset"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="serialNumber">
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Serial number"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="category">
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Select category"
                  v-bind="componentField"
                  :items="[
                    { value: 'pc', label: 'Computer' },
                    { value: 'mouse', label: 'Mouse' },
                  ]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Combobox
                  placeholder="Select status"
                  v-bind="componentField"
                  :items="[
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="acquisitionDate">
            <FormItem>
              <FormLabel>Acquisition Date</FormLabel>
              <FormControl>
                <DatePicker v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="expiryDate">
            <FormItem>
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <DatePicker v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="owner">
            <FormItem>
              <FormLabel>Owner</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Asset owner"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="documents">
            <FormItem>
              <FormLabel>Documents</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Choose files"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter class="w-full sm:justify-between gap-4">
          <DialogClose as-child>
            <Button type="button" variant="outline"> Close </Button>
          </DialogClose>
          <Button type="submit" form="dialogForm"> Save </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>
<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Combobox from "../input/Combobox.vue";
import DatePicker from "../input/DatePicker.vue";

import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
  }),
);

const onSubmit = (values: unknown) => {
  console.log(values);
};

const isOpen = defineModel<boolean>("open");
defineProps<{ action: "Create" | "Edit" }>();
</script>
