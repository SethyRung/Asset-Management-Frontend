<template>
  <div class="w-full h-full p-4">
    <div class="mb-6 flex flex-wrap justify-between items-center gap-6">
      <h1 class="text-xl font-medium text-zinc-700">Dashboard</h1>
      <DateRangePicker variant="outline" />
    </div>
    <div class="w-full mb-8 flex flex-wrap gap-4">
      <DashboardCard
        v-for="(item, index) in dashboardCardData"
        :key="item.key + index"
        :label="item.label"
        :icon="item.icon"
        :value="item.value"
        :factor="item.factor"
      />
    </div>
    <div class="flex flex-col tablet:flex-row justify-between gap-4">
      <div class="w-full h-full tablet:w-[50%]">
        <h2 class="text-base font-bold">Assets by Category</h2>
        <div class="h-full">
          <Bar
            :data="assetByCateogory"
            :options="{
              responsive: true,
            }"
          />
        </div>
      </div>
      <div class="w-full h-full tablet:w-[40%]">
        <h2 class="text-base font-bold">Assets by Status</h2>
        <div class="h-full">
          <Doughnut
            :data="assetByStatus"
            :options="{
              responsive: true,
              maintainAspectRatio: false,
            }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import DateRangePicker from "~/components/Inputs/DateRangePicker.vue";
import DashboardCard from "~/components/Cards/DashboardCard.vue";
import { Bar, Doughnut } from "vue-chartjs";

type DashboardCardData = {
  key: string;
  label: string;
  icon: string;
  value: number;
  factor: string;
};

const dashboardCardData = ref<DashboardCardData[]>([
  {
    key: "totalAssets",
    label: "Total Assets",
    icon: "i-lucide-computer",
    value: 278,
    factor: "+4",
  },
  {
    key: "activeAssets",
    label: "Active assets",
    icon: "i-lucide-computer",
    value: 268,
    factor: "+8",
  },
  {
    key: "warrantyExpiry",
    label: "Warranty expiry",
    icon: "i-lucide-computer",
    value: 20,
    factor: "+6",
  },
  {
    key: "client",
    label: "Client",
    icon: "i-lucide-computer",
    value: 67,
    factor: "+0",
  },
]);

const assetByCateogory = ref({
  labels: ["Laptop", "Desktop", "Printer", "Monitor", "Keyboard"],
  datasets: [
    {
      label: "",
      backgroundColor: "#3577fc",
      data: [40, 20, 12, 20, 10],
    },
  ],
});

const assetByStatus = ref({
  labels: ["Active", "Inactive", "Repair"],
  datasets: [
    {
      data: [29, 4, 2],
      backgroundColor: ["#00c950", "#ff6467", "#3577fc"],
      hoverOffset: 4,
    },
  ],
});
</script>
