<template>
  <div class="w-full h-screen flex justify-center items-center flex-col">
    <Button @click="toggleHelloWorld">Hello World</Button>
    <h1 v-if="isHelloWorldOpened" class="text-blue-500 text-2xl font-bold mt-8">
      Hello World
    </h1>
  </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ref } from "vue";
const isHelloWorldOpened = ref(false);
const toggleHelloWorld = () => {
  isHelloWorldOpened.value = !isHelloWorldOpened.value;
};
</script>
