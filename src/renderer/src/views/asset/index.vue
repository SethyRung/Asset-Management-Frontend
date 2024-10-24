<template>
  <div class="w-full overflow-auto p-4 font-ibmPlexSans">
    <div class="w-full flex justify-between items-center flex-wrap gap-6">
      <h1 class="font-medium text-xl">Asset</h1>
      <Button variant="outline" size="sm" @click="isFormOpen = true">
        <Icon icon="lucide:circle-plus" class="mr-2 h-5 w-5" />
        <span>Add Asset</span>
      </Button>
    </div>
    <div class="max-w-96 w-full mt-6 mb-4 ml-auto flex gap-2">
      <Input type="text" placeholder="Search..." />
      <Button> Search </Button>
    </div>
    <AssetDataTable />
    <AssetForm v-model:open="isFormOpen" action="Create" />
  </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/vue";
import AssetDataTable from "@/components/asset/AssetDataTable.vue";
import AssetForm from "@/components/asset/AssetForm.vue";
import { ref } from "vue";

const isFormOpen = ref<boolean>(false);
</script>
