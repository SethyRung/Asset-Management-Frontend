<template>
  <div class="w-full h-full p-4">
    <h1 class="mb-6 text-xl font-medium text-zinc-700">Dashboard</h1>
    <div class="w-full mb-8 flex flex-wrap gap-4">
      <DashboardCard
        v-for="(item, index) in dashboardCardData"
        :key="item.key + index"
        :label="item.label"
        :icon="item.icon"
        :value="item.value"
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
import DashboardCard from "~/components/Cards/DashboardCard.vue";
import { Bar, Doughnut } from "vue-chartjs";

type DashboardCardData = {
  key: string;
  label: string;
  icon: string;
  value: number;
};

const toast = useToast();

const dashboardCardData = ref<DashboardCardData[]>([
  {
    key: "totalAsset",
    label: "Total Assets",
    icon: "i-lucide-computer",
    value: 0,
  },
  {
    key: "activeAsset",
    label: "Active assets",
    icon: "i-lucide-computer",
    value: 0,
  },
  {
    key: "warrantyExpired",
    label: "Warranty expiry",
    icon: "i-lucide-computer",
    value: 0,
  },
  {
    key: "client",
    label: "Client",
    icon: "i-lucide-computer",
    value: 0,
  },
]);

const assetByCateogory = ref<{
  labels: string[];
  datasets: { label: string; backgroundColor: string; data: number[] }[];
}>({
  labels: [],
  datasets: [
    {
      label: "",
      backgroundColor: "#3577fc",
      data: [],
    },
  ],
});

const assetByStatus = ref<{
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    hoverOffset: number;
  }[];
}>({
  labels: ["Active", "Inactive", "Repair"],
  datasets: [
    {
      data: [0, 0, 0],
      backgroundColor: ["#00c950", "#ff6467", "#3577fc"],
      hoverOffset: 4,
    },
  ],
});

const handleSuccess = (
  response: ResponseBody<{
    totalAsset: number;
    activeAsset: number;
    client: number;
    warrantyExpired: number;
    assetByCategory: object;
    assetByStatus: {
      repair: number;
      inactive: number;
      active: number;
    };
  }>,
) => {
  if (response.status.code === ResponseStatusCode.OK) {
    dashboardCardData.value = dashboardCardData.value.map((item) => ({
      ...item,
      value:
        (response.data[item.key as keyof typeof response.data] as number) ??
        item.value,
    }));

    Object.keys(response.data.assetByCategory).forEach((key) => {
      assetByCateogory.value.labels.push(key);
      assetByCateogory.value.datasets[0].data.push(
        response.data.assetByCategory[
          key as keyof typeof response.data.assetByCategory
        ],
      );
    });

    const { active, inactive, repair } = response.data.assetByStatus;
    assetByStatus.value.datasets[0].data = [active, inactive, repair];
  } else {
    toast.add({
      title: "Error",
      description: response.status.errorMessage,
      color: "error",
    });
  }
};

const { data: response, status } = await useFetchApi<{
  totalAsset: number;
  activeAsset: number;
  client: number;
  warrantyExpired: number;
  assetByCategory: object;
  assetByStatus: {
    repair: number;
    inactive: number;
    active: number;
  };
}>("/api/dashboard", {
  method: "GET",
  lazy: true,
});
if (status.value === "success" && response.value) {
  handleSuccess(response.value);
}

watch(response, (newResponse) => {
  if (newResponse) {
    handleSuccess(newResponse);
  }
});
</script>
