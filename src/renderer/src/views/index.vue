<template>
  <div class="w-full overflow-auto p-4 font-ibmPlexSans">
    <div class="w-full flex justify-between items-center flex-wrap gap-6">
      <h1 class="font-medium text-xl">Dashboard</h1>
      <Popover>
        <PopoverTrigger as-child>
          <Button
            variant="outline"
            size="sm"
            :class="
              cn(
                'w-56 justify-start text-left font-normal',
                !filterDate && 'text-muted-foreground',
              )
            "
          >
            <Icon icon="lucide:calendar" class="mr-2 h-4 w-4" />
            <template v-if="filterDate.start">
              <template v-if="filterDate.end">
                {{ df.format(filterDate.start.toDate(getLocalTimeZone())) }} -
                {{ df.format(filterDate.end.toDate(getLocalTimeZone())) }}
              </template>

              <template v-else>
                {{ df.format(filterDate.start.toDate(getLocalTimeZone())) }}
              </template>
            </template>
            <template v-else> Pick a date </template>
          </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <RangeCalendar
            v-model="filterDate"
            initial-focus
            @update:start-value="(startDate) => (filterDate.start = startDate)"
          />
        </PopoverContent>
      </Popover>
    </div>
    <div
      class="mt-6 grid grid-cols-[repeat(auto-fit,_minmax(256px,_1fr))] gap-4"
    >
      <DashBoardCard
        title="Total assets"
        icon="lucide:computer"
        :value="270"
        :pre-value="275"
      />
      <DashBoardCard
        title="Active assets"
        icon="lucide:computer"
        :value="270"
        :pre-value="270"
      />
      <DashBoardCard
        title="Warranty expiry"
        icon="lucide:clock-4"
        :value="10"
        :pre-value="5"
      />
      <DashBoardCard
        title="Client"
        icon="lucide:users"
        :value="67"
        :pre-value="63"
      />
    </div>
    <div class="w-full mt-8 flex flex-col tablet:flex-row gap-4">
      <div class="w-full tablet:w-[50%]">
        <h2 class="font-ibmPlexSans font-bold text-base">Assets by Category</h2>
        <BarChart
          :data="data"
          :colors="['#10b981']"
          :rounded-corners="8"
          show-x-axis
          show-y-axis
          index="name"
          :categories="['total']"
          :y-formatter="
            (tick, i) => {
              return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : '';
            }
          "
          class="h-60"
        />
      </div>
      <div
        class="w-full h-full tablet:w-[50%] mt-8 tablet:mt-0 flex justify-center flex-wrap gap-10"
      >
        <div class="grow mobile:w-40">
          <h2 class="mb-4 font-ibmPlexSans font-bold text-base">
            Assets by status
          </h2>
          <DonutChart
            :colors="['#10b981']"
            index="name"
            :category="'total'"
            :data="data"
            class="w-full"
          />
        </div>
        <div class="grow mobile:w-40">
          <h2 class="mb-4 font-ibmPlexSans font-bold text-base">
            Licenses Status
          </h2>
          <DonutChart
            :colors="['#10b981']"
            index="name"
            :category="'total'"
            :data="data"
            class="w-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import { Icon } from "@iconify/vue";
import type { DateRange } from "radix-vue";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Ref, ref } from "vue";
import DashBoardCard from "@/components/dashboard/DashBoardCard.vue";
import { BarChart } from "@/components/ui/chart-bar";
import { DonutChart } from "@/components/ui/chart-donut";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const currentDate = new Date();
const filterDate = ref({
  start: new CalendarDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDay(),
  ),
  end: new CalendarDate(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    currentDate.getDay(),
  ).add({
    days: new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0,
    ).getDate(),
  }),
}) as Ref<DateRange>;

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 2000) + 500,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 2000) + 500,
  },
];
</script>
