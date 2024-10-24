<template>
  <div class="w-full">
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead v-for="header in headerGroup.headers" :key="header.id">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell :colspan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <DataTablePagination :total-item="data.length" />
  </div>
</template>
<script setup lang="ts">
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { valueUpdater } from "@/lib/utils";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import { ArrowUpDown } from "lucide-vue-next";
import { h, ref } from "vue";
import DropdownAction from "@/components/asset/AssetDataTableAction.vue";
import DataTablePagination from "@/components/DataTablePagination.vue";
import { type Asset } from "@/types/global";
import { convertStringToDate, convertDateToString } from "@/lib/dateHelper";

const data = ref<Asset[]>([
  {
    id: 1,
    assetName: "Macbook",
    serialNumber: "M124234",
    category: "PC",
    status: "Active",
    location: "IT",
    owner: "Tester",
    warrantyExpiryDate: convertStringToDate("01/01/2026"),
  },
  {
    id: 2,
    assetName: "Laptop",
    serialNumber: "M124234",
    category: "PC",
    status: "Active",
    location: "IT",
    owner: "Tester",
    warrantyExpiryDate: convertStringToDate("01/08/2026"),
  },
  {
    id: 3,
    assetName: "Desktop",
    serialNumber: "M124234",
    category: "PC",
    status: "Active",
    location: "IT",
    owner: "Tester",
    warrantyExpiryDate: convertStringToDate("01/04/2026"),
  },
]);

const columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "assetName",
    header: "Asset Name",
  },
  {
    accessorKey: "serialNumber",
    header: "Serial Number",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "owner",
    header: "Owner",
  },
  {
    accessorKey: "warrantyExpiryDate",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "px-2",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => [
          "Warranty Expiry Date",
          h(ArrowUpDown, { class: "ml-2 h-4 w-4" }),
        ],
      );
    },
    cell: ({ row }) =>
      h(
        "div",
        { class: "px-2" },
        convertDateToString(row.getValue("warrantyExpiryDate")),
      ),
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => h("div", { class: "text-center" }, "Actions"),
    cell: ({ row }) => {
      const payment = row.original;

      return h(
        "div",
        { class: "relative text-center" },
        h(DropdownAction, {
          payment,
          onExpand: row.toggleExpanded,
        }),
      );
    },
  },
];

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const table = useVueTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, rowSelection),
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
});
</script>
